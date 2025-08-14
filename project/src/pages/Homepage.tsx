import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Upload, 
  Search, 
  History, 
  FileText, 
  Brain, 
  Zap,
  Shield,
  Clock,
  Target
} from 'lucide-react';

const Homepage: React.FC = () => {
  const features = [
    {
      icon: Upload,
      title: 'Smart Document Upload',
      description: 'Upload PDFs, DOCX, and TXT files with drag-and-drop functionality and instant preview.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Search',
      description: 'Advanced semantic search using embeddings to find contextually relevant answers.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'FAISS indexing ensures rapid retrieval of relevant information from your documents.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your documents are processed locally with enterprise-grade security measures.',
    },
    {
      icon: Clock,
      title: 'Query History',
      description: 'Keep track of all your searches and easily revisit previous findings.',
    },
    {
      icon: Target,
      title: 'Precise Results',
      description: 'Get the most relevant answers with confidence scores and source highlighting.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <FileText className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Documents into
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Intelligent Knowledge
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              StudyMate uses advanced AI to help you search through your documents with natural language queries. 
              Upload your files, ask questions, and get precise answers with contextual highlighting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/upload"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/ask"
                className="group bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 flex items-center space-x-2 transition-all duration-300 hover:shadow-lg"
              >
                <Search className="h-5 w-5" />
                <span>Try Demo</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Cards */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-float">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">PDF Processed</span>
            </div>
          </div>
        </div>
        
        <div className="absolute top-32 right-10 hidden lg:block">
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-float-delayed">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">Search Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Smart Document Search
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make document analysis effortless and intelligent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Document Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of users who have revolutionized how they interact with their documents.
          </p>
          <Link
            to="/upload"
            className="group inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;