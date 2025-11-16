"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Code, Github, Mail, Linkedin, ExternalLink } from "lucide-react";

export default function Developer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Code className="w-20 h-20 text-eco-green-600 mx-auto mb-6" />
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Developer Section</h1>
              <p className="text-xl text-gray-600">
                Built with passion for environmental education
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-eco-green-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong className="text-gray-900">Project Name:</strong> ECO Quest
              </p>
              <p>
                <strong className="text-gray-900">Version:</strong> 1.0.0
              </p>
              <p>
                <strong className="text-gray-900">Description:</strong> A gamified environmental
                education platform for students
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-eco-green-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Next.js 14",
                "React 18",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "Recharts",
                "Lucide React",
                "React Hot Toast",
              ].map((tech, idx) => (
                <div
                  key={tech}
                  className="bg-eco-green-50 px-4 py-2 rounded-lg text-center font-semibold text-eco-green-700"
                >
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-eco-green-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Credits</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                ECO Quest is an open-source project built to promote environmental education
                through gamification. The project uses modern web technologies to create an
                engaging and educational experience for students.
              </p>
              <p className="text-gray-600">
                Special thanks to all the contributors and the open-source community for
                their support and inspiration.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-eco-green-600 to-eco-green-700 rounded-2xl shadow-lg p-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Connect & Contribute</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5" />
                View on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="mailto:developer@ecoquest.com"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Developer
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

