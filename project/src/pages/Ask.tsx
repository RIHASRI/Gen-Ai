import React, { useState } from 'react';
import { Send, Search, Loader2, FileText, TrendingUp } from 'lucide-react';
import { UploadedFile, QueryResult } from '../App';

interface AskProps {
  uploadedFiles: UploadedFile[];
  queryHistory: QueryResult[];
  setQueryHistory: React.Dispatch<React.SetStateAction<QueryResult[]>>;
}

const Ask: React.FC<AskProps> = ({ uploadedFiles, queryHistory, setQueryHistory }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentResults, setCurrentResults] = useState<QueryResult | null>(null);

  const sampleQuestions = [
    "What are the main findings in the document?",
    "Can you summarize the key points?",
    "What methodology was used in this research?",
    "What are the recommendations mentioned?",
  ];

  const mockAnswers = [
    {
      text: "The study reveals that machine learning algorithms have significantly improved accuracy in predictive analytics by 34% compared to traditional statistical methods. This improvement is particularly notable in complex pattern recognition tasks.",
      confidence: 0.92,
      source: "research_paper.pdf",
      highlighted: "machine learning algorithms have significantly <mark>improved accuracy</mark> in predictive analytics by <mark>34% compared to traditional</mark> statistical methods"
    },
    {
      text: "Implementation of the proposed framework resulted in reduced processing time from 45 minutes to 12 minutes, representing a 73% improvement in operational efficiency across all tested scenarios.",
      confidence: 0.87,
      source: "technical_report.docx",
      highlighted: "Implementation of the proposed framework resulted in <mark>reduced processing time</mark> from 45 minutes to 12 minutes, representing a <mark>73% improvement</mark>"
    },
    {
      text: "The research methodology employed a mixed-methods approach, combining quantitative analysis of 10,000 data points with qualitative interviews from 50 industry experts to ensure comprehensive coverage.",
      confidence: 0.94,
      source: "methodology_doc.pdf",
      highlighted: "The research methodology employed a <mark>mixed-methods approach</mark>, combining <mark>quantitative analysis of 10,000 data points</mark> with qualitative interviews"
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newResult: QueryResult = {
      id: Math.random().toString(36).substring(7),
      query: query,
      answers: mockAnswers.slice(0, Math.floor(Math.random() * 3) + 1),
      timestamp: new Date(),
    };

    setCurrentResults(newResult);
    setQueryHistory(prev => [newResult, ...prev]);
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-100';
    if (confidence >= 0.8) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ask Your Documents
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ask questions in natural language and get precise answers from your uploaded documents 
            with confidence scores and source highlighting.
          </p>
        </div>

        {/* Document Status */}
        {uploadedFiles.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">No Documents Uploaded</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Please upload documents first to start asking questions.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  {uploadedFiles.length} Document{uploadedFiles.length > 1 ? 's' : ''} Ready
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  {uploadedFiles.filter(f => f.processed).length} processed and ready for search
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search Interface */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about your documents..."
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                disabled={uploadedFiles.length === 0}
              />
              <div className="absolute bottom-3 right-3">
                <button
                  onClick={handleSearch}
                  disabled={!query.trim() || isSearching || uploadedFiles.length === 0}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sample Questions */}
            {!currentResults && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Sample Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(question)}
                      className="px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      disabled={uploadedFiles.length === 0}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Searching through your documents...</p>
          </div>
        )}

        {currentResults && !isSearching && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Search className="h-4 w-4" />
              <span>Found {currentResults.answers.length} relevant answer{currentResults.answers.length > 1 ? 's' : ''}</span>
            </div>

            {currentResults.answers.map((answer, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Answer {index + 1}</h3>
                      <p className="text-sm text-gray-500">Source: {answer.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidenceColor(answer.confidence)}`}>
                      {Math.round(answer.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{answer.text}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Highlighted Context:</p>
                    <div 
                      className="text-sm text-gray-600"
                      dangerouslySetInnerHTML={{ __html: answer.highlighted }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ask;