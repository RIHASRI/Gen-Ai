import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Upload from './pages/Upload';
import Ask from './pages/Ask';
import History from './pages/History';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  processed: boolean;
}

export interface QueryResult {
  id: string;
  query: string;
  answers: Array<{
    text: string;
    confidence: number;
    source: string;
    highlighted: string;
  }>;
  timestamp: Date;
}

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [queryHistory, setQueryHistory] = useState<QueryResult[]>([]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route 
            path="/upload" 
            element={
              <Upload 
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />
            } 
          />
          <Route 
            path="/ask" 
            element={
              <Ask 
                uploadedFiles={uploadedFiles}
                queryHistory={queryHistory}
                setQueryHistory={setQueryHistory}
              />
            } 
          />
          <Route 
            path="/history" 
            element={
              <History 
                queryHistory={queryHistory}
                setQueryHistory={setQueryHistory}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;