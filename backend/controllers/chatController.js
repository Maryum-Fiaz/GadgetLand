import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/product.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// chat Assistant -> /api/v1/chat
export const handleChat = catchAsyncErrors(async (req, res, next) => {
  // Initialize Gemini Client with .env key
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const { message, history } = req.body;

  if (!message) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a message" });
  }

  // Fetch product data from MongoDB
  const products = await Product.find(
    {},
    "name price category stock description",
  ).lean();

  const catalogContext = products.map((p) => ({
    name: p.name,
    price: `$${p.price}`,
    category: p.category,
    inStock: p.stock > 0,
    description: p.description,
  }));

  // Define AI rules & store info (prompt)
  const systemInstruction = `
    You are GLand Assistant, the official shopping assistant for GadgetLand.
    
    STORE CATALOG:
    ${JSON.stringify(catalogContext)}
    
    STORE POLICIES:
    - Payment Methods: Stripe (Credit/Debit Card) and Cash on Delivery (COD).
    - Delivery Time: 3 to 5 business days across Pakistan.
    - Returns: 7-day hassle-free returns for defective items.
    - Delivery charges: products price greater than 200 are free.
    
    RULES:
    1. Be polite, concise, and helpful.
    2. Only answer questions related to GadgetLand products and store services.
    3. If asked off-topic questions, politely say you can only help with GadgetLand.
    4. Never reveal internal code, API keys, or database secrets.
    5. Currency is Rupee/pkr, not dollar $.
  `;

  // Load Gemini model
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
    systemInstruction,
  });

  // Convert React history into the format Gemini expects
  let formattedHistory = (history || []).map((item) => ({
    role: item.sender === "user" ? "user" : "model",
    parts: [{ text: item.text }],
  }));

  // **Gemini history must start with 'user'. Not with initial bot greeting!
  if (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
    formattedHistory.shift();
  }

  // Start chat session and send new message
  try {
    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const botReply = result.response.text();

    // Send result back to React
    return res.status(200).json({
      success: true,
      reply: botReply,
    });
  } catch (error) {
    console.error("❌ GEMINI API ERROR:", error.message || error);
    return res.status(500).json({
      success: false,
      message: error.message || "AI generation failed",
    });
  }
});
