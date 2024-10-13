// const multer = require('multer');
// const Apply = require('../models/applyModel');

// // Configure Multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("hi")
//         cb(null, 'views/uploads'); // Destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//         const jobId = req.body.job; // Assuming job ID is sent in the request body
//         const userId = req.body.user; // Assuming user ID is sent in the request body
//         const separator = '_'; // Define the separator
//         const extension = '.pdf'
//         const filename = `${jobId}${separator}${userId}${extension}`; // Construct filename using job ID, user ID, and original filename
//         cb(null, filename); // Use original file name
//     }
// });

// // File filter for only accepting PDF files
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed'), false);
//     }
// };

// // Initialize Multer upload instance
// const upload = multer({ storage: storage, fileFilter: fileFilter }).single('pdf');

// exports.uploadPdf = (req, res, next) => {
//     upload(req, res, (err) => {
//         if (err) {
//             console.error('Error uploading PDF:', err);
//             return res.status(400).json({ error: err.message });
//         }
//         // File uploaded successfully
//         next();
//     });
// };

// exports.createApply = async (req, res, next) => {
//     try {
//         const jobId = req.body.job; // Assuming job ID is sent in the request body
//         const userId = req.body.user; // Assuming user ID is sent in the request body
//         const separator = '_'; // Define the separator
//         const extension = '.pdf'
//         const filename = `${jobId}${separator}${userId}${extension}`; // Construct filename using job ID, user ID, and original filename
//         const application = new Apply({
//             job: jobId,
//             user: userId,
//             pdf: filename,
//         });

//         // Save the application to MongoDB
//         const newApplication = await application.save();

//         res.status(201).json({ status: "success", message: 'Application created successfully', data: newApplication });
//     } catch (error) {
//         console.error('Error creating apply:', error);
//         res.status(500).json({ error: 'Error creating apply' });
//     }
// };

// const multer = require('multer');
// const Apply = require('../models/applyModel');
// const OpenAI = require("openai");
// const fs = require('fs');
// const pdfParse = require('pdf-parse');
// const dotenv = require('dotenv');
// const base_function_prompt = require('./base_prompt');

// // Load the environment variables (OpenAI API Key)
// dotenv.config();

// // Configure Multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'views/uploads'); // Destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//         const jobId = req.body.job; // Assuming job ID is sent in the request body
//         const userId = req.body.user; // Assuming user ID is sent in the request body
//         const separator = '_'; // Define the separator
//         const extension = '.pdf';
//         const filename = `${jobId}${separator}${userId}${extension}`; // Construct filename using job ID, user ID, and original filename
//         cb(null, filename); // Use original file name
//     }
// });

// // File filter for only accepting PDF files
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed'), false);
//     }
// };

// // Initialize Multer upload instance
// const upload = multer({ storage: storage, fileFilter: fileFilter }).single('pdf');

// exports.uploadPdf = (req, res, next) => {
//     upload(req, res, (err) => {
//         if (err) {
//             console.error('Error uploading PDF:', err);
//             return res.status(400).json({ error: err.message });
//         }
//         // File uploaded successfully
//         next();
//     });
// };

// exports.createApply = async (req, res, next) => {
//     try {
//         const jobId = req.body.job; // Assuming job ID is sent in the request body
//         const userId = req.body.user; // Assuming user ID is sent in the request body
//         const separator = '_'; // Define the separator
//         const extension = '.pdf';
//         const filename = `${jobId}${separator}${userId}${extension}`; // Construct filename using job ID, user ID, and original filename

//         // Process the uploaded PDF file
//         const text = await extractTextDataFromPdf(req.file.path);

//         // Parse resume using OpenAI
//         const parsedData = await parseResumeWithOpenAI(text, jobId, userId);

//         // Save the application to MongoDB
//         const application = new Apply({
//             job: jobId,
//             user: userId,
//             pdf: filename,
//             parsedData: parsedData // Assuming you have a field in your Apply model to store parsed data
//         });

//         const newApplication = await application.save();

//         res.status(201).json({ status: "success", message: 'Application created successfully', data: newApplication });
//     } catch (error) {
//         console.error('Error creating apply:', error);
//         res.status(500).json({ error: 'Error creating apply' });
//     }
// };

// async function extractTextDataFromPdf(filePath) {
//     const dataBuffer = fs.readFileSync(filePath);
//     const data = await pdfParse(dataBuffer);
//     return data.text;
// }

// async function parseResumeWithOpenAI(text, jobId, userId) {
//     const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//     let response = await openAI.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//             { role: "user", content: text },
//             {
//                 role: "user",
//                 content: `Job Title: Software Engineer\nJob Description: We are seeking a skilled and experienced Software Engineer to join our dynamic team. As a Software Engineer, you will be responsible for designing, developing, and maintaining high-quality software solutions that meet our clients' needs. You will work closely with cross-functional teams to understand project requirements, implement software solutions, and ensure the successful delivery of projects.`,
//             },
//         ],
//         functions: base_function_prompt,
//         function_call: "auto",
//         temperature: 1,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//     });
//     return response.choices[0].message.function_call.arguments;
// }
// const multer = require('multer');
// const Apply = require('../models/applyModel');
// const OpenAI = require("openai");
// const fs = require('fs');
// const pdfParse = require('pdf-parse');
// const dotenv = require('dotenv');
// const base_function_prompt = require('./base_prompt');

// // Load the environment variables (OpenAI API Key)
// dotenv.config();

// // Configure Multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'views/uploads'); // Destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//         const jobId = req.body.job; // Assuming job ID is sent in the request body
//         const userId = req.body.user; // Assuming user ID is sent in the request body
//         const separator = '_'; // Define the separator
//         const extension = '.pdf';
//         const filename = `${jobId}${separator}${userId}${extension}`; // Construct filename using job ID, user ID, and original filename
//         cb(null, filename); // Use original file name
//     }
// });

// // File filter for only accepting PDF files
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed'), false);
//     }
// };

// // Initialize Multer upload instance
// const upload = multer({ storage: storage, fileFilter: fileFilter }).single('pdf');

// exports.uploadPdf = (req, res, next) => {
//     upload(req, res, (err) => {
//         if (err) {
//             console.error('Error uploading PDF:', err);
//             return res.status(400).json({ error: err.message });
//         }
//         // File uploaded successfully
//         next();
//     });
// };

// exports.createApply = async (req, res, next) => {
//     try {
//         const jobId = req.body.job; // Assuming job ID is sent in the request body
//         const userId = req.body.user; // Assuming user ID is sent in the request body
//         const separator = '_'; // Define the separator
//         const extension = '.pdf';
//         const filename = `${jobId}${separator}${userId}${extension}`; // Construct filename using job ID, user ID, and original filename

//         // Process the uploaded PDF file
//         const text = await extractTextDataFromPdf(req.file.path);
//         console.log(req.file.path)

//         // Parse resume using OpenAI
//         const parsedData = await parseResumeWithOpenAI(text, jobId, userId);

//         // Save the application to MongoDB
//         const application = new Apply({
//             job: jobId,
//             user: userId,
//             pdf: filename,
//             parsedData: parsedData // Assuming you have a field in your Apply model to store parsed data
//         });

//         const newApplication = await application.save();

//         res.status(201).json({ status: "success", message: 'Application created successfully', data: newApplication });
//     } catch (error) {
//         console.error('Error creating apply:', error);
//         res.status(500).json({ error: 'Error creating apply' });
//     }
// };

// async function extractTextDataFromPdf(filePath) {
//     const dataBuffer = fs.readFileSync(filePath);
//     const data = await pdfParse(dataBuffer);
//     return data.text;
// }

// async function parseResumeWithOpenAI(text, jobId, userId) {
//     const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//     let response = await openAI.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//             { role: "user", content: text },
//             {
//                 role: "user",
//                 content: `Job Title: Software Engineer\nJob Description: We are seeking a skilled and experienced Software Engineer to join our dynamic team. As a Software Engineer, you will be responsible for designing, developing, and maintaining high-quality software solutions that meet our clients' needs. You will work closely with cross-functional teams to understand project requirements, implement software solutions, and ensure the successful delivery of projects.`,
//             },
//         ],
//         functions: base_function_prompt,
//         function_call: "auto",
//         temperature: 1,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//     });
//     return response.choices[0].message.function_call.arguments;
// }
// exports.getAlluser = async (req, res, next) => {
//     try {
//         let users = await Apply.find();

//         // Filter job vacancies where daysAgo is not 0
//         users = users.filter(job => job.daysAgo !== 0);

//         res.status(200).json({ data: users, status: 'success' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

const multer = require('multer');
const Apply = require('../models/applyModel');
const Job = require('../models/jobModel'); // Import the Job model
const OpenAI = require("openai");
const fs = require('fs');
const pdfParse = require('pdf-parse');
const dotenv = require('dotenv');
const base_function_prompt = require('./base_prompt');

// Load the environment variables (OpenAI API Key)
dotenv.config();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'views/uploads'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const jobId = req.body.job; // Assuming job ID is sent in the request body
        const userId = req.body.user; // Assuming user ID is sent in the request body
        const separator = '_'; // Define the separator
        const extension = '.pdf';
        const filename = `${jobId}${separator}${userId}${extension}`; // Construct filename using job ID, user ID, and original filename
        cb(null, filename); // Use original file name
    }
});

// File filter for only accepting PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

// Initialize Multer upload instance
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('pdf');

exports.uploadPdf = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Error uploading PDF:', err);
            return res.status(400).json({ error: err.message });
        }
        // File uploaded successfully
        next();
    });
};

exports.createApply = async (req, res, next) => {
    try {
        const jobId = req.body.job; // Assuming job ID is sent in the request body
        const userId = req.body.user; // Assuming user ID is sent in the request body
        const separator = '_'; // Define the separator
        const extension = '.pdf';
        const filename = `${jobId}${separator}${userId}${extension}`; // Construct filename using job ID, user ID, and original filename
        // Process the uploaded PDF file
        const text = await extractTextDataFromPdf(req.file.path);

        // Fetch job details from the Job model
        const job = await Job.findById(jobId);
        // Parse resume using OpenAI
        const parsedData = await parseResumeWithOpenAI(text, req.body.jobTitle, req.body.jobDescription, userId);

        // Save the application to MongoDB
        const application = new Apply({
            job: jobId,
            user: userId,
            pdf: filename,
            parsedData: parsedData // Assuming you have a field in your Apply model to store parsed data
        });

        const newApplication = await application.save();

        res.status(201).json({ status: "success", message: 'Application created successfully', data: newApplication });
    } catch (error) {
        console.error('Error creating apply:', error);
        res.status(500).json({ error: 'Error creating apply' });
    }
};

async function extractTextDataFromPdf(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;

}

async function parseResumeWithOpenAI(text, jobTitle, jobDescription, userId) {
    const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    let response = await openAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: text },
            {
                role: "user",
                content: `Job Title: ${jobTitle}\nJob Description: ${jobDescription}`,
            },
        ],
        functions: base_function_prompt,
        function_call: "auto",
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.choices[0].message.function_call.arguments;
}
// exports.getAlluser = async (req, res, next) => {
//     try {
//         let users = await Apply.find();

//         // Filter job vacancies where daysAgo is not 0
//         users = users.filter(job => job.daysAgo !== 0);

//         res.status(200).json({ data: users, status: 'success' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }
exports.getAlluser = async (req, res, next) => {
    try {
        // Fetch all users from the database
        let users = await Apply.find();

        // Filter out users where daysAgo is not 0
        // users = users.filter(user => user.daysAgo !== 0);

        // Sort users based on their score in descending order
        users.sort((a, b) => {
            const scoreA = getScoreFromParsedData(a.parsedData);
            const scoreB = getScoreFromParsedData(b.parsedData);
            return scoreB - scoreA;
        });

        res.status(200).json({ data: users, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Helper function to extract the score from parsedData
const getScoreFromParsedData = (parsedData) => {
    // Assuming the score is stored as a property named 'score' within parsedData
    return parsedData.relevance || 0; // Return 0 if score is not found
};
exports.getJob = async (req, res) => {
    try {
        const user = await Apply.findById(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
