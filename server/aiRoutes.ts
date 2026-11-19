import type { Express, Request, Response } from "express";
import {
  GoogleGenAI,
  ThinkingLevel,
  Type,
  type GenerateContentResponse,
} from "@google/genai";

const TEXT_MODEL = "gemini-4-hydrogen";
const TTS_MODEL = "gemini-3.8-flash-lite-tts";

const STUDIO_KNOWLEDGE = `
You are the official AI Studio Consultant for fabu001, a software engineering studio, tech training academy, and IT infrastructure consultancy founded by Remy Nsanzimana in Nyange, Rwanda.

VERIFIED STUDIO DETAILS:
- Founder & Lead Engineer: Remy Nsanzimana
- Location: Nyange, Rwanda
- Direct Phone / WhatsApp (Studio & Payments): +250 792 752 832 (local: 0792752832)
- Email: hello@fabu001.dev
- Availability: Open for Q4 / Q1 engagements; 5-minute response during business hours.

SERVICES & CATEGORIES:
1. Custom Web Applications (Development): React, TypeScript, Next.js, Tailwind CSS, dashboards, customer portals, and e-commerce platforms.
2. Backend Systems & Custom APIs (Development): PHP, Laravel, Node.js, RESTful APIs, RBAC authentication, and mobile money / payment integrations.
3. IT Infrastructure & Support (Infrastructure): Hardware diagnostics, workstation setup, network hardening, and preventive maintenance.
4. Tech Training & Bootcamps (Consulting): Intensive hands-on cohorts in Web Development, Backend & APIs, IT Support, and AI Productivity.
5. UI/UX & System Architecture (Consulting): Wireframing, design systems, database schemas, and scalable product roadmaps.
6. Digital Products & Templates (Development): Production starter kits, Laravel/React boilerplates, and commercial software modules.

PRICING TIERS:
- Starter ($350+ / ~1-2 weeks): Landing page or MVP website, responsive UI, contact/WhatsApp routing, basic SEO.
- Growth ($950+ / ~3-6 weeks): Full-stack web app, custom API + database, admin dashboard, authentication, and payment integration.
- Enterprise (Custom / 6+ weeks): Dedicated architecture, multi-tenant platforms, cloud deployment, staff training, and ongoing SLA support.

TRAINING COHORTS (4-12 weeks, Nyange & Hybrid):
1. Modern Frontend Web Engineering (React, TypeScript, Tailwind CSS)
2. Backend Engineering & REST APIs (PHP, Laravel, MySQL, Auth & Security)
3. Practical IT Support & Network Operations (Hardware, OS, Troubleshooting, Security)
4. AI-Assisted Software Productivity (Prompt Engineering, AI Workflows, Rapid Prototyping)

NOTABLE PROJECTS:
- KigaliPay Merchant Portal (Fintech)
- Nyange Clinic Patient & Lab System (System)
- EAV Kivumu Student LMS & Grading Portal (Web App)
- SupportPulse AI Ticket & Sentiment Analyzer (AI)
- FleetTrack Rwanda Dispatch Console (IT Tool)
`.trim();

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please add your Gemini API key in Settings > Secrets."
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function getLanguageInstruction(lang: unknown): string {
  return lang === "rw"
    ? "Respond strictly in natural, clear, professional Kinyarwanda (you may keep established technical terms like React, API, TypeScript, Laravel, or Cloud when appropriate)."
    : "Respond in clear, concise, professional English.";
}

function extractErrorInfo(err: unknown): { status: number; message: string } {
  const raw = err instanceof Error ? err.message : String(err);
  if (raw.includes("GEMINI_API_KEY is not configured")) {
    return { status: 500, message: raw };
  }
  if (
    raw.includes("API_KEY_INVALID") ||
    raw.includes("PERMISSION_DENIED") ||
    raw.includes("403") ||
    raw.includes("401")
  ) {
    return {
      status: 403,
      message:
        "Gemini API key is invalid or lacks permission. Please verify your key in Settings > Secrets.",
    };
  }
  if (raw.includes("RESOURCE_EXHAUSTED") || raw.includes("429")) {
    return {
      status: 429,
      message:
        "AI rate limit reached right now. Please wait a moment and try again.",
    };
  }
  return {
    status: 500,
    message: raw || "Unexpected error communicating with Gemini AI.",
  };
}

interface ChatHistoryItem {
  role: "user" | "model";
  text: string;
}

export function registerAiRoutes(app: Express): void {
  // 1. Streaming Bilingual Studio Assistant Chat (SSE)
  app.post("/api/ai/chat", async (req: Request, res: Response) => {
    try {
      const { message, history = [], lang = "en" } = req.body as {
        message?: string;
        history?: ChatHistoryItem[];
        lang?: "en" | "rw";
      };

      const trimmed = message?.trim();
      if (!trimmed) {
        res.status(400).json({ error: "Please enter a message." });
        return;
      }

      const ai = getGeminiClient();

      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders?.();

      const formattedHistory = Array.isArray(history)
        ? history
            .filter(
              (item) =>
                item &&
                (item.role === "user" || item.role === "model") &&
                typeof item.text === "string" &&
                item.text.trim().length > 0
            )
            .slice(-12)
            .map((item) => ({
              role: item.role,
              parts: [{ text: item.text.trim() }],
            }))
        : [];

      const chat = ai.chats.create({
        model: TEXT_MODEL,
        history: formattedHistory,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction: `${STUDIO_KNOWLEDGE}

CONVERSATION GUIDELINES:
- Keep answers concise, practical, and structured with short paragraphs or bullet points (under ~160 words unless asked for deeper detail).
- Only cite fabu001 services, prices, cohorts, and contact details listed above (+250 792 752 832 / 0792752832, hello@fabu001.dev). Never invent fake metrics or external URLs.
- When helpful, suggest concrete next steps such as contacting Remy via WhatsApp on 0792752832 or filling out the project inquiry form.
- ${getLanguageInstruction(lang)}`,
        },
      });

      const stream = await chat.sendMessageStream({ message: trimmed });
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          res.write(`data: ${JSON.stringify({ text: c.text })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (err) {
      const { status, message } = extractErrorInfo(err);
      if (!res.headersSent) {
        res.status(status).json({ error: message });
      } else {
        res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
        res.end();
      }
    }
  });

  // 2. AI Project Scope & Architecture Estimator (Structured JSON)
  app.post("/api/ai/scope", async (req: Request, res: Response) => {
    try {
      const {
        idea,
        category = "Web App",
        budgetTier = "Growth",
        lang = "en",
      } = req.body as {
        idea?: string;
        category?: string;
        budgetTier?: string;
        lang?: "en" | "rw";
      };

      if (!idea?.trim()) {
        res
          .status(400)
          .json({ error: "Please describe your project idea first." });
        return;
      }

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: `Create a realistic fabu001 project scope estimate for:
Project Idea: ${idea.trim()}
Category: ${category}
Target Budget Tier: ${budgetTier}`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction: `${STUDIO_KNOWLEDGE}
Generate a structured, realistic engineering scope grounded in fabu001's actual pricing tiers and tech stack.
${getLanguageInstruction(lang)}`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedService: {
                type: Type.STRING,
                description: "Closest matching fabu001 service title.",
              },
              recommendedTier: {
                type: Type.STRING,
                description: "Recommended pricing tier (Starter, Growth, or Enterprise) and indicative range.",
              },
              estimatedWeeks: {
                type: Type.STRING,
                description: "Realistic delivery duration, e.g. '4-6 weeks'.",
              },
              architectureSummary: {
                type: Type.STRING,
                description: "2-sentence overview of the recommended system architecture.",
              },
              techStack: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "4 to 6 concrete technologies from fabu001's stack.",
              },
              milestones: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "4 sequential delivery milestones.",
              },
              keyRisks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "2 to 3 technical or integration prerequisites to confirm early.",
              },
            },
            required: [
              "recommendedService",
              "recommendedTier",
              "estimatedWeeks",
              "architectureSummary",
              "techStack",
              "milestones",
              "keyRisks",
            ],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      res.json(parsed);
    } catch (err) {
      const { status, message } = extractErrorInfo(err);
      res.status(status).json({ error: message });
    }
  });

  // 3. AI Training & Career Path Advisor (Structured JSON)
  app.post("/api/ai/career-advisor", async (req: Request, res: Response) => {
    try {
      const {
        goal,
        experienceLevel = "Beginner",
        hoursPerWeek = "10",
        lang = "en",
      } = req.body as {
        goal?: string;
        experienceLevel?: string;
        hoursPerWeek?: string;
        lang?: "en" | "rw";
      };

      if (!goal?.trim()) {
        res
          .status(400)
          .json({ error: "Please enter your learning or career goal." });
        return;
      }

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: `Recommend the best fabu001 training cohort and 4-week study plan for:
Learner Goal: ${goal.trim()}
Current Level: ${experienceLevel}
Weekly Study Time: ${hoursPerWeek} hours/week`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction: `${STUDIO_KNOWLEDGE}
Match the learner to one of fabu001's real training cohorts and build an encouraging, practical 4-week learning roadmap.
${getLanguageInstruction(lang)}`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedCohort: {
                type: Type.STRING,
                description: "Best-fit fabu001 training cohort name.",
              },
              readinessScore: {
                type: Type.INTEGER,
                description: "Readiness score from 50 to 98 based on current level and weekly hours.",
              },
              rationale: {
                type: Type.STRING,
                description: "2-sentence explanation of why this track fits their goal.",
              },
              weeklyPlan: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "4 concise week-by-week milestones (Week 1 through Week 4).",
              },
              capstoneProject: {
                type: Type.STRING,
                description: "A practical Rwandan or real-world capstone project to build.",
              },
            },
            required: [
              "recommendedCohort",
              "readinessScore",
              "rationale",
              "weeklyPlan",
              "capstoneProject",
            ],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      res.json(parsed);
    } catch (err) {
      const { status, message } = extractErrorInfo(err);
      res.status(status).json({ error: message });
    }
  });

  // 4. AI Contact Brief Refiner (Structured JSON)
  app.post("/api/ai/draft-brief", async (req: Request, res: Response) => {
    try {
      const { roughIdea, lang = "en" } = req.body as {
        roughIdea?: string;
        lang?: "en" | "rw";
      };

      if (!roughIdea?.trim()) {
        res.status(400).json({
          error: "Type a short note or idea in the brief box first so AI can expand it.",
        });
        return;
      }

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: `Rewrite and expand this short client inquiry into a clear, concise, actionable software or training project brief for fabu001:
"${roughIdea.trim()}"`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction: `${STUDIO_KNOWLEDGE}
Write in first-person client voice ("I am looking to build..." / "Nifuza ko mwamfasha..."). Keep it concise (70-110 words) with Scope, Key Features, and Target Timeline. Do not invent fake company names.
${getLanguageInstruction(lang)}`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              refinedBrief: {
                type: Type.STRING,
                description: "Polished multi-line inquiry text ready to send in the contact form.",
              },
            },
            required: ["refinedBrief"],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      res.json(parsed);
    } catch (err) {
      const { status, message } = extractErrorInfo(err);
      res.status(status).json({ error: message });
    }
  });

  // 5. AI Blog Article Summarizer & Action Plan (Structured JSON)
  app.post("/api/ai/summarize", async (req: Request, res: Response) => {
    try {
      const { title, body, lang = "en" } = req.body as {
        title?: string;
        body?: string[];
        lang?: "en" | "rw";
      };

      if (!title?.trim() || !Array.isArray(body) || body.length === 0) {
        res.status(400).json({ error: "Article content is required." });
        return;
      }

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: `Summarize this engineering article for busy founders and developers:
Title: ${title}
Article:
${body.join("\n\n")}`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction: `You are an engineering editor at fabu001. Produce a crisp executive TL;DR and 3 practical takeaways.
${getLanguageInstruction(lang)}`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tldr: {
                type: Type.STRING,
                description: "2-sentence executive summary.",
              },
              takeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 concise actionable takeaways.",
              },
            },
            required: ["tldr", "takeaways"],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      res.json(parsed);
    } catch (err) {
      const { status, message } = extractErrorInfo(err);
      res.status(status).json({ error: message });
    }
  });

  // 6. AI Voice Reader / Text-to-Speech (WAV via gemini-3.8-flash-lite-tts)
  app.post("/api/ai/tts", async (req: Request, res: Response) => {
    try {
      const { text } = req.body as { text?: string };
      const cleaned = text?.trim().slice(0, 1200);
      if (!cleaned) {
        res.status(400).json({ error: "Text is required for audio playback." });
        return;
      }

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: TTS_MODEL,
        contents: [
          {
            role: "user",
            parts: [
              {
                text: cleaned,
                speechMetadata: {
                  style: "Clear, warm, articulate engineering studio advisor",
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" },
            },
          },
        },
      });

      const base64Audio =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!base64Audio) {
        res.status(502).json({
          error: "Audio synthesis did not return any audio data.",
        });
        return;
      }

      res.json({
        audioBase64: base64Audio,
        mimeType: "audio/wav",
      });
    } catch (err) {
      const { status, message } = extractErrorInfo(err);
      res.status(status).json({ error: message });
    }
  });
}
