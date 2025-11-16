import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  points: number;
}

// Store generated quizzes to prevent duplicates
const quizCache = new Map<string, QuizQuestion[]>();
const maxCacheSize = 100;

function generateCacheKey(topic: string, difficulty: string, questionCount: number): string {
  return `${topic.toLowerCase()}-${difficulty}-${questionCount}`;
}

function getUniqueQuiz(cacheKey: string, newQuiz: QuizQuestion[]): QuizQuestion[] {
  // Check if we have this exact quiz cached
  const cached = quizCache.get(cacheKey);
  if (cached) {
    // Compare with cached quiz to ensure it's different
    const isSame = JSON.stringify(cached) === JSON.stringify(newQuiz);
    if (!isSame) {
      return newQuiz; // Return the new one if it's different
    }
  }
  
  // Store in cache (LRU eviction if needed)
  if (quizCache.size >= maxCacheSize) {
    const firstKey = quizCache.keys().next().value;
    if (firstKey) {
      quizCache.delete(firstKey);
    }
  }
  quizCache.set(cacheKey, newQuiz);
  
  return newQuiz;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, difficulty = "medium", questionCount = 5 } = body;

    if (!topic || !topic.trim()) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    // Get the API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Gemini API key is not configured. Please set GEMINI_API_KEY in your .env.local file." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try different models in order of preference
    const modelNames = ["gemini-2.5-flash", "gemini-2.0-flash-exp", "gemini-1.5-pro-latest", "gemini-1.5-flash-latest"];
    let model;
    let workingModelName = "";
    
    for (const modelName of modelNames) {
      try {
        model = genAI.getGenerativeModel({ model: modelName });
        workingModelName = modelName;
        break;
      } catch (err) {
        console.log(`Model ${modelName} not available, trying next...`);
      }
    }
    
    if (!model) {
      return NextResponse.json(
        { error: "No available Gemini models found" },
        { status: 500 }
      );
    }

    // Generate a random seed for uniqueness
    const randomSeed = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const prompt = `Generate ${questionCount} unique quiz questions about "${topic}" with ${difficulty} difficulty. Random seed: ${randomSeed}

Requirements:
1. Each question must be completely unique and never repeated - use the random seed ${randomSeed} to ensure variation
2. Questions should be educational and engaging
3. Multiple choice format with exactly 4 options
4. Include clear explanations for the correct answer
5. Provide helpful hints for each question
6. Assign appropriate point values (10-50 points based on difficulty)

Format your response as a JSON array with this exact structure:
[
  {
    "id": 1,
    "question": "Your question here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of why this answer is correct",
    "hint": "Helpful hint to guide the user",
    "points": 30
  }
]

Important:
- correctAnswer should be 0-based index (0-3)
- Make questions diverse and cover different aspects of ${topic}
- Ensure no two questions are similar - incorporate random seed ${randomSeed} for variation
- All content must be original and educational
- Difficulty level: ${difficulty}
- Topic focus: ${topic}
- Use the random seed ${randomSeed} to generate different questions each time

Return ONLY the JSON array, no additional text.`;

    let result;
    let response;
    let text;
    
    // Try with working model, fallback to others if needed
    for (const modelName of modelNames) {
      try {
        const testModel = genAI.getGenerativeModel({ model: modelName });
        result = await testModel.generateContent(prompt);
        response = await result.response;
        text = response.text();
        console.log(`Successfully used model: ${modelName}`);
        break;
      } catch (err: any) {
        console.log(`Model ${modelName} failed:`, err.message);
        if (modelName === modelNames[modelNames.length - 1]) {
          throw err; // Re-throw if all models failed
        }
      }
    }

    if (!text) {
      throw new Error("Failed to generate quiz content");
    }

    // Parse the JSON response
    let quizQuestions: QuizQuestion[];
    try {
      // Clean up the response to extract JSON
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in response");
      }
      
      quizQuestions = JSON.parse(jsonMatch[0]);
      
      // Validate the structure
      if (!Array.isArray(quizQuestions)) {
        throw new Error("Response is not an array");
      }
      
      // Add IDs if not present and validate each question
      quizQuestions = quizQuestions.map((q, index) => ({
        id: index + 1,
        question: q.question || "",
        options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["", "", "", ""],
        correctAnswer: typeof q.correctAnswer === "number" && q.correctAnswer >= 0 && q.correctAnswer <= 3 ? q.correctAnswer : 0,
        explanation: q.explanation || "",
        hint: q.hint || "",
        points: typeof q.points === "number" && q.points > 0 ? q.points : 30
      }));
      
    } catch (parseError: any) {
      console.error("Failed to parse quiz JSON:", parseError);
      return NextResponse.json(
        { error: "Failed to parse generated quiz. Please try again.", details: parseError.message },
        { status: 500 }
      );
    }

    // For maximum freshness, skip cache and always return new quiz
    // const cacheKey = generateCacheKey(topic, difficulty, questionCount);
    // const uniqueQuiz = getUniqueQuiz(cacheKey, quizQuestions);

    return NextResponse.json({
      questions: quizQuestions, // Always return fresh questions
      topic,
      difficulty,
      modelUsed: workingModelName
    });

  } catch (error: any) {
    console.error("Error generating quiz:", error);
    
    let errorMessage = "Failed to generate quiz";
    if (error.message?.includes("API_KEY")) {
      errorMessage = "Invalid API key. Please check your GEMINI_API_KEY in .env.local";
    } else if (error.message?.includes("quota") || error.message?.includes("limit")) {
      errorMessage = "API quota exceeded. Please check your Gemini API usage limits.";
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }
    
    return NextResponse.json(
      { error: errorMessage, details: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, reason: "Missing GEMINI_API_KEY" }, { status: 500 });
    }
    
    return NextResponse.json({ 
      ok: true, 
      message: "Quiz generation API is ready",
      cacheSize: quizCache.size
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "unknown" }, { status: 500 });
  }
}
