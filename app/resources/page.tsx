"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { Book, Lightbulb, FileText, Video, Download, ExternalLink } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Understanding Climate Change",
    type: "article",
    icon: Book,
    description: "A comprehensive guide to understanding the causes and effects of climate change.",
    link: "#",
  },
  {
    id: 2,
    title: "Water Conservation Tips",
    type: "article",
    icon: Lightbulb,
    description: "Practical tips and strategies for conserving water in your daily life.",
    link: "#",
  },
  {
    id: 3,
    title: "Renewable Energy Guide",
    type: "article",
    icon: FileText,
    description: "Learn about different types of renewable energy sources and their benefits.",
    link: "#",
  },
  {
    id: 4,
    title: "Recycling Best Practices",
    type: "article",
    icon: Book,
    description: "How to properly recycle different materials and reduce waste.",
    link: "#",
  },
  {
    id: 5,
    title: "Quiz Hints: Climate Science",
    type: "hint",
    icon: Lightbulb,
    description: "Helpful hints for answering climate science questions in quizzes.",
    link: "#",
  },
  {
    id: 6,
    title: "Eco-Friendly Lifestyle",
    type: "article",
    icon: FileText,
    description: "Simple ways to adopt a more sustainable and eco-friendly lifestyle.",
    link: "#",
  },
];

const infographics = [
  {
    id: 1,
    title: "Carbon Footprint Infographic",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Water Cycle Diagram",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Renewable Energy Sources",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
  },
];

function ResourcesContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Learning Resources</h1>
            <p className="text-xl text-gray-600">
              Educational articles, hints, and materials to enhance your environmental knowledge
            </p>
          </div>

          {/* Articles Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Articles & Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, idx) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-eco-green-100 p-3 rounded-lg">
                      <resource.icon className="w-6 h-6 text-eco-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-eco-green-600 bg-eco-green-100 px-2 py-1 rounded">
                          {resource.type === "hint" ? "Quiz Hint" : "Article"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                      <a
                        href={resource.link}
                        className="inline-flex items-center gap-2 text-eco-green-600 font-semibold hover:text-eco-green-700 transition-colors"
                      >
                        Read More
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Infographics Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Infographics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {infographics.map((infographic, idx) => (
                <motion.div
                  key={infographic.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-eco-green-200"
                >
                  <img
                    src={infographic.image}
                    alt={infographic.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{infographic.title}</h3>
                    <button className="flex items-center gap-2 text-eco-green-600 font-semibold hover:text-eco-green-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function Resources() {
  return <ResourcesContent />;
}

