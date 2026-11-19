export interface ChatMessagePayload {
  role: "user" | "model";
  text: string;
}

export interface ProjectScopeEstimate {
  recommendedService: string;
  recommendedTier: string;
  estimatedWeeks: string;
  architectureSummary: string;
  techStack: string[];
  milestones: string[];
  keyRisks: string[];
}

export interface CareerAdvisorResult {
  recommendedCohort: string;
  readinessScore: number;
  rationale: string;
  weeklyPlan: string[];
  capstoneProject: string;
}

export interface BlogSummaryResult {
  tldr: string;
  takeaways: string[];
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
  } & T;

  if (!response.ok) {
    throw new Error(
      data.error || `Request failed with status ${response.status}`
    );
  }
  return data;
}

export async function streamAiChat(params: {
  message: string;
  history: ChatMessagePayload[];
  lang: "en" | "rw";
  onChunk: (chunkText: string) => void;
  signal?: AbortSignal;
}): Promise<void> {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: params.message,
      history: params.history,
      lang: params.lang,
    }),
    signal: params.signal,
  });

  if (!response.ok) {
    const errPayload = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(
      errPayload.error || `AI chat failed with status ${response.status}`
    );
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Streaming response is unavailable in this browser.");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const evt of events) {
      const line = evt
        .split("\n")
        .find((l) => l.startsWith("data: "));
      if (!line) continue;

      const payload = JSON.parse(line.slice(6)) as {
        text?: string;
        done?: boolean;
        error?: string;
      };

      if (payload.error) {
        throw new Error(payload.error);
      }
      if (payload.text) {
        params.onChunk(payload.text);
      }
    }
  }
}

export function requestProjectScope(params: {
  idea: string;
  category: string;
  budgetTier: string;
  lang: "en" | "rw";
}): Promise<ProjectScopeEstimate> {
  return postJson<ProjectScopeEstimate>("/api/ai/scope", params);
}

export function requestCareerAdvice(params: {
  goal: string;
  experienceLevel: string;
  hoursPerWeek: string;
  lang: "en" | "rw";
}): Promise<CareerAdvisorResult> {
  return postJson<CareerAdvisorResult>("/api/ai/career-advisor", params);
}

export function requestDraftBrief(params: {
  roughIdea: string;
  lang: "en" | "rw";
}): Promise<{ refinedBrief: string }> {
  return postJson<{ refinedBrief: string }>("/api/ai/draft-brief", params);
}

export function requestBlogSummary(params: {
  title: string;
  body: string[];
  lang: "en" | "rw";
}): Promise<BlogSummaryResult> {
  return postJson<BlogSummaryResult>("/api/ai/summarize", params);
}

export function requestTextToSpeech(text: string): Promise<{
  audioBase64: string;
  mimeType: string;
}> {
  return postJson<{ audioBase64: string; mimeType: string }>("/api/ai/tts", {
    text,
  });
}
