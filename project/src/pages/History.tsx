import React, { useState } from 'react';
import { Clock, Search, Trash2, FileText, TrendingUp } from 'lucide-react';
import { QueryResult } from '../App';

interface HistoryProps {
  queryHistory: QueryResult[];
  setQueryHistory: React.Dispatch<React.SetStateAction<QueryResult[]>>;
}

const History: React.FC<HistoryProps> = ({ queryHistory, setQueryHistory }) => {
  const [selectedQuery, setSelectedQuery] = useState<QueryResult | null>(null);

  const deleteQuery = (queryId: string) => {
    setQueryHistory(prev => prev.filter(q => q.id !== queryId));
    if (selectedQuery?.id === queryId) {
      setSelectedQuery(null);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return date.toLocaleDateString();
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-100';
    if (confidence >= 0.8) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Query History
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your past searches and their results. Click on any query to see detailed answers.
          </p>
        </div>

        {queryHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
              <Clock className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Search History</h3>
            <p className="text-gray-600 mb-6">
              Your search queries will appear here once you start asking questions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Query List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Queries ({queryHistory.length})
              </h2>
              
              {queryHistory.map((query) => (
                <div
                  key={query.id}
                  className={`bg-white rounded-lg p-4 border cursor-pointer transition-all duration-200 ${
                    selectedQuery?.id === query.id
                      ? 'border-blue-300 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedQuery(query)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Search className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-500">
                          {formatDate(query.timestamp)}
                        </span>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {query.query}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{query.answers.length} answer{query.answers.length > 1 ? 's' : ''}</span>
                        <span>•</span>
                        <span>
                          Avg confidence: {Math.round(
                            query.answers.reduce((sum, answer) => sum + answer.confidence, 0) / 
                            query.answers.length * 100
                          )}%
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteQuery(query.id);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Query Details */}
            <div className="lg:sticky lg:top-8">
              {selectedQuery ? (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedQuery.timestamp.toLocaleString()}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {selectedQuery.query}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>
                        {selectedQuery.answers.length} answer{selectedQuery.answers.length > 1 ? 's' : ''} found
                      </span>
                    </div>

                    {selectedQuery.answers.map((answer, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">
                              Answer {index + 1}
                            </h4>
                            <p className="text-sm text-gray-500">Source: {answer.source}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-gray-400" />
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidenceColor(answer.confidence)}`}>
                              {Math.round(answer.confidence * 100)}% confidence
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                          {answer.text}
                        </p>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-medium text-gray-700 mb-2">Highlighted Context:</p>
                          <div 
                            className="text-xs text-gray-600"
                            dangerouslySetInnerHTML={{ __html: answer.highlighted }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a query to view detailed results</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;