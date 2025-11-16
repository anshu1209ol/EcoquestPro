"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { Download, Award, Calendar, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

interface Certificate {
  id: number;
  name: string;
  description: string;
  date: string;
  level: string;
  certificateId: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    name: "Eco Beginner Certificate",
    description: "Awarded for completing your first environmental quiz",
    date: "2024-01-10",
    level: "Beginner",
    certificateId: "ECO-2024-001",
  },
  {
    id: 2,
    name: "Tree Planter Certificate",
    description: "Awarded for planting 5 trees in your community",
    date: "2024-01-15",
    level: "Intermediate",
    certificateId: "ECO-2024-002",
  },
  {
    id: 3,
    name: "Water Conservation Certificate",
    description: "Awarded for saving 1000 liters of water",
    date: "2024-01-20",
    level: "Advanced",
    certificateId: "ECO-2024-003",
  },
  {
    id: 4,
    name: "Climate Champion Certificate",
    description: "Awarded for completing 50 environmental challenges",
    date: "2024-01-25",
    level: "Expert",
    certificateId: "ECO-2024-004",
  },
];

function CertificatesContent() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleDownload = (cert: Certificate) => {
    // In a real app, this would generate and download a PDF
    toast.success(`Downloading ${cert.name}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Certificates</h1>
            <p className="text-xl text-gray-600">
              Download and share your environmental achievement certificates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-eco-green-200 cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="bg-gradient-to-br from-eco-green-500 to-eco-green-600 p-8 text-white text-center">
                  <Award className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{cert.name}</h3>
                  <p className="text-eco-green-100">{cert.level}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{cert.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>Earned on {cert.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <CheckCircle className="w-4 h-4 text-eco-green-600" />
                    <span>ID: {cert.certificateId}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(cert);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-eco-green-600 text-white py-2 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download Certificate
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full"
          >
            <div className="bg-gradient-to-br from-eco-green-500 to-eco-green-600 rounded-xl p-12 text-white text-center mb-6">
              <Award className="w-24 h-24 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">{selectedCert.name}</h2>
              <p className="text-xl text-eco-green-100 mb-2">Level: {selectedCert.level}</p>
              <p className="text-eco-green-200">Certificate ID: {selectedCert.certificateId}</p>
            </div>
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">{selectedCert.description}</p>
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Issued on {selectedCert.date}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedCert(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleDownload(selectedCert)}
                className="flex-1 flex items-center justify-center gap-2 bg-eco-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}

export default function Certificates() {
  return (
    <ProtectedRoute>
      <CertificatesContent />
    </ProtectedRoute>
  );
}

