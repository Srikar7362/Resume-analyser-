import React, { useState } from 'react';
import { Upload, File, AlertCircle, UploadCloud as CloudUpload, CheckCircle, FileText } from 'lucide-react';

interface ResumeUploadSectionProps {
  isVisible: boolean;
  onResumeUpload: (files: FileList) => void;
  isLoading: boolean;
}

const ResumeUploadSection: React.FC<ResumeUploadSectionProps> = ({ 
  isVisible, 
  onResumeUpload, 
  isLoading 
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Validate PDF files
      const invalidFiles = Array.from(files).filter(file => !file.name.endsWith('.pdf'));
      if (invalidFiles.length > 0) {
        alert('Only PDF files are allowed.');
        e.target.value = '';
        return;
      }
      setSelectedFiles(Array.from(files));
      onResumeUpload(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files) {
      const invalidFiles = Array.from(files).filter(file => !file.name.endsWith('.pdf'));
      if (invalidFiles.length > 0) {
        alert('Only PDF files are allowed.');
        return;
      }
      setSelectedFiles(Array.from(files));
      onResumeUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isVisible) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-2xl mr-4">
                <CloudUpload className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">Upload Resumes</h2>
                <p className="text-gray-600 text-lg">Drag and drop or click to select PDF files</p>
              </div>
            </div>
          </div>
          
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              dragOver 
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-105' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50'
            } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="resume-upload"
              disabled={isLoading}
            />
            
            <label htmlFor="resume-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                {!isLoading ? (
                  <>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full mb-6">
                      <Upload className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Drop your resume files here
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      or click to browse and select files
                    </p>
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-xl">
                      <div className="flex items-center text-blue-700 font-medium">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Only PDF files are accepted • Multiple files supported
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full mb-6">
                      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Processing Resumes...
                    </h3>
                    <p className="text-gray-600 text-lg">
                      AI is analyzing your uploaded files
                    </p>
                  </div>
                )}
              </div>
            </label>
          </div>

          {selectedFiles.length > 0 && !isLoading && (
            <div className="mt-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                Selected Files ({selectedFiles.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center">
                      <div className="bg-red-500 p-2 rounded-lg mr-3">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">AI Processing in Progress</h4>
                  <p className="text-gray-600">Analyzing resumes, extracting data, and calculating match scores...</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Tips */}
          <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4">📋 Upload Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-start">
                <div className="bg-blue-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Ensure resumes are in PDF format for best results</span>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Clear, well-formatted resumes yield better analysis</span>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Multiple files can be uploaded simultaneously</span>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Processing time depends on file size and quantity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeUploadSection;