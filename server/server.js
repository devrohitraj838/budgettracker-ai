require("dotenv").config();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Expense = require("./models/Expense");
const Budget = require("./models/Budget");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// GET ALL EXPENSES
app.post(
  "/scan-receipt",
  upload.single("receipt"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No receipt uploaded",
        });
      }

      const imageBase64 =
        req.file.buffer.toString("base64");

      const model =
        genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
        });

      const result =
        await model.generateContent([
          {
            inlineData: {
              data: imageBase64,
              mimeType:
                req.file.mimetype,
            },
          },

          `Extract expense details from this receipt.

Return ONLY valid JSON.

{
  "title": "",
  "amount": 0,
  "category": ""
}

Rules:
- title = store or merchant name
- amount = final total amount paid
- category must be exactly one of:
  Food
  Shopping
  Travel
  Bills

Do not include explanations.
Do not include markdown.
Do not include code fences.
Return JSON only.`,
        ]);

      const text =
        result.response.text();

      console.log(
        "RAW GEMINI RESPONSE:"
      );
      console.log(text);

      const cleanedText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let expenseData;

try {
  expenseData = JSON.parse(cleanedText);
} catch (err) {
  console.log(
    "Failed to parse Gemini response:"
  );
  console.log(cleanedText);

  return res.status(500).json({
    message:
      "Gemini did not return valid JSON",
  });
}

expenseData.title =
  expenseData.title || "Unknown Store";

expenseData.amount =
  Number(expenseData.amount) || 0;

const validCategories = [
  "Food",
  "Shopping",
  "Travel",
  "Bills",
];

if (
  !validCategories.includes(
    expenseData.category
  )
) {
  expenseData.category =
    "Shopping";
}

res.json(expenseData);
    } catch (error) {
      console.error(
        "SCAN ERROR:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  }
);
app.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET SINGLE EXPENSE
app.get("/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE EXPENSE
app.post("/expenses", async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || !amount) {
      return res.status(400).json({
        message: "Title and amount are required",
      });
    }

    const expense = await Expense.create(req.body);

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE EXPENSE
app.put("/expenses/:id", async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || !amount) {
      return res.status(400).json({
        message: "Enter all required values",
      });
    }

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE EXPENSE
app.delete("/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/budget", async (req, res) => {
  try {
    const budget = await Budget.findOne();

    res.json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.put("/budget", async (req, res) => {
  try {
    const { amount } = req.body;

    let budget = await Budget.findOne();

    if (!budget) {
      budget = await Budget.create({
        amount,
      });
    } else {
      budget.amount = amount;
      await budget.save();
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/analyze", async (req, res) => {
  try {
    const { expenses, budget } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

   const prompt = `
You are a personal finance assistant.

Budget: ₹${budget}

Expenses:
${JSON.stringify(expenses, null, 2)}

Provide insights in this format:

💰 Total Spending
...

📊 Biggest Category
...

⚠️ Budget Status
...

💡Recommendations
• Tip 1
• Tip 2
• Tip 3

Keep the response under 120 words.
Use emojis.
Be concise.
`;


    const result = await model.generateContent(
      prompt
    );

    const analysis =
      result.response.text();

    res.json({ analysis });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});