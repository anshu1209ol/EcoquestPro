import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Note: We'll initialize Gemini AI in the route handler to ensure fresh API key
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Safely parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError: any) {
      console.error("Failed to parse request JSON:", parseError);
      return NextResponse.json(
        { error: "Invalid request format. Expected JSON." },
        { status: 400 }
      );
    }
    
    const { message, conversationHistory, files } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get the API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Gemini API key is not configured. Please set GEMINI_API_KEY (or NEXT_PUBLIC_GEMINI_API_KEY) in your .env.local file and restart the server." },
        { status: 500 }
      );
    }

    // Reinitialize with the API key to ensure it's fresh
    const genAIInstance = new GoogleGenerativeAI(apiKey);
    
    // Use the latest recommended model: gemini-2.5-flash
    // Older models (gemini-pro, gemini-1.5-pro, gemini-1.5-flash) are deprecated
    let model;
    let workingModelName = "gemini-2.5-flash"; // Current recommended model
    
    try {
      model = genAIInstance.getGenerativeModel({ model: workingModelName });
    } catch (err: any) {
      // Fallback to other available models if 2.5-flash doesn't work
      try {
        workingModelName = "gemini-2.0-flash-exp";
        model = genAIInstance.getGenerativeModel({ model: workingModelName });
      } catch (err2: any) {
        try {
          workingModelName = "gemini-1.5-pro-latest";
          model = genAIInstance.getGenerativeModel({ model: workingModelName });
        } catch (err3: any) {
          workingModelName = "gemini-1.5-flash-latest";
          model = genAIInstance.getGenerativeModel({ model: workingModelName });
        }
      }
    }
    
    console.log(`Using model: ${workingModelName}`);

    // Build conversation context
    const systemPrompt = `You are EcoMentor, a serious, helpful, and safe general-purpose AI assistant, powered by Google Gemini.
Core behavior:
- Answer ANY user question across domains (science, coding, math, writing, career, travel, health info, documents, etc.) clearly and accurately.
- Use uploaded files (images, PDFs, DOCX, TXT) to ground answers. Extract key info and cite sections from the file text you read.
- For images, carefully describe, analyze, and reason about content. Do not identify real people.
- If a question could involve medical, legal, or financial advice, provide helpful general information with a brief caution to consult a professional.
- When unsure, say so and suggest next steps. Prefer step-by-step reasoning and structured outputs when helpful.
- Keep responses concise but rich; use lists and formatting for clarity.
`;

    // Build multimodal parts
    type Part =
      | { text: string }
      | { inlineData: { data: string; mimeType: string } };

    const userParts: Part[] = [{ text: message }];

    // If files are provided, attach appropriately
    if (Array.isArray(files)) {
      for (const f of files) {
        const mime: string = f?.mimeType || "";
        const base64Data: string = f?.dataBase64 || "";
        const name: string = f?.name || "file";
        if (!mime || !base64Data) continue;

        // Images -> attach as inlineData for multimodal reasoning
        if (mime.startsWith("image/")) {
          userParts.push({
            inlineData: {
              data: base64Data,
              mimeType: mime,
            },
          });
          continue;
        }

        // Text-like docs -> extract text server-side and add as text context
        const buffer = Buffer.from(base64Data, "base64");
        let extracted = "";
        if (mime === "application/pdf") {
          // Dynamically import Node-only dependency to avoid bundling issues
          const { default: pdfParse }: any = await import("pdf-parse");
          const res = await pdfParse(buffer);
          extracted = (res.text || "").trim();
        } else if (
          mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          mime === "application/msword"
        ) {
          try {
            const mammothMod = await import("mammoth");
            const res = await mammothMod.extractRawText({ buffer });
            extracted = (res.value || "").trim();
          } catch {
            extracted = "";
          }
        } else if (mime.startsWith("text/")) {
          extracted = buffer.toString("utf8");
        }

        if (extracted) {
          userParts.push({
            text:
              `File "${name}" content (excerpt):\n` +
              extracted.slice(0, 10000), // limit to keep prompt reasonable
          });
        } else {
          // If we couldn't extract, include a notice so the model knows
          userParts.push({
            text: `Uploaded file "${name}" (${mime}) was received but text could not be extracted.`,
          });
        }
      }
    }

    // Generate response - try with current model, fallback to others if it fails
    let result;
    let response;
    let text;
    
    const modelNamesToTry = [
      workingModelName,  // Try current model first
      "gemini-2.5-flash",      // Latest recommended
      "gemini-2.0-flash-exp",  // Experimental
      "gemini-1.5-pro-latest", // Fallback
      "gemini-1.5-flash-latest", // Fallback
    ];
    
    let lastError;
    for (const modelName of modelNamesToTry) {
      try {
        const testModel = genAIInstance.getGenerativeModel({ model: modelName });
        result = await testModel.generateContent([
          { text: systemPrompt },
          { text: (conversationHistory || [])
              .map((m: { sender: string; text: string }) =>
                `${m.sender === "user" ? "User" : "EcoMentor"}: ${m.text}`
              )
              .join("\n") },
          { text: "User message and files:" },
          ...userParts,
          { text: "\nEcoMentor:" },
        ]);
        response = await result.response;
        text = response.text();
        console.log(`Successfully used model: ${modelName}`);
        break; // Success, exit loop
      } catch (err: any) {
        lastError = err;
        console.log(`Model ${modelName} failed:`, err.message);
        // Continue to next model
        continue;
      }
    }
    
    if (!text) {
      throw new Error(`All models failed. Last error: ${lastError?.message || 'Unknown error'}. Please check your API key and available models.`);
    }

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    
    // Provide more helpful error messages
    let errorMessage = "Failed to generate response";
    if (error.message?.includes("API_KEY")) {
      errorMessage = "Invalid API key. Please check your GEMINI_API_KEY in .env.local";
    } else if (error.message?.includes("quota") || error.message?.includes("limit")) {
      errorMessage = "API quota exceeded. Please check your Gemini API usage limits.";
    } else if (error.message) {
      errorMessage = `API Error: ${error.message}`;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Health/diagnostics endpoint: try a quick generation across known models
export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, reason: "Missing GEMINI_API_KEY" }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const candidates = [
      "gemini-2.5-flash",
      "gemini-2.0-flash-exp",
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash-latest",
    ];
    const results: { model: string; ok: boolean; error?: string }[] = [];
    for (const m of candidates) {
      try {
        const model = genAI.getGenerativeModel({ model: m });
        const res = await model.generateContent("ping");
        const txt = res.response.text();
        results.push({ model: m, ok: !!txt });
      } catch (e: any) {
        results.push({ model: m, ok: false, error: e?.message || "unknown" });
      }
    }
    return NextResponse.json({ ok: true, results });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "unknown" }, { status: 500 });
  }
}

