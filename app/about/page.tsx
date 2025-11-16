"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { Leaf, Target, Eye, Heart, Mail, Twitter, Facebook, Instagram, Github } from "lucide-react";

function AboutContent() {
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
              <Leaf className="w-20 h-20 text-eco-green-600 mx-auto mb-6" />
              <h1 className="text-5xl font-bold text-gray-900 mb-4">About ECO Quest</h1>
              <p className="text-xl text-gray-600">
                Empowering students to learn, engage, and make a real environmental impact
              </p>
            </motion.div>
          </div>

          {/* Mission */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-eco-green-200"
          >
            <div className="flex items-start gap-4 mb-6">
              <Target className="w-12 h-12 text-eco-green-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  ECO Quest is dedicated to educating students about environmental issues through
                  gamification. We believe that learning should be engaging, interactive, and
                  impactful. Our platform combines education with real-world action, empowering
                  students to make a tangible difference in their communities while building
                  knowledge about sustainability and environmental conservation.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Vision */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-eco-green-200"
          >
            <div className="flex items-start gap-4 mb-6">
              <Eye className="w-12 h-12 text-eco-green-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  We envision a world where every student is equipped with the knowledge and
                  motivation to protect our planet. Through gamified learning experiences, we
                  aim to create a generation of environmentally conscious individuals who
                  understand the importance of sustainability and are actively working towards
                  a greener future.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Values */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-eco-green-200"
          >
            <div className="flex items-start gap-4 mb-6">
              <Heart className="w-12 h-12 text-eco-green-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-eco-green-600 font-bold">•</span>
                    <span><strong>Education First:</strong> We prioritize learning and knowledge sharing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-eco-green-600 font-bold">•</span>
                    <span><strong>Real Impact:</strong> Every action should make a tangible difference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-eco-green-600 font-bold">•</span>
                    <span><strong>Community:</strong> Together we can achieve more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-eco-green-600 font-bold">•</span>
                    <span><strong>Innovation:</strong> Using technology to make learning fun and engaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-eco-green-600 font-bold">•</span>
                    <span><strong>Sustainability:</strong> Long-term thinking for a better future</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-eco-green-600 to-eco-green-700 rounded-2xl shadow-lg p-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <a
                href="mailto:contact@ecoquest.com"
                className="flex items-center gap-2 hover:text-eco-green-200 transition-colors"
              >
                <Mail className="w-5 h-5" />
                contact@ecoquest.com
              </a>
            </div>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-eco-green-200 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-eco-green-200 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-eco-green-200 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-eco-green-200 transition-colors">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function About() {
  return <AboutContent />;
}

