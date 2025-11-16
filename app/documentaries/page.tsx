"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Play, Clock, ExternalLink } from "lucide-react";

const documentaries = [
  {
    id: 1,
    title: "Our Planet",
    description: "A groundbreaking documentary series exploring the natural world",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    duration: "50 min",
    source: "YouTube",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Before the Flood",
    description: "Leonardo DiCaprio's journey to understand climate change",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
    duration: "96 min",
    source: "YouTube",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "The True Cost",
    description: "Documentary about the impact of fashion on the environment",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    duration: "92 min",
    source: "YouTube",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Plastic Ocean",
    description: "Exploring the devastating impact of plastic pollution",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    duration: "100 min",
    source: "YouTube",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Kiss the Ground",
    description: "How soil can help reverse climate change",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    duration: "84 min",
    source: "YouTube",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "A Plastic Ocean",
    description: "Journey to discover the shocking truth about plastic pollution",
    thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
    duration: "102 min",
    source: "YouTube",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export default function Documentaries() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Educational Documentaries</h1>
            <p className="text-xl text-gray-600">
              Watch inspiring documentaries about environmental issues and solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentaries.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-eco-green-200 hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={doc.thumbnail}
                    alt={doc.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 text-eco-green-600 p-4 rounded-full hover:bg-white transition-colors"
                    >
                      <Play className="w-8 h-8" fill="currentColor" />
                    </a>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {doc.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-eco-green-600 bg-eco-green-100 px-2 py-1 rounded">
                      {doc.source}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-eco-green-600 font-semibold hover:text-eco-green-700 transition-colors"
                  >
                    Watch Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

