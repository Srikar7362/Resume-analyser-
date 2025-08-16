import React, { useState } from 'react';
import { MapPin, DollarSign, Calendar, Star, Settings, Briefcase, Award, TrendingUp } from 'lucide-react';

interface JobDetailsProps {
  jobData: {
    title: string;
    experience: string;
    location: string;
    salary: string;
    skills: string[];
    skillWeights: { [key: string]: number };
  };
  onWeightsUpdate: (weights: { [key: string]: number }) => void;
  onScreenResume: () => void;
}

const JobDetailsSection: React.FC<JobDetailsProps> = (props: JobDetailsProps) => {
  const { jobData, onWeightsUpdate, onScreenResume } = props;
  type SkillWeights = { [key: string]: number };
  const [weights, setWeights] = useState<SkillWeights>(jobData.skillWeights);

  const handleWeightChange = (skill: string, weight: number) => {
    setWeights((prev: SkillWeights) => ({ ...prev, [skill]: weight }));
  };

  const handleUpdateWeights = () => {
    onWeightsUpdate(weights);
  };

  const getWeightColor = (weight: number) => {
    if (weight >= 4) return 'from-red-400 to-red-600';
    if (weight >= 3) return 'from-orange-400 to-orange-600';
    if (weight >= 2) return 'from-yellow-400 to-yellow-600';
    return 'from-green-400 to-green-600';
  };

  const getWeightLabel = (weight: number) => {
    if (weight >= 4) return 'Critical';
    if (weight >= 3) return 'Important';
    if (weight >= 2) return 'Moderate';
    return 'Basic';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl border border-gray-100">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl mr-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{jobData.title}</h3>
                <p className="text-gray-600 text-lg">AI-extracted job requirements and analysis</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-500 p-3 rounded-xl mr-3">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-blue-900 text-lg">Experience Required</span>
                </div>
                <p className="text-blue-800 text-xl font-semibold">{jobData.experience}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="bg-green-500 p-3 rounded-xl mr-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-green-900 text-lg">Location</span>
                </div>
                <p className="text-green-800 text-xl font-semibold">{jobData.location}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-500 p-3 rounded-xl mr-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-purple-900 text-lg">Salary Range</span>
                </div>
                <p className="text-purple-800 text-xl font-semibold">{jobData.salary}</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-2xl mr-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">Extracted Skills & Weights</h3>
                <p className="text-gray-600">Configure skill importance for better candidate matching</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {jobData.skills.map((skill, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">{skill}</h4>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getWeightColor(weights[skill] || 1)}`}>
                      {getWeightLabel(weights[skill] || 1)}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Weight Level</span>
                      <span className="text-lg font-bold text-gray-900">{weights[skill] || 1}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getWeightColor(weights[skill] || 1)} transition-all duration-300`}
                        style={{ width: `${((weights[skill] || 1) / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={weights[skill] || 1}
                      onChange={(e) => handleWeightChange(skill, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <input
                      type="number"
                      value={weights[skill] || 1}
                      onChange={(e) => handleWeightChange(skill, parseInt(e.target.value))}
                      min="1"
                      max="5"
                      className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleUpdateWeights}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-gray-700 hover:to-gray-800 transform transition-all duration-200 hover:scale-105 flex items-center shadow-xl"
              >
                <Settings className="h-6 w-6 mr-3" />
                Update Skill Weights
              </button>
              <button
                onClick={onScreenResume}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-green-800 transform transition-all duration-200 hover:scale-105 flex items-center shadow-xl"
              >
                <TrendingUp className="h-6 w-6 mr-3" />
                Start Resume Screening
              </button>
            </div>
          </div>

          {/* Weight Legend */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-600" />
              Weight Level Guide
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 mr-2"></div>
                <span className="text-sm font-medium text-gray-700">1 - Basic</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 mr-2"></div>
                <span className="text-sm font-medium text-gray-700">2 - Moderate</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 mr-2"></div>
                <span className="text-sm font-medium text-gray-700">3 - Important</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-red-600 mr-2"></div>
                <span className="text-sm font-medium text-gray-700">4-5 - Critical</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsSection;