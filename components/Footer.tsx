import Link from "next/link";
import { Leaf, Github, Mail, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-eco-green-500" />
              <span className="text-xl font-bold text-white">ECO Quest</span>
            </Link>
            <p className="text-sm mb-4">
              Gamified environmental education platform for students to learn, 
              engage, and make a real impact on our planet.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-eco-green-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-eco-green-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-eco-green-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-eco-green-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-eco-green-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="hover:text-eco-green-500 transition-colors">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="hover:text-eco-green-500 transition-colors">
                  Challenges
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-eco-green-500 transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources" className="hover:text-eco-green-500 transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link href="/downloadables" className="hover:text-eco-green-500 transition-colors">
                  Downloadables
                </Link>
              </li>
              <li>
                <Link href="/documentaries" className="hover:text-eco-green-500 transition-colors">
                  Documentaries
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-eco-green-500 transition-colors">
                  Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-eco-green-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/developer" className="hover:text-eco-green-500 transition-colors">
                  Developer
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-eco-green-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li className="flex items-center gap-2 mt-4">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@ecoquest.com" className="hover:text-eco-green-500 transition-colors">
                  contact@ecoquest.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ECO Quest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

