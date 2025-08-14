import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, File, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { UploadedFile } from '../App';

interface UploadProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const Upload: React.FC<UploadProps> = ({ uploadedFiles, setUploadedFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);

  const acceptedTypes = ['.pdf', '.docx', '.txt'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const simulateUpload = async (file: File): Promise<void> => {
    const fileId = Math.random().toString(36).substring(7);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(prev => ({ ...prev, [fileId]: i }));
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Simulate processing
    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      processed: false,
    };

    setUploadedFiles(prev => [...prev, newFile]);

    // Simulate processing completion
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { ...f, processed: true } : f)
      );
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
    }, 2000);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 50MB.`);
        continue;
      }

      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        alert(`File ${file.name} is not supported. Please upload PDF, DOCX, or TXT files.`);
        continue;
      }

      await simulateUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <File className="h-8 w-8 text-red-500" />;
      case 'docx':
        return <File className="h-8 w-8 text-blue-500" />;
      case 'txt':
        return <FileText className="h-8 w-8 text-gray-500" />;
      default:
        return <File className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Documents
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload PDF, DOCX, or TXT files to start your intelligent document search journey. 
            Our AI will process them and make them searchable.
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            isDragging
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <UploadIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drag and drop your files here
              </h3>
              <p className="text-gray-500 mb-4">
                or click to browse from your computer
              </p>
              
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.txt"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <UploadIcon className="h-5 w-5 mr-2" />
                Choose Files
              </label>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>Supported formats: PDF, DOCX, TXT</p>
              <p>Maximum file size: 50MB</p>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {Object.keys(uploadProgress).length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Uploading...</h3>
            {Object.entries(uploadProgress).map(([fileId, progress]) => (
              <div key={fileId} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Processing...</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Uploaded Documents ({uploadedFiles.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    {getFileIcon(file.name)}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-2 truncate" title={file.name}>
                    {file.name}
                  </h4>
                  
                  <p className="text-sm text-gray-500 mb-3">
                    {formatFileSize(file.size)}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    {file.processed ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Ready to search</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600 font-medium">Processing...</span>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="mt-3 w-full px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Preview
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Preview Modal */}
        {previewFile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{previewFile.name}</h3>
                <button
                  onClick={() => setPreviewFile(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  {getFileIcon(previewFile.name)}
                  <p className="mt-4 text-gray-600">
                    File preview will be available once document processing is complete.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Size: {formatFileSize(previewFile.size)} | 
                    Uploaded: {previewFile.uploadedAt.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;