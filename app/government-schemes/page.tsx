"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Building2, ExternalLink, Award, Users, Target } from "lucide-react";

const schemes = [
  {
    id: 1,
    name: "Swachh Bharat Abhiyan",
    description: "A nationwide campaign to clean up the streets, roads, and infrastructure of India's cities, towns, and rural areas.",
    objectives: [
      "Eliminate open defecation",
      "Eradicate manual scavenging",
      "Modernize municipal solid waste management",
      "Bring about behavioral change regarding healthy sanitation practices",
    ],
    link: "https://swachhbharatmission.gov.in",
    icon: Building2,
  },
  {
    id: 2,
    name: "Jal Shakti Abhiyan",
    description: "A time-bound, mission-mode water conservation campaign to improve water availability in water-stressed districts.",
    objectives: [
      "Water conservation and rainwater harvesting",
      "Renovation of traditional water bodies",
      "Reuse of water and recharging of structures",
      "Watershed development",
    ],
    link: "https://jalshakti-dowr.gov.in",
    icon: Target,
  },
  {
    id: 3,
    name: "National Mission for Green India",
    description: "A mission under the National Action Plan on Climate Change to protect, restore, and enhance India's forest cover.",
    objectives: [
      "Increase forest/tree cover",
      "Enhance ecosystem services",
      "Increase forest-based livelihood income",
      "Ecosystem restoration and conservation",
    ],
    link: "https://moef.gov.in",
    icon: Award,
  },
  {
    id: 4,
    name: "Pradhan Mantri Ujjwala Yojana",
    description: "A scheme to provide LPG connections to women from Below Poverty Line households.",
    objectives: [
      "Provide clean cooking fuel",
      "Reduce health hazards from traditional cooking",
      "Empower women",
      "Reduce deforestation",
    ],
    link: "https://www.pmuy.gov.in",
    icon: Users,
  },
  {
    id: 5,
    name: "National Clean Air Programme",
    description: "A comprehensive strategy to tackle air pollution across the country.",
    objectives: [
      "Comprehensive city-specific action plans",
      "Strengthen air quality monitoring network",
      "Public awareness and capacity building",
      "Reduce PM10 and PM2.5 concentrations",
    ],
    link: "https://moef.gov.in",
    icon: Building2,
  },
  {
    id: 6,
    name: "Namami Gange Programme",
    description: "An integrated conservation mission to clean and protect the Ganga river.",
    objectives: [
      "Sewage treatment infrastructure",
      "River surface cleaning",
      "Afforestation",
      "Industrial effluent monitoring",
    ],
    link: "https://nmcg.nic.in",
    icon: Target,
  },
];

export default function GovernmentSchemes() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Government Environmental Schemes</h1>
            <p className="text-xl text-gray-600">
              Learn about Indian government initiatives for environmental protection and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme, idx) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-eco-green-100 p-3 rounded-lg">
                    <scheme.icon className="w-6 h-6 text-eco-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{scheme.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Objectives:</h4>
                  <ul className="space-y-1">
                    {scheme.objectives.slice(0, 2).map((objective, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className="text-eco-green-600 mt-1">•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-eco-green-600 font-semibold hover:text-eco-green-700 transition-colors text-sm"
                >
                  Learn More
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-gradient-to-br from-eco-green-600 to-eco-green-700 rounded-2xl p-8 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Supporting Government Initiatives</h2>
            <p className="text-lg text-eco-green-100 max-w-3xl mx-auto">
              ECO Quest aligns with various government environmental schemes and encourages
              students to participate in these initiatives. By completing challenges and learning
              about environmental issues, students contribute to the larger goal of environmental
              conservation in India.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

