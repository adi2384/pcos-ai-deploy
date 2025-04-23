import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = express.Router();

// 🔹 Summarize from URL
router.post("/summarize", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const paragraphs = $("p").map((_, p) => $(p).text()).get().join(" ");

    if (!paragraphs || paragraphs.length < 100) {
      return res.status(400).json({ message: "Could not extract content from the article." });
    }

    const summaryResponse = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: paragraphs },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = summaryResponse.data[0]?.summary_text;
    if (!summary) throw new Error("No summary returned");

    res.json({ summary });
  } catch (error) {
    console.error("❌ Error summarizing article:", error.message);
    res.status(500).json({ message: "Failed to summarize article" });
  }
});


// 🔸 GET /news/symptoms — Serve pre-saved PCOS symptom articles
router.get("/symptoms", (req, res) => {
  const savedArticles = [
    {
      title: "Understanding PCOS Symptoms",
      description: "Explore the common symptoms of PCOS such as irregular periods, acne, and hair growth.",
      url: "https://www.healthline.com/health/polycystic-ovary-disease",
      image: "https://post.healthline.com/wp-content/uploads/2020/08/Polycystic-Ovary-Syndrome-PCOS-1296x728-header.jpg",
      source: "Healthline",
      pubDate: "2024-10-10",
    },
    {
      title: "Signs You Might Have PCOS",
      description: "Know the warning signs of PCOS and when you should talk to your doctor.",
      url: "https://www.mayoclinic.org/diseases-conditions/pcos/symptoms-causes/syc-20353439",
      image: "https://cdn-prod.medicalnewstoday.com/content/images/articles/324/324119/a-doctor-speaking-to-a-woman.jpg",
      source: "Medical News Today",
      pubDate: "2024-09-21",
    },
    {
      title: "PCOS Symptoms and Diagnosis",
      description: "Learn about the diagnostic criteria and symptoms involved with PCOS.",
      url: "https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/diagnosis/",
      image: "https://www.cdc.gov/diabetes/images/library/features/pcos-article.jpg",
      source: "CDC",
      pubDate: "2024-08-30",
    },
  ];

  res.json({ articles: savedArticles });
});


// 🔸 GET /news/trending — Fetch live trending PCOS news from Currents API
router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get("https://api.currentsapi.services/v1/search", {
      params: {
        keywords: "PCOS",
        language: "en",
        apiKey: process.env.CURRENTS_API_KEY,
      },
    });

    const articles = response.data.news.map((item) => ({
      title: item.title,
      description: item.description,
      url: item.url,
      image: item.image,
      source: item.author,
      pubDate: item.published,
    }));

    res.json({ articles });
  } catch (error) {
    console.error("Currents API error:", error.message);
    res.status(500).json({ message: "Failed to fetch trending news" });
  }
});

export default router;
