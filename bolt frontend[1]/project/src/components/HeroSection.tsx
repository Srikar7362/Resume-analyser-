// // // // // import React, { useState } from 'react';
// // // // // import { Upload, Sparkles } from 'lucide-react';

// // // // // interface HeroSectionProps {
// // // // //   onJobDescriptionSubmit: (jobDescription: string) => void;
// // // // //   isLoading: boolean;
// // // // // }

// // // // // const HeroSection: React.FC<HeroSectionProps> = ({ onJobDescriptionSubmit, isLoading }) => {
// // // // //   const [jobDescription, setJobDescription] = useState('');

// // // // //   const handleSubmit = (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     if (jobDescription.trim()) {
// // // // //       onJobDescriptionSubmit(jobDescription);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
// // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // // //         <div className="text-center mb-12 animate-fade-in">
// // // // //           <div className="flex justify-center items-center mb-4">
// // // // //             <Sparkles className="h-12 w-12 text-blue-600 mr-3" />
// // // // //             <h1 className="text-5xl font-bold text-gray-900">AI-Powered Resume Screening</h1>
// // // // //           </div>
// // // // //           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// // // // //             Upload job descriptions and resumes to find the best candidates instantly with our advanced AI technology.
// // // // //           </p>
// // // // //         </div>
        
// // // // //         <div className="max-w-3xl mx-auto">
// // // // //           <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
// // // // //             <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Job Description Input</h2>
// // // // //             <form onSubmit={handleSubmit} className="space-y-6">
// // // // //               <div>
// // // // //                 <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
// // // // //                   Enter Job Description:
// // // // //                 </label>
// // // // //                 <textarea
// // // // //                   id="jobDescription"
// // // // //                   value={jobDescription}
// // // // //                   onChange={(e) => setJobDescription(e.target.value)}
// // // // //                   rows={6}
// // // // //                   placeholder="Paste the job description here..."
// // // // //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="text-center">
// // // // //                 <button
// // // // //                   type="submit"
// // // // //                   disabled={isLoading}
// // // // //                   className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
// // // // //                 >
// // // // //                   {isLoading ? (
// // // // //                     <div className="flex items-center">
// // // // //                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
// // // // //                       Processing...
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <>
// // // // //                       <Upload className="h-5 w-5 inline mr-2" />
// // // // //                       Submit Job Description
// // // // //                     </>
// // // // //                   )}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </form>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // };

// // // // // export default HeroSection;
// // // // import React, { useState } from 'react';
// // // // import { Upload, Sparkles } from 'lucide-react';

// // // // interface HeroSectionProps {
// // // //   onJobDescriptionSubmit?: (jobDescription: string) => void;
// // // //   isLoading: boolean;
// // // // }

// // // // const HeroSection: React.FC<HeroSectionProps> = ({ onJobDescriptionSubmit, isLoading }) => {
// // // //   const [jobDescription, setJobDescription] = useState('');
// // // //   const [resumeStatus, setResumeStatus] = useState('Not Uploaded');
// // // //   const [resumeFile, setResumeFile] = useState<File | null>(null);

// // // //   // Example analysis logic (replace with your actual analysis)
// // // //   const getAnalysis = () => {
// // // //     return { score: 90 }; // Dummy analysis object
// // // //   };

// // // //   const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     if (e.target.files && e.target.files.length > 0) {
// // // //       setResumeFile(e.target.files[0]);
// // // //       setResumeStatus('Uploaded');
// // // //     } else {
// // // //       setResumeFile(null);
// // // //       setResumeStatus('Not Uploaded');
// // // //     }
// // // //   };

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (jobDescription.trim() && resumeStatus === 'Uploaded') {
// // // //       const analysis = getAnalysis();

// // // //       // Send data to backend
// // // //       await fetch('http://localhost:5000/api/resumes', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({
// // // //           jobDescription,
// // // //           resumeStatus,
// // // //           analysis
// // // //         })
// // // //       });

// // // //       // Optionally, reset form or show success message
// // // //       setJobDescription('');
// // // //       setResumeStatus('Not Uploaded');
// // // //       setResumeFile(null);

// // // //       if (onJobDescriptionSubmit) {
// // // //         onJobDescriptionSubmit(jobDescription);
// // // //       }
// // // //     } else {
// // // //       alert('Please enter job description and upload your resume.');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //         <div className="text-center mb-12 animate-fade-in">
// // // //           <div className="flex justify-center items-center mb-4">
// // // //             <Sparkles className="h-12 w-12 text-blue-600 mr-3" />
// // // //             <h1 className="text-5xl font-bold text-gray-900">AI-Powered Resume Screening</h1>
// // // //           </div>
// // // //           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// // // //             Upload job descriptions and resumes to find the best candidates instantly with our advanced AI technology.
// // // //           </p>
// // // //         </div>
        
// // // //         <div className="max-w-3xl mx-auto">
// // // //           <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
// // // //             <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Job Description Input</h2>
// // // //             <form onSubmit={handleSubmit} className="space-y-6">
// // // //               <div>
// // // //                 <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                   Enter Job Description:
// // // //                 </label>
// // // //                 <textarea
// // // //                   id="jobDescription"
// // // //                   value={jobDescription}
// // // //                   onChange={(e) => setJobDescription(e.target.value)}
// // // //                   rows={6}
// // // //                   placeholder="Paste the job description here..."
// // // //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                   Upload Resume:
// // // //                 </label>
// // // //                 <input
// // // //                   id="resume"
// // // //                   type="file"
// // // //                   accept=".pdf,.doc,.docx"
// // // //                   onChange={handleResumeUpload}
// // // //                   className="w-full"
// // // //                   required
// // // //                 />
// // // //                 <span className="text-sm text-gray-500">{resumeStatus}</span>
// // // //               </div>
// // // //               <div className="text-center">
// // // //                 <button
// // // //                   type="submit"
// // // //                   disabled={isLoading}
// // // //                   className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
// // // //                 >
// // // //                   {isLoading ? (
// // // //                     <div className="flex items-center">
// // // //                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
// // // //                       Processing...
// // // //                     </div>
// // // //                   ) : (
// // // //                     <>
// // // //                       <Upload className="h-5 w-5 inline mr-2" />
// // // //                       Submit Job Description
// // // //                     </>
// // // //                   )}
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default HeroSection;
// // // import React, { useState } from 'react';
// // // import { Upload, Sparkles } from 'lucide-react';

// // // interface HeroSectionProps {
// // //   onJobDescriptionSubmit?: (jobDescription: string) => void;
// // //   isLoading: boolean;
// // // }

// // // const HeroSection: React.FC<HeroSectionProps> = ({ onJobDescriptionSubmit, isLoading }) => {
// // //   const [jobDescription, setJobDescription] = useState('');
// // //   const [resumeStatus, setResumeStatus] = useState('Not Uploaded');
// // //   const [resumeFile, setResumeFile] = useState<File | null>(null);

// // //   // New state for scores
// // //   const [matchScore, setMatchScore] = useState<number>(0);
// // //   const [suitability, setSuitability] = useState<number>(0);
// // //   const [experience, setExperience] = useState<number>(0);
// // //   const [security, setSecurity] = useState<number>(0);

// // //   // Calculate average score from user input
// // //   const getAnalysis = () => {
// // //     const scores = [matchScore, suitability, experience, security];
// // //     const score = scores.reduce((sum, val) => sum + val, 0) / scores.length;
// // //     return {
// // //       matchScore,
// // //       suitability,
// // //       experience,
// // //       security,
// // //       score,
// // //     };
// // //   };

// // //   const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     if (e.target.files && e.target.files.length > 0) {
// // //       setResumeFile(e.target.files[0]);
// // //       setResumeStatus('Uploaded');
// // //     } else {
// // //       setResumeFile(null);
// // //       setResumeStatus('Not Uploaded');
// // //     }
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (
// // //       jobDescription.trim() &&
// // //       resumeStatus === 'Uploaded'
// // //     ) {
// // //       const analysis = getAnalysis();

// // //       await fetch('http://localhost:5000/api/resumes', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({
// // //           jobDescription,
// // //           resumeStatus,
// // //           analysis,
// // //         }),
// // //       });

// // //       setJobDescription('');
// // //       setResumeStatus('Not Uploaded');
// // //       setResumeFile(null);
// // //       setMatchScore(0);
// // //       setSuitability(0);
// // //       setExperience(0);
// // //       setSecurity(0);

// // //       if (onJobDescriptionSubmit) {
// // //         onJobDescriptionSubmit(jobDescription);
// // //       }
// // //     } else {
// // //       alert('Please enter job description, upload your resume, and fill all scores.');
// // //     }
// // //   };

// // //   return (
// // //     <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="text-center mb-12 animate-fade-in">
// // //           <div className="flex justify-center items-center mb-4">
// // //             <Sparkles className="h-12 w-12 text-blue-600 mr-3" />
// // //             <h1 className="text-5xl font-bold text-gray-900">AI-Powered Resume Screening</h1>
// // //           </div>
// // //           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// // //             Upload job descriptions and resumes to find the best candidates instantly with our advanced AI technology.
// // //           </p>
// // //         </div>
// // //         <div className="max-w-3xl mx-auto">
// // //           <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
// // //             <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Job Description Input</h2>
// // //             <form onSubmit={handleSubmit} className="space-y-6">
// // //               <div>
// // //                 <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
// // //                   Enter Job Description:
// // //                 </label>
// // //                 <textarea
// // //                   id="jobDescription"
// // //                   value={jobDescription}
// // //                   onChange={(e) => setJobDescription(e.target.value)}
// // //                   rows={6}
// // //                   placeholder="Paste the job description here..."
// // //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
// // //                   Upload Resume:
// // //                 </label>
// // //                 <input
// // //                   id="resume"
// // //                   type="file"
// // //                   accept=".pdf,.doc,.docx"
// // //                   onChange={handleResumeUpload}
// // //                   className="w-full"
// // //                   required
// // //                 />
// // //                 <span className="text-sm text-gray-500">{resumeStatus}</span>
// // //               </div>
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <div>
// // //                   <label htmlFor="matchScore" className="block text-sm font-medium text-gray-700 mb-2">
// // //                     Match Score:
// // //                   </label>
// // //                   <input
// // //                     id="matchScore"
// // //                     type="number"
// // //                     min={0}
// // //                     max={100}
// // //                     value={matchScore}
// // //                     onChange={(e) => setMatchScore(Number(e.target.value))}
// // //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label htmlFor="suitability" className="block text-sm font-medium text-gray-700 mb-2">
// // //                     Suitability:
// // //                   </label>
// // //                   <input
// // //                     id="suitability"
// // //                     type="number"
// // //                     min={0}
// // //                     max={100}
// // //                     value={suitability}
// // //                     onChange={(e) => setSuitability(Number(e.target.value))}
// // //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
// // //                     Experience:
// // //                   </label>
// // //                   <input
// // //                     id="experience"
// // //                     type="number"
// // //                     min={0}
// // //                     max={100}
// // //                     value={experience}
// // //                     onChange={(e) => setExperience(Number(e.target.value))}
// // //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label htmlFor="security" className="block text-sm font-medium text-gray-700 mb-2">
// // //                     Security:
// // //                   </label>
// // //                   <input
// // //                     id="security"
// // //                     type="number"
// // //                     min={0}
// // //                     max={100}
// // //                     value={security}
// // //                     onChange={(e) => setSecurity(Number(e.target.value))}
// // //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="text-center">
// // //                 <button
// // //                   type="submit"
// // //                   disabled={isLoading}
// // //                   className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
// // //                 >
// // //                   {isLoading ? (
// // //                     <div className="flex items-center">
// // //                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
// // //                       Processing...
// // //                     </div>
// // //                   ) : (
// // //                     <>
// // //                       <Upload className="h-5 w-5 inline mr-2" />
// // //                       Submit Job Description
// // //                     </>
// // //                   )}
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };
// // // export default HeroSection;
// // import React, { useState } from 'react';
// // import { Upload, Sparkles } from 'lucide-react';

// // interface HeroSectionProps {
// //   onJobDescriptionSubmit?: (jobDescription: string) => void;
// //   isLoading: boolean;
// // }

// // const HeroSection: React.FC<HeroSectionProps> = ({ onJobDescriptionSubmit, isLoading }) => {
// //   const [jobDescription, setJobDescription] = useState('');
// //   const [resumeStatus, setResumeStatus] = useState('Not Uploaded');
// //   const [resumeFile, setResumeFile] = useState<File | null>(null);

// //   // Only matchScore and suitability
// //   const [matchScore, setMatchScore] = useState<number>(0);
// //   const [suitability, setSuitability] = useState<string>('No');

// //   const getAnalysis = () => ({
// //     matchScore,
// //     suitability,
// //   });

// //   const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files.length > 0) {
// //       setResumeFile(e.target.files[0]);
// //       setResumeStatus('Uploaded');
// //     } else {
// //       setResumeFile(null);
// //       setResumeStatus('Not Uploaded');
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (jobDescription.trim() && resumeStatus === 'Uploaded') {
// //       const analysis = getAnalysis();

// //       await fetch('http://localhost:5000/api/resumes', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           jobDescription,
// //           resumeStatus,
// //           analysis,
// //         }),
// //       });

// //       setJobDescription('');
// //       setResumeStatus('Not Uploaded');
// //       setResumeFile(null);
// //       setMatchScore(0);
// //       setSuitability('No');

// //       if (onJobDescriptionSubmit) {
// //         onJobDescriptionSubmit(jobDescription);
// //       }
// //     } else {
// //       alert('Please enter job description, upload your resume, and fill all fields.');
// //     }
// //   };

// //   return (
// //     <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-12 animate-fade-in">
// //           <div className="flex justify-center items-center mb-4">
// //             <Sparkles className="h-12 w-12 text-blue-600 mr-3" />
// //             <h1 className="text-5xl font-bold text-gray-900">AI-Powered Resume Screening</h1>
// //           </div>
// //           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// //             Upload job descriptions and resumes to find the best candidates instantly with our advanced AI technology.
// //           </p>
// //         </div>
// //         <div className="max-w-3xl mx-auto">
// //           <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
// //             <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Job Description Input</h2>
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div>
// //                 <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
// //                   Enter Job Description:
// //                 </label>
// //                 <textarea
// //                   id="jobDescription"
// //                   value={jobDescription}
// //                   onChange={(e) => setJobDescription(e.target.value)}
// //                   rows={6}
// //                   placeholder="Paste the job description here..."
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
// //                   Upload Resume:
// //                 </label>
// //                 <input
// //                   id="resume"
// //                   type="file"
// //                   accept=".pdf,.doc,.docx"
// //                   onChange={handleResumeUpload}
// //                   className="w-full"
// //                   required
// //                 />
// //                 <span className="text-sm text-gray-500">{resumeStatus}</span>
// //               </div>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label htmlFor="matchScore" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Match Score:
// //                   </label>
// //                   <input
// //                     id="matchScore"
// //                     type="number"
// //                     min={0}
// //                     max={100}
// //                     value={matchScore}
// //                     onChange={(e) => setMatchScore(Number(e.target.value))}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="suitability" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Suitability:
// //                   </label>
// //                   <select
// //                     id="suitability"
// //                     value={suitability}
// //                     onChange={(e) => setSuitability(e.target.value)}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
// //                     required
// //                   >
// //                     <option value="No">No</option>
// //                     <option value="Yes">Yes</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="text-center">
// //                 <button
// //                   type="submit"
// //                   disabled={isLoading}
// //                   className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   {isLoading ? (
// //                     <div className="flex items-center">
// //                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
// //                       Processing...
// //                     </div>
// //                   ) : (
// //                     <>
// //                       <Upload className="h-5 w-5 inline mr-2" />
// //                       Submit Job Description
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default HeroSection;
// import React, { useState } from 'react';
// import { Upload, Sparkles } from 'lucide-react';

// interface HeroSectionProps {
//   onJobDescriptionSubmit?: (jobDescription: string) => void;
//   isLoading: boolean;
// }

// const HeroSection: React.FC<HeroSectionProps> = ({ onJobDescriptionSubmit, isLoading }) => {
//   const [jobDescription, setJobDescription] = useState('');
//   const [resumeStatus, setResumeStatus] = useState('Not Uploaded');
//   const [resumeFile, setResumeFile] = useState<File | null>(null);

//   const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setResumeFile(e.target.files[0]);
//       setResumeStatus('Uploaded');
//     } else {
//       setResumeFile(null);
//       setResumeStatus('Not Uploaded');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (jobDescription.trim() && resumeStatus === 'Uploaded') {
//       await fetch('http://localhost:5000/api/resumes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           jobDescription,
//           resumeStatus,
          

//         }),
//       });

//       setJobDescription('');
//       setResumeStatus('Not Uploaded');
//       setResumeFile(null);

//       if (onJobDescriptionSubmit) {
//         onJobDescriptionSubmit(jobDescription);
//       }
//     } else {
//       alert('Please enter job description and upload your resume.');
//     }
//   };

//   return (
//     <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12 animate-fade-in">
//           <div className="flex justify-center items-center mb-4">
//             <Sparkles className="h-12 w-12 text-blue-600 mr-3" />
//             <h1 className="text-5xl font-bold text-gray-900">AI-Powered Resume Screening</h1>
//           </div>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Upload job descriptions and resumes to find the best candidates instantly with our advanced AI technology.
//           </p>
//         </div>
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
//             <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Job Description Input</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
//                   Enter Job Description:
//                 </label>
//                 <textarea
//                   id="jobDescription"
//                   value={jobDescription}
//                   onChange={(e) => setJobDescription(e.target.value)}
//                   rows={6}
//                   placeholder="Paste the job description here..."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
//                   Upload Resume:
//                 </label>
//                 <input
//                   id="resume"
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleResumeUpload}
//                   className="w-full"
//                   required
//                 />
//                 <span className="text-sm text-gray-500">{resumeStatus}</span>
//               </div>
//               <div className="text-center">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Processing...
//                     </div>
//                   ) : (
//                     <>
//                       <Upload className="h-5 w-5 inline mr-2" />
//                       Submit Job Description
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
import React, { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onJobDescriptionSubmit?: (jobDescription: string) => void;
  isLoading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onJobDescriptionSubmit, isLoading }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeStatus, setResumeStatus] = useState('Not Uploaded');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
      setResumeStatus('Uploaded');
    } else {
      setResumeFile(null);
      setResumeStatus('Not Uploaded');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim() && resumeStatus === 'Uploaded') {
      await fetch('http://localhost:5000/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          resumeStatus,
        }),
      });

      setJobDescription('');
      setResumeStatus('Not Uploaded');
      setResumeFile(null);

      if (onJobDescriptionSubmit) {
        onJobDescriptionSubmit(jobDescription);
      }
    } else {
      alert('Please enter job description and upload your resume.');
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center items-center mb-4">
            <Sparkles className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-5xl font-bold text-gray-900">AI-Powered Resume Screening</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload job descriptions and resumes to find the best candidates instantly with our advanced AI technology.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Job Description Input</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Job Description:
                </label>
                <textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                  placeholder="Paste the job description here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume:
                </label>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="w-full"
                  required
                />
                <span className="text-sm text-gray-500">{resumeStatus}</span>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 inline mr-2" />
                      Submit Job Description
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;