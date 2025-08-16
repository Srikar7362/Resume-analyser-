import React, { useState } from 'react';
import { Download, Trash2, Brain, RotateCcw, Filter, User, Mail, Phone, Calendar, CheckCircle, XCircle, Shield, AlertTriangle, Eye, TrendingUp } from 'lucide-react';

interface Resume {
  slno: number;
  name: string;
  email: string;
  phone: string;
  candidateExperienceYears: number;
  experienceMet: string;
  skills: string[];
  matchScore: number;
  suitable: string;
  sentiment: string;
  sentimentScore: number;
  plagiarism: string;
  institutionCheck: string;
  experienceGap: string;
  fraudStatus: string;
}

interface ResumeTableProps {
  resumes: Resume[];
  onDownloadReport: () => void;
  onClearResumes: () => void;
  onAnalyzeSentiment: () => void;
}

const ResumeTable: React.FC<ResumeTableProps> = ({ 
  resumes, 
  onDownloadReport, 
  onClearResumes, 
  onAnalyzeSentiment 
}) => {
  const [filter, setFilter] = useState('all');
  const [filteredResumes, setFilteredResumes] = useState(resumes);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');

  const handleFilterChange = (filterValue: string) => {
    setFilter(filterValue);
    if (filterValue === 'all') {
      setFilteredResumes(resumes);
    } else {
      setFilteredResumes(resumes.filter(resume => resume.suitable.toLowerCase() === filterValue.toLowerCase()));
    }
  };

  const resetFilters = () => {
    setFilter('all');
    setFilteredResumes(resumes);
  };

  const handleClearResumes = () => {
    if (window.confirm('Are you sure you want to clear all resumes? This action cannot be undone.')) {
      onClearResumes();
    }
  };

  React.useEffect(() => {
    setFilteredResumes(resumes);
  }, [resumes]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-600';
    if (score >= 60) return 'from-yellow-400 to-yellow-600';
    if (score >= 40) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-700';
    if (score >= 60) return 'text-yellow-700';
    if (score >= 40) return 'text-orange-700';
    return 'text-red-700';
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (resumes.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl shadow-xl">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="h-12 w-12 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Resumes Screened Yet</h3>
        <p className="text-gray-500 text-lg">Upload resumes to get started with AI-powered screening.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-2xl mr-4">
            <Eye className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Screened Candidates</h2>
            <p className="text-gray-600">Comprehensive analysis results</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              viewMode === 'cards' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              viewMode === 'table' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Table
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <label htmlFor="filter" className="text-sm font-medium text-gray-700 mr-3">
            Filter by Suitability:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          >
            <option value="all">All Candidates</option>
            <option value="yes">✅ Suitable</option>
            <option value="no">❌ Unsuitable</option>
          </select>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onDownloadReport}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transform transition-all duration-200 hover:scale-105 flex items-center shadow-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </button>
          <button
            onClick={handleClearResumes}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transform transition-all duration-200 hover:scale-105 flex items-center shadow-lg"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </button>
          <button
            onClick={onAnalyzeSentiment}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform transition-all duration-200 hover:scale-105 flex items-center shadow-lg"
          >
            <Brain className="h-4 w-4 mr-2" />
            Analyze Sentiment
          </button>
          <button
            onClick={resetFilters}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-2 rounded-xl font-semibold hover:from-yellow-700 hover:to-yellow-800 transform transition-all duration-200 hover:scale-105 flex items-center shadow-lg"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResumes.map((resume, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {resume.slno}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{resume.name}</h3>
                    <p className="text-sm text-gray-600">{resume.candidateExperienceYears} years experience</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  resume.suitable === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {resume.suitable === 'Yes' ? '✅ Suitable' : '❌ Unsuitable'}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-blue-500" />
                  {resume.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-green-500" />
                  {resume.phone}
                </div>
              </div>

              {/* Match Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Match Score</span>
                  <span className={`text-lg font-bold ${getScoreTextColor(resume.matchScore)}`}>
                    {resume.matchScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor(resume.matchScore)} transition-all duration-1000`}
                    style={{ width: `${resume.matchScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {resume.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <div className={`text-2xl mb-1 ${getSentimentColor(resume.sentiment)} w-12 h-12 rounded-full flex items-center justify-center mx-auto`}>
                    {getSentimentIcon(resume.sentiment)}
                  </div>
                  <div className="text-xs text-gray-600">Sentiment</div>
                  <div className="text-sm font-bold">{resume.sentimentScore}%</div>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1 ${
                    resume.experienceMet === 'Yes' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {resume.experienceMet === 'Yes' ? 
                      <CheckCircle className="h-6 w-6 text-green-600" /> : 
                      <XCircle className="h-6 w-6 text-red-600" />
                    }
                  </div>
                  <div className="text-xs text-gray-600">Experience</div>
                  <div className="text-sm font-bold">{resume.experienceMet}</div>
                </div>
              </div>

              {/* Security Checks */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2 rounded-lg text-center ${
                    resume.plagiarism === 'Not Detected' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    <Shield className="h-4 w-4 mx-auto mb-1" />
                    <div>Plagiarism</div>
                    <div className="font-bold">{resume.plagiarism}</div>
                  </div>
                  <div className={`p-2 rounded-lg text-center ${
                    resume.fraudStatus === 'Not Fraud' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    <AlertTriangle className="h-4 w-4 mx-auto mb-1" />
                    <div>Fraud Check</div>
                    <div className="font-bold">{resume.fraudStatus}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Skills</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Match Score</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Suitability</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sentiment</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResumes.map((resume, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {resume.slno}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{resume.name}</div>
                        <div className="text-sm text-gray-500">{resume.candidateExperienceYears} years</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{resume.email}</div>
                    <div className="text-sm text-gray-500">{resume.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      resume.experienceMet === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {resume.experienceMet === 'Yes' ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {resume.experienceMet}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {resume.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {resume.skills.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{resume.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(resume.matchScore)}`}
                          style={{ width: `${resume.matchScore}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold ${getScoreTextColor(resume.matchScore)}`}>
                        {resume.matchScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      resume.suitable === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {resume.suitable === 'Yes' ? '✅' : '❌'} {resume.suitable}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getSentimentIcon(resume.sentiment)}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{resume.sentiment}</div>
                        <div className="text-sm text-gray-500">{resume.sentimentScore}%</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className={`text-xs px-2 py-1 rounded ${
                        resume.plagiarism === 'Not Detected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        🛡️ {resume.plagiarism}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        resume.fraudStatus === 'Not Fraud' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        🔍 {resume.fraudStatus}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResumeTable;