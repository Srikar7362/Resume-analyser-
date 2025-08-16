// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // Connect to MongoDB
// // mongoose.connect('mongodb://localhost:27017/bolt', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // // Define a schema and model for resumes (without name)
// // const ResumeSchema = new mongoose.Schema({
// //   jobDescription: { type: String, required: true },
// //   resumeStatus: { type: String, required: true },
// //   analysis: { type: mongoose.Schema.Types.Mixed }, // Store analysis as an object
// //   createdAt: { type: Date, default: Date.now },
// // });

// // const Resume = mongoose.model('Resume', ResumeSchema);

// // // Endpoint to store resume data
// // app.post('/api/resumes', async (req, res) => {
// //   try {
// //     const { jobDescription, resumeStatus, analysis } = req.body;
// //     const resume = new Resume({ jobDescription, resumeStatus, analysis });
// //     await resume.save();
// //     res.status(201).json(resume);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // // Endpoint to get all resumes
// // app.get('/api/resumes', async (req, res) => {
// //   try {
// //     const resumes = await Resume.find().sort({ createdAt: -1 });
// //     res.json(resumes);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB with error handling
// mongoose.connect('mongodb://localhost:27017/bolt', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Define a schema and model for resumes
// const ResumeSchema = new mongoose.Schema({
//   jobDescription: { type: String, required: true },
//   resumeStatus: { type: String, required: true },
//   analysis: { type: mongoose.Schema.Types.Mixed }, // Store analysis as an object
//   createdAt: { type: Date, default: Date.now },
// });

// const Resume = mongoose.model('Resume', ResumeSchema);

// // Endpoint to store resume data
// app.post('/api/resumes', async (req, res) => {
//   console.log('Received POST /api/resumes:', req.body); // Debug log
//   try {
//     const { jobDescription, resumeStatus, analysis } = req.body;
//     if (!jobDescription || !resumeStatus) {
//       return res.status(400).json({ error: 'jobDescription and resumeStatus are required.' });
//     }
//     const resume = new Resume({ jobDescription, resumeStatus, analysis });
//     await resume.save();
//     res.status(201).json(resume);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Endpoint to get all resumes
// app.get('/api/resumes', async (req, res) => {
//   try {
//     const resumes = await Resume.find().sort({ createdAt: -1 });
//     res.json(resumes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bolt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define a schema and model for resumes
const ResumeSchema = new mongoose.Schema({
  jobDescription: { type: String, required: true },
  resumeStatus: { type: String, required: true },
  analysis: {
    matchScore: Number,
    suitability: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model('Resume', ResumeSchema);

// Dummy analysis logic (replace with your own)
function analyzeResume(jobDescription) {
  // Example: matchScore is length of jobDescription % 100
  const matchScore = Math.min(100, jobDescription.length % 100);
  const suitability = matchScore > 50 ? 'Yes' : 'No';
  return { matchScore, suitability };
}

// Endpoint to store resume data
app.post('/api/resumes', async (req, res) => {
  try {
    const { jobDescription, resumeStatus } = req.body;
    if (!jobDescription || !resumeStatus) {
      return res.status(400).json({ error: 'jobDescription and resumeStatus are required.' });
    }
    const analysis = analyzeResume(jobDescription);
    const resume = new Resume({ jobDescription, resumeStatus, analysis });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get all resumes
app.get('/api/resumes', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});