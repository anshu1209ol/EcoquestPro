"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Leaf, Sparkles, Zap, Paperclip, X } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface SelectedFile {
  name: string;
  mimeType: string;
  dataBase64: string;
  previewUrl?: string;
}

const quickQuestions = [
  "What is ECO Quest?",
  "How to earn points?",
  "Tell me about climate change",
  "What are renewable energy sources?",
];

export default function EcoMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm EcoMentor, your intelligent AI assistant powered by Google Gemini AI! 🌿🤖 I can help you with environmental topics, ECO Quest platform features, sustainability questions, and much more. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1] || "";
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const list = Array.from(e.target.files);
    const converted: SelectedFile[] = [];
    for (const file of list) {
      const base64 = await fileToBase64(file);
      const item: SelectedFile = {
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        dataBase64: base64,
      };
      if (file.type.startsWith("image/")) {
        item.previewUrl = URL.createObjectURL(file);
      }
      converted.push(item);
    }
    setFiles((prev) => [...prev, ...converted]);
    // Reset input value so same file can be reselected
    e.currentTarget.value = "";
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Prepare conversation history
      const conversationHistory = messages.map((msg) => ({
        sender: msg.sender,
        text: msg.text,
      }));

      // Call API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
      
      let response;
      try {
        response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentInput,
            conversationHistory: conversationHistory,
            files: files,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error("Request timed out. Please try again.");
        }
        throw new Error(`Network error: ${fetchError.message || "Failed to connect to server. Make sure the server is running."}`);
      }

      // Be robust to non-JSON responses (e.g., Next error HTML)
      let data: any = {};
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { response: text };
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.response || "I apologize, but I couldn't generate a response. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setFiles([]); // clear on success
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: `I'm sorry, I encountered an error: ${error.message || "Unknown issue."}\nIf this persists, please refresh the page. The server might have returned an HTML error page instead of JSON.`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 via-purple-50/30 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-eco-green-600 via-purple-600 to-eco-green-600 p-4 rounded-full animate-pulse">
                  <img src="/gemini.svg" alt="Gemini AI" className="w-28 h-6 object-contain" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </motion.div>
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-eco-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
              EcoMentor
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Your intelligent AI assistant powered by{" "}
              <span className="font-semibold text-purple-600">Google Gemini AI</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Powered by Gemini AI</span>
            </div>
          </div>

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl border-2 border-eco-green-200 overflow-hidden backdrop-blur-sm"
          >
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-eco-green-50/50 via-white to-white">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <div className="bg-gradient-to-br from-eco-green-600 to-purple-600 p-2 rounded-full self-start shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-eco-green-600 to-eco-green-700 text-white shadow-lg"
                          : "bg-white text-gray-900 border-2 border-eco-green-200 shadow-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-eco-green-100" : "text-gray-400"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="bg-gray-300 p-2 rounded-full self-start">
                        <User className="w-5 h-5 text-gray-700" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="bg-gradient-to-br from-eco-green-600 to-purple-600 p-2 rounded-full">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 border-2 border-eco-green-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-eco-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-eco-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-6 py-3 bg-gradient-to-r from-eco-green-50 to-purple-50 border-t border-eco-green-200">
              <p className="text-xs text-gray-600 mb-2 font-semibold">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading}
                    className="text-xs bg-white text-eco-green-600 px-3 py-1 rounded-full border border-eco-green-200 hover:bg-eco-green-100 hover:border-purple-300 transition-all hover:shadow-md disabled:opacity-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-eco-green-200">
            {/* Selected file previews */}
            {files.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {files.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-2 py-1 rounded-full border text-xs bg-white">
                    {f.previewUrl ? (
                      <img src={f.previewUrl} alt={f.name} className="w-5 h-5 rounded object-cover" />
                    ) : (
                      <Paperclip className="w-4 h-4 text-purple-600" />
                    )}
                    <span className="max-w-[160px] truncate">{f.name}</span>
                    <button onClick={() => removeFile(idx)} className="p-1 hover:bg-gray-100 rounded">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Ask me anything about the environment or ECO Quest..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-eco-green-500 focus:border-purple-500 outline-none transition-all disabled:opacity-50"
                />
              <label className="cursor-pointer bg-white border-2 border-eco-green-200 text-eco-green-700 px-3 rounded-full flex items-center gap-1 hover:bg-eco-green-50">
                <Paperclip className="w-4 h-4" />
                <span className="text-sm">Attach</span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-eco-green-600 to-purple-600 text-white p-3 rounded-full hover:from-eco-green-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-gradient-to-r from-eco-green-50 to-purple-50 rounded-xl p-6 border-2 border-eco-green-200 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <Leaf className="w-6 h-6 text-eco-green-600" />
            </div>
            <p className="text-gray-700 font-medium mb-2">
              Powered by <span className="text-purple-600 font-bold">Google Gemini AI</span>
            </p>
            <p className="text-sm text-gray-600">
              EcoMentor is your comprehensive AI assistant for ECO Quest! Ask me about environmental topics, 
              platform features, sustainability questions, or anything else. I&apos;m here to help you learn and make a difference! 🌿🤖
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
