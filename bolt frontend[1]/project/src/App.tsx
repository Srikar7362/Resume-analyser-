import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import JobDetailsSection from './components/JobDetailsSection';
import ResumeUploadSection from './components/ResumeUploadSection';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ResumeTable from './components/ResumeTable';
import ScrollToTop from './components/ScrollToTop';

interface JobData {
  title: string;
  experience: string;
  location: string;
  salary: string;
  skills: string[];
  skillWeights: { [key: string]: number };
}

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

interface Statistics {
  totalResumes: number;
  suitablePercentage: number;
  unsuitablePercentage: number;
  averageMatchScore: number;
  topSkillsLacking: Array<[string, number]>;
}

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [statistics, setStatistics] = useState<Statistics>({
    totalResumes: 0,
    suitablePercentage: 0,
    unsuitablePercentage: 0,
    averageMatchScore: 0,
    topSkillsLacking: []
  });
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to simulate AI processing of job description
  const processJobDescription = async (description: string): Promise<JobData> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data
    return {
      title: "Software Engineer",
      experience: "3-5 years",
      location: "San Francisco, CA",
      salary: "$80,000 - $120,000",
      skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
      skillWeights: {
        "JavaScript": 5,
        "React": 4,
        "Node.js": 3,
        "Python": 3,
        "SQL": 2,
        "Git": 1
      }
    };
  };

  // Mock function to simulate resume processing
  const processResumes = async (files: FileList): Promise<Resume[]> => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock processed resumes
    const mockResumes: Resume[] = Array.from(files).map((file, index) => ({
      slno: resumes.length + index + 1,
      name: `Candidate ${resumes.length + index + 1}`,
      email: `candidate${resumes.length + index + 1}@email.com`,
      phone: `+1-555-0${100 + index}`,
      candidateExperienceYears: Math.floor(Math.random() * 8) + 1,
      experienceMet: Math.random() > 0.5 ? 'Yes' : 'No',
      skills: ['JavaScript', 'React', 'Python'].slice(0, Math.floor(Math.random() * 3) + 1),
      matchScore: Math.floor(Math.random() * 100),
      suitable: Math.random() > 0.4 ? 'Yes' : 'No',
      sentiment: ['Positive', 'Neutral', 'Negative'][Math.floor(Math.random() * 3)],
      sentimentScore: Math.floor(Math.random() * 100),
      plagiarism: Math.random() > 0.8 ? 'Detected' : 'Not Detected',
      institutionCheck: Math.random() > 0.9 ? 'Invalid' : 'Valid',
      experienceGap: Math.random() > 0.7 ? 'Gap Found' : 'No Gap',
      fraudStatus: Math.random() > 0.95 ? 'Fraud' : 'Not Fraud'
    }));
    
    return mockResumes;
  };

  const calculateStatistics = (resumeData: Resume[]): Statistics => {
    const total = resumeData.length;
    const suitable = resumeData.filter(r => r.suitable === 'Yes').length;
    const avgScore = resumeData.reduce((sum, r) => sum + r.matchScore, 0) / total;
    
    return {
      totalResumes: total,
      suitablePercentage: Math.round((suitable / total) * 100),
      unsuitablePercentage: Math.round(((total - suitable) / total) * 100),
      averageMatchScore: Math.round(avgScore),
      topSkillsLacking: [
        ['JavaScript', 15],
        ['React', 12],
        ['Node.js', 10],
        ['Python', 8],
        ['SQL', 6]
      ]
    };
  };

  const handleJobDescriptionSubmit = async (description: string) => {
    setIsLoading(true);
    try {
      const extractedData = await processJobDescription(description);
      setJobData(extractedData);
      setCurrentSection('dashboard');
    } catch (error) {
      console.error('Error processing job description:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWeightsUpdate = (weights: { [key: string]: number }) => {
    if (jobData) {
      setJobData({ ...jobData, skillWeights: weights });
    }
  };

  const handleScreenResume = () => {
    setShowResumeUpload(true);
    setCurrentSection('resumes');
  };

  const handleResumeUpload = async (files: FileList) => {
    setIsLoading(true);
    try {
      const newResumes = await processResumes(files);
      const updatedResumes = [...resumes, ...newResumes];
      setResumes(updatedResumes);
      setStatistics(calculateStatistics(updatedResumes));
    } catch (error) {
      console.error('Error processing resumes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    // Mock download functionality
    const blob = new Blob(['Resume Screening Report'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume_screening_report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearResumes = () => {
    setResumes([]);
    setStatistics({
      totalResumes: 0,
      suitablePercentage: 0,
      unsuitablePercentage: 0,
      averageMatchScore: 0,
      topSkillsLacking: []
    });
  };

  const handleAnalyzeSentiment = () => {
    // Mock sentiment analysis
    alert('Sentiment analysis completed! Check the updated results in the table.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
      
      <main className="pt-16">
        {currentSection === 'home' && (
          <HeroSection 
            onJobDescriptionSubmit={handleJobDescriptionSubmit}
            isLoading={isLoading}
          />
        )}
        
        {currentSection === 'dashboard' && jobData && (
          <JobDetailsSection 
            jobData={jobData}
            onWeightsUpdate={handleWeightsUpdate}
            onScreenResume={handleScreenResume}
          />
        )}
        
        {currentSection === 'resumes' && (
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ResumeUploadSection 
                isVisible={showResumeUpload}
                onResumeUpload={handleResumeUpload}
                isLoading={isLoading}
              />
              
              {resumes.length > 0 && (
                <div className="mt-8">
                  <AnalyticsDashboard statistics={statistics} />
                  <ResumeTable 
                    resumes={resumes}
                    onDownloadReport={handleDownloadReport}
                    onClearResumes={handleClearResumes}
                    onAnalyzeSentiment={handleAnalyzeSentiment}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      <ScrollToTop />
    </div>
  );
}

export default App;