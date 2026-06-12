import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { topicSummaries, numQuestions, difficulty } = await req.json();

    if (!topicSummaries || !numQuestions) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const difficultyNote =
      difficulty === "easy"
        ? "Focus on straightforward recall questions — definitions, key terms, and basic facts."
        : difficulty === "hard"
        ? "Focus on analysis, application, and comparison questions that require deeper understanding."
        : "Mix easy recall, medium comprehension, and a few harder analysis/application questions.";

    const prompt = `You are a professor creating a quiz for an e-commerce course (E-Commerce 2023: Business. Technology. Society., 17th Edition by Laudon & Traver).

Based ONLY on the following course summaries, generate exactly ${numQuestions} multiple-choice quiz questions.

${difficultyNote}

Rules:
- Each question must have exactly 4 answer options (A, B, C, D)
- Only ONE correct answer per question
- Incorrect options must be plausible but clearly wrong to someone who studied
- Include a brief explanation (1-2 sentences) for why the correct answer is right
- Vary question types: some recall, some application, some "which of the following"
- Do NOT repeat topics — spread questions across the summaries provided
- Return ONLY valid JSON, no markdown, no extra text

Required JSON format:
[
  {
    "topic": "Chapter name here",
    "q": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Brief explanation of why this is correct."
  }
]

The "correct" field is the 0-based index of the correct option in the options array.

Course summaries:
${topicSummaries}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();

    const clean = raw.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(clean);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("No questions returned");
    }

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: "Failed to generate questions. Please try again." },
      { status: 500 }
    );
  }
}
