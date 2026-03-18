require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const app = express();
const API_KEY = process.env.API_KEY;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


async function makeApiRequest(url) {
    try {
        const response = await axios.get(url);
        return {
            status: 200,
            success: true,
            message: "Successfully fetched the data",
            data: response.data,
        };
    } catch (error) {
        console.error("API request error:", error.response ? error.response.data : error);
        return {
            status: 500,
            success: false,
            message: "Failed to fetch data from the API",
            error: error.response ? error.response.data : error.message,
        };
    }
}
// this alone used for getting all news from the newsapi innwhich number of pages and page size is given by the user
app.get("/all-news", async (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let q = req.query.q || 'world';

    let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
    const result = await makeApiRequest(url);
    res.status(result.status).json(result);
});

app.get("/top-headlines", async (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "general";

    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
    const result = await makeApiRequest(url);
    res.status(result.status).json(result);
});

app.get("/country/:iso", async (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    const country = req.params.iso;

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${pageSize}`;
    const result = await makeApiRequest(url);
    res.status(result.status).json(result);
});

app.post("/summarize", async (req, res) => {
    try {
        const { title, description } = req.body;
        
        if (!title && !description) {
            return res.status(400).json({ success: false, message: "Title or description are required" });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ success: false, message: "GEMINI_API_KEY is not configured in the server" });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const prompt = `You are a smart news assistant.
Analyze the following news article text and provide a clean, simple, and easy-to-understand summary.
Your output MUST follow this exact structure exactly as written, with no extra text or numbering before the labels:

Summary:
[write 2-3 lines here]

Key Points:
- [bullet point]
- [bullet point]
- [bullet point]
- [bullet point]
- [bullet point]

Why It Matters:
[write real-world impact in simple words]

Category:
[choose one: Business, Technology, Sports, Politics, Health, Entertainment, Science, General]

Sentiment:
[Positive / Negative / Neutral]

Rules:
- Use very simple English
- Avoid complex words
- Keep it short and clear
- Do not make up facts not present in the text

News Article Title: ${title || 'N/A'}
News Article Description: ${description || 'N/A'}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.json({
            status: 200,
            success: true,
            data: response.text,
        });
    } catch (error) {
        console.error("AI Summarization error:", error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to summarize using AI",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Server is running at port ${PORT}`);
});