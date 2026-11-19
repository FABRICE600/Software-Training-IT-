import { useState, useEffect, useRef, type FormEvent } from "react";
import {
  Sparkles,
  X,
  Send,
  MessageSquare,
  Layers,
  GraduationCap,
  Zap,
  Volume2,
  Square,
  RotateCcw,
  ArrowRight,
  MessageCircle,
  Briefcase,
  Calendar,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { buildWhatsAppUrl } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";
import {
  streamAiChat,
  requestProjectScope,
  requestCareerAdvice,
  requestTextToSpeech,
  type ChatMessagePayload,
  type ProjectScopeEstimate,
  type CareerAdvisorResult,
} from "../services/aiClient";

export type AiStudioTab = "chat" | "scoper" | "career" | "quick";

interface AiStudioAssistantProps {
  open: boolean;
  initialTab?: AiStudioTab;
  onOpenChange: (open: boolean) => void;
  onPrefillContact: (message: string) => void;
}

interface UiChatMessage extends ChatMessagePayload {
  id: string;
}

export function AiStudioAssistant({
  open,
  initialTab = "chat",
  onOpenChange,
  onPrefillContact,
}: AiStudioAssistantProps) {
  const { lang, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<AiStudioTab>(initialTab);

  // Sync tab when triggered externally (e.g. Hero -> Scoper or Chat)
  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);

  // Escape key closes drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  /* ---------------- Tab 1: Streaming AI Chat ---------------- */
  const [messages, setMessages] = useState<UiChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatError, setChatError] = useState("");
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Audio playback state (TTS)
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingMessageId(null);
  };

  const handlePlayVoice = async (msgId: string, text: string) => {
    if (playingMessageId === msgId) {
      stopAudio();
      return;
    }

    stopAudio();
    setLoadingVoiceId(msgId);
    setChatError("");

    try {
      const { audioBase64, mimeType } = await requestTextToSpeech(text);
      const audio = new Audio(`data:${mimeType};base64,${audioBase64}`);
      audioRef.current = audio;
      setPlayingMessageId(msgId);
      audio.onended = () => {
        setPlayingMessageId(null);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setPlayingMessageId(null);
        audioRef.current = null;
      };
      await audio.play();
    } catch (err) {
      setChatError(
        err instanceof Error ? err.message : "Failed to generate speech audio."
      );
      setPlayingMessageId(null);
    } finally {
      setLoadingVoiceId(null);
    }
  };

  const sendChatMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isStreaming) return;

    stopAudio();
    setChatError("");
    setChatInput("");

    const userMsg: UiChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    const modelMsgId = `m-${Date.now()}`;
    const historySnapshot: ChatMessagePayload[] = messages.map((m) => ({
      role: m.role,
      text: m.text,
    }));

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: modelMsgId, role: "model", text: "" },
    ]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await streamAiChat({
        message: trimmed,
        history: historySnapshot,
        lang,
        signal: controller.signal,
        onChunk: (chunkText) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === modelMsgId ? { ...m, text: m.text + chunkText } : m
            )
          );
        },
      });
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setChatError(
          err instanceof Error ? err.message : "Unable to reach AI service."
        );
        setMessages((prev) =>
          prev.filter((m) => !(m.id === modelMsgId && !m.text))
        );
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  const handleChatSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendChatMessage(chatInput);
  };

  const handleResetChat = () => {
    abortRef.current?.abort();
    stopAudio();
    setMessages([]);
    setChatError("");
    setIsStreaming(false);
  };

  /* ---------------- Tab 2: AI Project Scoper ---------------- */
  const [scopeIdea, setScopeIdea] = useState("");
  const [scopeCategory, setScopeCategory] = useState("Web App");
  const [scopeTier, setScopeTier] = useState("Growth");
  const [scopeLoading, setScopeLoading] = useState(false);
  const [scopeError, setScopeError] = useState("");
  const [scopeResult, setScopeResult] = useState<ProjectScopeEstimate | null>(
    null
  );

  const handleScopeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!scopeIdea.trim() || scopeLoading) return;
    setScopeLoading(true);
    setScopeError("");
    try {
      const data = await requestProjectScope({
        idea: scopeIdea,
        category: scopeCategory,
        budgetTier: scopeTier,
        lang,
      });
      setScopeResult(data);
    } catch (err) {
      setScopeError(
        err instanceof Error ? err.message : "Could not estimate project scope."
      );
    } finally {
      setScopeLoading(false);
    }
  };

  const buildScopeSummaryText = (s: ProjectScopeEstimate) =>
    `Project Concept: ${scopeIdea.trim()}\nRecommended Service: ${s.recommendedService} (${s.recommendedTier})\nEstimated Timeline: ${s.estimatedWeeks}\nStack: ${s.techStack.join(", ")}\nMilestones:\n${s.milestones
      .map((m, idx) => `${idx + 1}. ${m}`)
      .join("\n")}`;

  /* ---------------- Tab 3: AI Training Advisor ---------------- */
  const [careerGoal, setCareerGoal] = useState("");
  const [careerLevel, setCareerLevel] = useState("Beginner");
  const [careerHours, setCareerHours] = useState("10");
  const [careerLoading, setCareerLoading] = useState(false);
  const [careerError, setCareerError] = useState("");
  const [careerResult, setCareerResult] =
    useState<CareerAdvisorResult | null>(null);

  const handleCareerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!careerGoal.trim() || careerLoading) return;
    setCareerLoading(true);
    setCareerError("");
    try {
      const data = await requestCareerAdvice({
        goal: careerGoal,
        experienceLevel: careerLevel,
        hoursPerWeek: careerHours,
        lang,
      });
      setCareerResult(data);
    } catch (err) {
      setCareerError(
        err instanceof Error ? err.message : "Could not generate study plan."
      );
    } finally {
      setCareerLoading(false);
    }
  };

  /* ---------------- Tab 4: Quick Actions ---------------- */
  const quickActions = [
    {
      label: t.support.quickChat,
      desc: t.support.quickChatDesc,
      msg:
        lang === "rw"
          ? "Muraho fabu001, nasuzumye imishinga yanyu kandi nifuza ko tuganira ku mushinga."
          : "Hi fabu001, I reviewed your portfolio and would like to discuss a project.",
      icon: MessageCircle,
    },
    {
      label: t.support.hireStudio,
      desc: t.support.hireStudioDesc,
      msg:
        lang === "rw"
          ? "Muraho fabu001, nifuza guha ikipe yanyu akazi ko kubaka software yihariye."
          : "Hi fabu001, I would like to hire your engineering team for custom software development.",
      icon: Briefcase,
    },
    {
      label: t.support.bookMeeting,
      desc: t.support.bookMeetingDesc,
      msg:
        lang === "rw"
          ? "Muraho fabu001, nifuza gufata umwanya w'inama yo gusobanura ibyo dukeneye."
          : "Hi fabu001, I would like to book a discovery call to scope our requirements.",
      icon: Calendar,
    },
  ];

  const tabs: { id: AiStudioTab; label: string; icon: typeof MessageSquare }[] = [
    { id: "chat", label: t.ai.tabChat, icon: MessageSquare },
    { id: "scoper", label: t.ai.tabScoper, icon: Layers },
    { id: "career", label: t.ai.tabCareer, icon: GraduationCap },
    { id: "quick", label: t.ai.tabQuick, icon: Zap },
  ];

  return (
    <>
      {/* Floating Bottom-Right AI Studio Trigger */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          aria-label={open ? "Close AI Studio Assistant" : t.ai.openAssistant}
          title={t.ai.openAssistant}
          onClick={() => onOpenChange(!open)}
          className="h-12 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg flex items-center gap-2 transition-transform hover:scale-[1.03] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
        >
          {open ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline font-display text-xs font-bold tracking-wide">
                AI
              </span>
            </>
          )}
        </button>
      </div>

      {/* Slide-Over AI Studio Workspace */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex justify-end"
            onClick={() => onOpenChange(false)}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label={t.ai.badge}
              initial={shouldReduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? undefined : { x: "100%" }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-950 w-full max-w-lg h-full flex flex-col border-l border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#0B1120] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-sm font-bold text-white truncate">
                      {t.ai.badge}
                    </h2>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {t.ai.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close AI Studio Assistant"
                  onClick={() => onOpenChange(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div
                role="tablist"
                aria-label="AI Studio Tools"
                className="grid grid-cols-4 border-b border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-900 shrink-0"
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-[11px] font-bold border-b-2 transition-colors cursor-pointer ${
                        active
                          ? "border-[#2563EB] text-[#2563EB] dark:text-blue-400 bg-white dark:bg-slate-950"
                          : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Body */}
              {activeTab === "chat" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div
                    ref={chatScrollRef}
                    className="flex-1 overflow-y-auto p-5 space-y-4"
                  >
                    {/* Welcome Message */}
                    <div className="bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        {t.ai.chatWelcome}
                      </p>
                      {messages.length === 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {t.ai.chatPrompts.map((prompt) => (
                            <button
                              key={prompt}
                              type="button"
                              onClick={() => void sendChatMessage(prompt)}
                              className="text-left p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 hover:border-[#2563EB] dark:hover:border-blue-500 text-[11px] font-medium text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Conversation Turns */}
                    {messages.map((msg) => {
                      const isUser = msg.role === "user";
                      const isLoadingAudio = loadingVoiceId === msg.id;
                      const isPlaying = playingMessageId === msg.id;

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            isUser ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`max-w-[88%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                              isUser
                                ? "bg-[#2563EB] text-white"
                                : "bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            {msg.text || (
                              <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-xs">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>...</span>
                              </span>
                            )}
                          </div>

                          {!isUser && msg.text && !isStreaming && (
                            <div className="flex flex-wrap items-center gap-3 mt-1.5 px-1">
                              <button
                                type="button"
                                disabled={isLoadingAudio}
                                onClick={() =>
                                  void handlePlayVoice(msg.id, msg.text)
                                }
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-blue-400 cursor-pointer disabled:opacity-50"
                              >
                                {isLoadingAudio ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : isPlaying ? (
                                  <Square className="w-3 h-3 fill-current" />
                                ) : (
                                  <Volume2 className="w-3 h-3" />
                                )}
                                <span>
                                  {isLoadingAudio
                                    ? t.ai.loadingVoice
                                    : isPlaying
                                      ? t.ai.stopVoice
                                      : t.ai.listenVoice}
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  onOpenChange(false);
                                  onPrefillContact(msg.text);
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-blue-400 cursor-pointer"
                              >
                                <ArrowRight className="w-3 h-3" />
                                <span>{t.ai.sendSummaryContact}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {chatError && (
                      <div
                        role="alert"
                        className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-start gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{chatError}</span>
                      </div>
                    )}
                  </div>

                  {/* Chat Composer */}
                  <form
                    onSubmit={handleChatSubmit}
                    className="p-4 border-t border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-900 space-y-2 shrink-0"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={t.ai.chatPlaceholder}
                        disabled={isStreaming}
                        className="flex-1 px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-[#2563EB]"
                      />
                      <button
                        type="submit"
                        disabled={isStreaming || !chatInput.trim()}
                        className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        {isStreaming ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">{t.ai.chatSend}</span>
                      </button>
                    </div>
                    {messages.length > 0 && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleResetChat}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>{t.ai.chatClear}</span>
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {activeTab === "scoper" && (
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-950 dark:text-white mb-1">
                      {t.ai.scoperTitle}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.ai.scoperDesc}
                    </p>
                  </div>

                  <form onSubmit={handleScopeSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="ai-scoper-idea"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.ai.scoperIdeaLabel}
                      </label>
                      <textarea
                        id="ai-scoper-idea"
                        rows={3}
                        required
                        value={scopeIdea}
                        onChange={(e) => setScopeIdea(e.target.value)}
                        placeholder={t.ai.scoperIdeaPlaceholder}
                        className="w-full p-3 rounded-lg bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-[#2563EB] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="ai-scoper-cat"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          {t.ai.scoperCategoryLabel}
                        </label>
                        <select
                          id="ai-scoper-cat"
                          value={scopeCategory}
                          onChange={(e) => setScopeCategory(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-[#2563EB]"
                        >
                          <option value="Web App">Web App</option>
                          <option value="Fintech / MoMo">Fintech / MoMo</option>
                          <option value="Backend API">Backend API</option>
                          <option value="AI Integration">AI Integration</option>
                          <option value="IT Infrastructure">
                            IT Infrastructure
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="ai-scoper-tier"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          {t.ai.scoperTierLabel}
                        </label>
                        <select
                          id="ai-scoper-tier"
                          value={scopeTier}
                          onChange={(e) => setScopeTier(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-[#2563EB]"
                        >
                          <option value="Starter ($350+)">Starter ($350+)</option>
                          <option value="Growth ($950+)">Growth ($950+)</option>
                          <option value="Enterprise (Custom)">
                            Enterprise (Custom)
                          </option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={scopeLoading || !scopeIdea.trim()}
                      className="w-full py-3 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      {scopeLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      <span>
                        {scopeLoading ? t.ai.scoperGenerating : t.ai.scoperSubmit}
                      </span>
                    </button>
                  </form>

                  {scopeError && (
                    <div
                      role="alert"
                      className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{scopeError}</span>
                    </div>
                  )}

                  {scopeResult && (
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-[#F4F6F9] dark:bg-slate-900 p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Service &amp; Tier
                          </span>
                          <p className="font-display text-sm font-bold text-slate-950 dark:text-white mt-0.5">
                            {scopeResult.recommendedService}
                          </p>
                          <p className="text-xs font-semibold text-[#2563EB] dark:text-blue-400">
                            {scopeResult.recommendedTier}
                          </p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Timeline
                          </span>
                          <p className="font-display text-sm font-bold text-slate-950 dark:text-white mt-0.5 tabular-nums">
                            {scopeResult.estimatedWeeks}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {scopeResult.architectureSummary}
                      </p>

                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                          Stack
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {scopeResult.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                          Milestones
                        </p>
                        <ul className="space-y-1.5">
                          {scopeResult.milestones.map((m, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                            >
                              <Check className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400 shrink-0 mt-0.5" />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            onOpenChange(false);
                            onPrefillContact(buildScopeSummaryText(scopeResult));
                          }}
                          className="w-full py-2.5 px-4 rounded-lg bg-[#0B1120] dark:bg-[#2563EB] hover:bg-slate-800 dark:hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          {t.ai.scoperApplyContact}
                        </button>
                        <a
                          href={buildWhatsAppUrl(buildScopeSummaryText(scopeResult))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-lg border border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{t.ai.scoperWhatsapp}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "career" && (
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-950 dark:text-white mb-1">
                      {t.ai.careerTitle}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.ai.careerDesc}
                    </p>
                  </div>

                  <form onSubmit={handleCareerSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="ai-career-goal"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.ai.careerGoalLabel}
                      </label>
                      <textarea
                        id="ai-career-goal"
                        rows={3}
                        required
                        value={careerGoal}
                        onChange={(e) => setCareerGoal(e.target.value)}
                        placeholder={t.ai.careerGoalPlaceholder}
                        className="w-full p-3 rounded-lg bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-[#2563EB] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="ai-career-level"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          {t.ai.careerLevelLabel}
                        </label>
                        <select
                          id="ai-career-level"
                          value={careerLevel}
                          onChange={(e) => setCareerLevel(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-[#2563EB]"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="IT Technician">IT Technician</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="ai-career-hours"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          {t.ai.careerHoursLabel}
                        </label>
                        <select
                          id="ai-career-hours"
                          value={careerHours}
                          onChange={(e) => setCareerHours(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-[#2563EB]"
                        >
                          <option value="6">6 hrs / week</option>
                          <option value="10">10 hrs / week</option>
                          <option value="18">18+ hrs / week</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={careerLoading || !careerGoal.trim()}
                      className="w-full py-3 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      {careerLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <GraduationCap className="w-4 h-4" />
                      )}
                      <span>
                        {careerLoading
                          ? t.ai.careerGenerating
                          : t.ai.careerSubmit}
                      </span>
                    </button>
                  </form>

                  {careerError && (
                    <div
                      role="alert"
                      className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{careerError}</span>
                    </div>
                  )}

                  {careerResult && (
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-[#F4F6F9] dark:bg-slate-900 p-4 space-y-4">
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Recommended Cohort
                          </span>
                          <p className="font-display text-sm font-bold text-slate-950 dark:text-white mt-0.5">
                            {careerResult.recommendedCohort}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 font-mono text-xs font-bold text-[#2563EB] dark:text-blue-400 tabular-nums shrink-0">
                          {careerResult.readinessScore}% fit
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {careerResult.rationale}
                      </p>

                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                          4-Week Roadmap
                        </p>
                        <ul className="space-y-1.5">
                          {careerResult.weeklyPlan.map((step, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                            >
                              <Check className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400 shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                          Capstone Project
                        </span>
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                          {careerResult.capstoneProject}
                        </p>
                      </div>

                      <a
                        href={buildWhatsAppUrl(
                          `Hi fabu001, the AI Advisor matched me with "${careerResult.recommendedCohort}". My goal: ${careerGoal.trim()}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{t.ai.careerEnrollWhatsapp}</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "quick" && (
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {t.support.prompt}
                  </p>
                  <div className="space-y-2.5">
                    {quickActions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            onOpenChange(false);
                            onPrefillContact(item.msg);
                          }}
                          className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] text-left transition-colors cursor-pointer group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-xs font-bold text-slate-950 dark:text-white">
                              {item.label}
                            </span>
                            <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                              {item.desc}
                            </span>
                          </div>
                          <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 ml-auto shrink-0" />
                        </button>
                      );
                    })}
                  </div>

                  <a
                    href={buildWhatsAppUrl(
                      "Hi fabu001, I have a question about your services."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.support.startWhatsapp}</span>
                  </a>
                </div>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
