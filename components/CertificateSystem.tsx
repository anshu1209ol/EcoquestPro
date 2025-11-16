import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Crown, CheckCircle, Lock, Star, Calendar, User, Download, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Certificate {
  id: string;
  type: 'bronze' | 'silver' | 'gold';
  title: string;
  description: string;
  requiredPoints: number;
  issuedDate?: string;
  certificateId?: string;
  isEarned: boolean;
  isSpecimen?: boolean;
}

interface CertificateSystemProps {
  userPoints: number;
  userName: string;
  userPhoto?: string;
  userEmail?: string;
  userPhone?: string;
  userAddress?: string;
}

const CertificateSystem: React.FC<CertificateSystemProps> = ({ userPoints, userName, userPhoto, userEmail, userPhone, userAddress }) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showSpecimen, setShowSpecimen] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize certificates based on user points
    const certs: Certificate[] = [
      {
        id: 'bronze',
        type: 'bronze',
        title: 'Bronze Environmental Champion',
        description: 'Awarded for demonstrating commitment to environmental awareness and sustainable practices',
        requiredPoints: 1000,
        isEarned: userPoints >= 1000,
        isSpecimen: false
      },
      {
        id: 'silver',
        type: 'silver',
        title: 'Silver Environmental Guardian',
        description: 'Recognizing outstanding dedication to environmental conservation and education',
        requiredPoints: 5000,
        isEarned: userPoints >= 5000,
        isSpecimen: false
      },
      {
        id: 'gold',
        type: 'gold',
        title: 'Gold Environmental Ambassador',
        description: 'Honoring exceptional leadership and innovation in environmental protection',
        requiredPoints: 10000,
        isEarned: userPoints >= 10000,
        isSpecimen: false
      }
    ];

    // Add issued dates and certificate IDs for earned certificates
    const updatedCerts = certs.map(cert => {
      if (cert.isEarned && !cert.certificateId) {
        return {
          ...cert,
          issuedDate: new Date().toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          certificateId: generateCertificateId(cert.type)
        };
      }
      return cert;
    });

    setCertificates(updatedCerts);
  }, [userPoints]);

  const generateCertificateId = (type: string): string => {
    const prefix = type === 'bronze' ? 'BEC' : type === 'silver' ? 'SEC' : 'GEC';
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const year = new Date().getFullYear();
    return `${prefix}/${randomNum}/${year}`;
  };

  const downloadCertificatePDF = async () => {
    if (!certificateRef.current || !selectedCertificate) return;

    try {
      toast.loading('Generating PDF...');
      
      // Capture the certificate as an image
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add image to PDF
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const x = (pdf.internal.pageSize.width - imgWidth) / 2;
      const y = (pdf.internal.pageSize.height - imgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      
      // Download the PDF with proper filename
      const fileName = `${selectedCertificate.title.replace(/\s+/g, '_')}_${selectedCertificate.certificateId}.pdf`;
      
      // Convert PDF to blob and trigger download
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const handleClaimCertificate = (certificate: Certificate) => {
    if (!certificate.isEarned) {
      toast.error(`You need ${certificate.requiredPoints - userPoints} more points to claim this certificate`);
      return;
    }

    if (certificate.certificateId) {
      toast.success('Certificate already claimed!');
      return;
    }

    // Issue certificate
    const updatedCerts = certificates.map(cert => {
      if (cert.id === certificate.id) {
        return {
          ...cert,
          issuedDate: new Date().toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          certificateId: generateCertificateId(certificate.type)
        };
      }
      return cert;
    });

    setCertificates(updatedCerts);
    toast.success(`🎉 ${certificate.title} claimed successfully!`);
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    if (!certificate.isEarned || !certificate.certificateId) {
      toast.error('Certificate not available for download');
      return;
    }

    // In a real app, this would generate a PDF
    toast.success('Certificate download started!');
  };

  const getCertificateIcon = (type: string) => {
    switch (type) {
      case 'bronze':
        return <Award className="w-8 h-8 text-orange-600" />;
      case 'silver':
        return <Shield className="w-8 h-8 text-gray-400" />;
      case 'gold':
        return <Crown className="w-8 h-8 text-yellow-500" />;
      default:
        return <Award className="w-8 h-8 text-gray-400" />;
    }
  };

  const getCertificateColor = (type: string) => {
    switch (type) {
      case 'bronze':
        return 'from-orange-400 to-orange-600';
      case 'silver':
        return 'from-gray-400 to-gray-600';
      case 'gold':
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getSpecimenCertificates = (): Certificate[] => {
    return [
      {
        id: 'bronze-spec',
        type: 'bronze',
        title: 'Bronze Environmental Champion',
        description: 'Awarded for demonstrating commitment to environmental awareness and sustainable practices',
        requiredPoints: 1000,
        issuedDate: '15 November 2025',
        certificateId: 'BEC/123456/2025',
        isEarned: true,
        isSpecimen: true
      },
      {
        id: 'silver-spec',
        type: 'silver',
        title: 'Silver Environmental Guardian',
        description: 'Recognizing outstanding dedication to environmental conservation and education',
        requiredPoints: 5000,
        issuedDate: '15 November 2025',
        certificateId: 'SEC/789012/2025',
        isEarned: true,
        isSpecimen: true
      },
      {
        id: 'gold-spec',
        type: 'gold',
        title: 'Gold Environmental Ambassador',
        description: 'Honoring exceptional leadership and innovation in environmental protection',
        requiredPoints: 10000,
        issuedDate: '15 November 2025',
        certificateId: 'GEC/345678/2025',
        isEarned: true,
        isSpecimen: true
      }
    ];
  };

  const CertificateCard = ({ certificate, isSpecimen = false }: { certificate: Certificate; isSpecimen?: boolean }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
        certificate.isEarned 
          ? certificate.type === 'bronze' ? 'border-orange-500' 
            : certificate.type === 'silver' ? 'border-gray-400' 
            : 'border-yellow-500'
          : 'border-gray-200'
      }`}
    >
      {/* Certificate Header */}
      <div className={`h-2 bg-gradient-to-r ${getCertificateColor(certificate.type)}`} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getCertificateIcon(certificate.type)}
            <div>
              <h3 className="text-lg font-bold text-gray-900">{certificate.title}</h3>
              <p className="text-sm text-gray-600">
                {isSpecimen ? 'Specimen' : certificate.isEarned ? 'Earned' : 'Locked'}
              </p>
            </div>
          </div>
          
          {certificate.isEarned ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Lock className="w-6 h-6 text-gray-400" />
          )}
        </div>

        <p className="text-gray-700 mb-4 text-sm">{certificate.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-900">
              {certificate.requiredPoints.toLocaleString()} points
            </span>
          </div>
          
          {certificate.issuedDate && (
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{certificate.issuedDate}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.min(userPoints, certificate.requiredPoints).toLocaleString()} / {certificate.requiredPoints.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getCertificateColor(certificate.type)}`}
              style={{ width: `${Math.min((userPoints / certificate.requiredPoints) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Certificate ID */}
        {certificate.certificateId && (
          <div className="mb-4 p-2 bg-gray-50 rounded text-xs font-mono text-center text-gray-600">
            Certificate ID: {certificate.certificateId}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {isSpecimen ? (
            <button
              onClick={() => setSelectedCertificate(certificate)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Specimen</span>
            </button>
          ) : (
            <>
              {!certificate.isEarned ? (
                <button
                  onClick={() => toast.error(`Need ${certificate.requiredPoints - userPoints} more points`)}
                  className="flex-1 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2"
                  disabled
                >
                  <Lock className="w-4 h-4" />
                  <span>Locked</span>
                </button>
              ) : (
                <>
                  {!certificate.certificateId ? (
                    <button
                      onClick={() => handleClaimCertificate(certificate)}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Claim Certificate</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedCertificate(certificate)}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Certificate</span>
                      </button>
                      <button
                        onClick={() => handleDownloadCertificate(certificate)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Environmental Certificates</h1>
        <p className="text-gray-600">Earn prestigious certificates for your environmental achievements</p>
        
        {/* User Points Display */}
        <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
          <Star className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-800">
            Your Points: {userPoints.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Toggle Specimen View */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowSpecimen(!showSpecimen)}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          {showSpecimen ? 'View My Certificates' : 'View Specimen Samples'}
        </button>
      </div>

      {/* Certificates Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {(showSpecimen ? getSpecimenCertificates() : certificates).map((certificate) => (
          <CertificateCard 
            key={certificate.id} 
            certificate={certificate} 
            isSpecimen={showSpecimen}
          />
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          userName={userName}
          userPhoto={userPhoto}
          userEmail={userEmail}
          userPhone={userPhone}
          userAddress={userAddress}
          onClose={() => setSelectedCertificate(null)}
          onDownloadPDF={downloadCertificatePDF}
        />
      )}
    </div>
  );
};

// Certificate Modal Component
const CertificateModal: React.FC<{
  certificate: Certificate;
  userName: string;
  userPhoto?: string;
  userEmail?: string;
  userPhone?: string;
  userAddress?: string;
  onClose: () => void;
  onDownloadPDF: () => void;
}> = ({ certificate, userName, userPhoto, userEmail, userPhone, userAddress, onClose, onDownloadPDF }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Design */}
        <div ref={certificateRef} className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
          {/* Certificate Border */}
          <div className={`border-4 ${certificate.type === 'bronze' ? 'border-orange-500' 
            : certificate.type === 'silver' ? 'border-gray-400' 
            : 'border-yellow-500'} rounded-lg p-8 bg-white`}>
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {certificate.type === 'bronze' ? (
                  <Award className="w-16 h-16 text-orange-600" />
                ) : certificate.type === 'silver' ? (
                  <Shield className="w-16 h-16 text-gray-500" />
                ) : (
                  <Crown className="w-16 h-16 text-yellow-500" />
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Government of NCT of Delhi
              </h2>
              <h3 className="text-lg text-gray-700 mb-1">
                Department of Environment
              </h3>
              <p className="text-sm text-gray-600">
                Delhi Pollution Control Committee
              </p>
            </div>

            {/* Certificate Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {certificate.title}
              </h1>
              <div className={`w-32 h-1 mx-auto bg-gradient-to-r ${getCertificateColor(certificate.type)}`} />
            </div>

            {/* Recipient with Photo */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700 mb-2">This is to certify that</p>
              <div className="flex items-center justify-center gap-4 mb-4">
                {userPhoto && (
                  <img 
                    src={userPhoto} 
                    alt={userName}
                    className="w-20 h-20 rounded-full border-4 border-gray-300 object-cover"
                  />
                )}
                <p className="text-2xl font-bold text-gray-900">{userName}</p>
              </div>
              <p className="text-gray-600 mt-2">has successfully demonstrated exceptional commitment to environmental conservation and sustainable practices</p>
            </div>

            {/* User Details */}
            {(userEmail || userPhone || userAddress) && (
              <div className="text-center mb-6 bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  {userEmail && <span className="block mb-1">📧 {userEmail}</span>}
                  {userPhone && <span className="block mb-1">📱 {userPhone}</span>}
                  {userAddress && <span className="block">📍 {userAddress}</span>}
                </p>
              </div>
            )}

            {/* Description */}
            <div className="text-center mb-6">
              <p className="text-gray-700 italic">
                &quot;{certificate.description}&quot;
              </p>
            </div>

            {/* Date and ID */}
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm text-gray-600">Date of Issue</p>
                <p className="font-semibold text-gray-900">
                  {certificate.issuedDate || new Date().toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-600">Certificate ID</p>
                <p className="font-mono font-semibold text-gray-900">
                  {certificate.certificateId || 'PENDING'}
                </p>
              </div>
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-300">
              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
                <p className="text-sm text-gray-700 font-semibold">Director</p>
                <p className="text-xs text-gray-600">Department of Environment</p>
                <p className="text-xs text-gray-600">Govt. of NCT of Delhi</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
                <p className="text-sm text-gray-700 font-semibold">Member Secretary</p>
                <p className="text-xs text-gray-600">Delhi Pollution Control Committee</p>
              </div>
            </div>

            {/* Official Seal */}
            <div className="absolute bottom-4 right-4">
              <div className={`w-20 h-20 rounded-full border-2 ${certificate.type === 'bronze' ? 'border-orange-500' 
                : certificate.type === 'silver' ? 'border-gray-400' 
                : 'border-yellow-500'} flex items-center justify-center bg-white`}>
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-900">OFFICIAL</div>
                  <div className="text-xs font-bold text-gray-900">SEAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onDownloadPDF}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper function for certificate colors
const getCertificateColor = (type: string): string => {
  switch (type) {
    case 'bronze':
      return 'from-orange-400 to-orange-600';
    case 'silver':
      return 'from-gray-400 to-gray-600';
    case 'gold':
      return 'from-yellow-400 to-yellow-600';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

export default CertificateSystem;
