"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Minimize2, Leaf, Sparkles, Zap, Paperclip } from "lucide-react";
import Link from "next/link";

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

export default function EcoBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm EcoMentor, your intelligent AI assistant powered by Google Gemini AI! 🌿🤖 I can help you with environmental topics, ECO Quest features, and more. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<SelectedFile[]>([]);

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
    e.currentTarget.value = "";
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
      setFiles([]);
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What is ECO Quest?",
    "How to earn points?",
    "Tell me about climate change",
    "What are renewable energy sources?",
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-eco-green-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:from-eco-green-700 hover:to-purple-700 transition-all group"
          >
            <Bot className="w-6 h-6" />
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat with EcoMentor AI
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border-2 border-eco-green-200 overflow-hidden flex flex-col ${
              isMinimized ? "h-auto" : "h-[500px]"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-eco-green-600 via-purple-600 to-eco-green-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <img src="/gemini.svg" alt="Gemini AI" className="w-16 h-5 object-contain" />
                </div>
                <div>
                  <h3 className="font-semibold">EcoMentor</h3>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-300" />
                    <p className="text-xs text-eco-green-100">Powered by Gemini AI</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-eco-green-50/50 to-white space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="bg-gradient-to-br from-eco-green-600 to-purple-600 p-2 rounded-full self-start shadow-md">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-eco-green-600 to-eco-green-700 text-white shadow-md"
                            : "bg-white text-gray-900 border-2 border-eco-green-200 shadow-sm"
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
                          <Leaf className="w-4 h-4 text-gray-700" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="bg-gradient-to-br from-eco-green-600 to-purple-600 p-2 rounded-full">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-3 border-2 border-eco-green-200">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-eco-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-eco-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length <= 1 && (
                  <div className="px-4 py-2 bg-gradient-to-r from-eco-green-50 to-purple-50 border-t border-eco-green-200">
                    <p className="text-xs text-gray-600 mb-2 font-semibold">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickQuestion(question)}
                          disabled={isLoading}
                          className="text-xs bg-white text-eco-green-600 px-3 py-1 rounded-full border border-eco-green-200 hover:bg-eco-green-100 hover:border-purple-300 transition-all disabled:opacity-50"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-eco-green-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-eco-green-500 focus:border-purple-500 outline-none text-sm transition-all disabled:opacity-50"
                    />
                    <label className="cursor-pointer bg-white border-2 border-eco-green-200 text-eco-green-700 px-3 rounded-full flex items-center gap-1 hover:bg-eco-green-50">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-xs">Attach</span>
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
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-eco-green-600 to-purple-600 text-white p-2 rounded-full hover:from-eco-green-700 hover:to-purple-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                  {files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {files.map((f, idx) => (
                        <div key={idx} className="px-2 py-1 rounded-full border text-xs bg-white flex items-center gap-2">
                          {f.previewUrl ? (
                            <img src={f.previewUrl} alt={f.name} className="w-4 h-4 rounded object-cover" />
                          ) : (
                            <Paperclip className="w-3 h-3 text-purple-600" />
                          )}
                          <span className="max-w-[120px] truncate">{f.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 text-center">
                    <Link
                      href="/ecobot"
                      className="text-xs text-eco-green-600 hover:text-purple-600 font-semibold transition-colors"
                    >
                      Open full chat page →
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
