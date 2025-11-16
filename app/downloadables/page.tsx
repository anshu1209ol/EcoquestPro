"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Download, FileText, Image, File, BookOpen } from "lucide-react";

const downloadables = [
  {
    id: 1,
    title: "Eco-Friendly Living Guide",
    type: "PDF",
    icon: FileText,
    size: "2.5 MB",
    description: "Complete guide to living an eco-friendly lifestyle",
    category: "Guide",
  },
  {
    id: 2,
    title: "Climate Change Poster",
    type: "Image",
    icon: Image,
    size: "5.2 MB",
    description: "Educational poster about climate change",
    category: "Poster",
  },
  {
    id: 3,
    title: "Recycling Activity Sheet",
    type: "PDF",
    icon: FileText,
    size: "1.8 MB",
    description: "Fun activity sheet for learning about recycling",
    category: "Activity",
  },
  {
    id: 4,
    title: "Water Conservation Checklist",
    type: "PDF",
    icon: FileText,
    size: "0.9 MB",
    description: "Printable checklist for water conservation",
    category: "Checklist",
  },
  {
    id: 5,
    title: "Eco Quiz Answer Key",
    type: "PDF",
    icon: BookOpen,
    size: "1.2 MB",
    description: "Answer key for all eco quizzes",
    category: "Reference",
  },
  {
    id: 6,
    title: "Tree Planting Guide",
    type: "PDF",
    icon: FileText,
    size: "3.1 MB",
    description: "Step-by-step guide to planting trees",
    category: "Guide",
  },
];

export default function Downloadables() {
  const handleDownload = (item: typeof downloadables[0]) => {
    // In a real app, this would trigger an actual download
    console.log(`Downloading ${item.title}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Downloadable Resources</h1>
            <p className="text-xl text-gray-600">
              Download PDFs, guides, posters, and activity sheets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadables.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-eco-green-100 p-3 rounded-lg">
                    <item.icon className="w-6 h-6 text-eco-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-eco-green-600 bg-eco-green-100 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500">{item.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <p className="text-xs text-gray-500 mb-4">Size: {item.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(item)}
                  className="w-full flex items-center justify-center gap-2 bg-eco-green-600 text-white py-2 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

