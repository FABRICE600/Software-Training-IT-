import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "./components/Navbar";
import type { SearchResult } from "./components/NavbarSearch";
import { HeroSection } from "./components/HeroSection";
import { ClientsSection } from "./components/ClientsSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { TechStackSection } from "./components/TechStackSection";
import { PricingSection } from "./components/PricingSection";
import { TrainingSection } from "./components/TrainingSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { TutorialsSection } from "./components/TutorialsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FaqSection } from "./components/FaqSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import {
  ShopDrawer,
  ClientPortalModal,
} from "./components/SupportAndShopModals";
import {
  AiStudioAssistant,
  type AiStudioTab,
} from "./components/AiStudioAssistant";
import { FloatingSocialBar } from "./components/FloatingSocialBar";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { ToastProvider } from "./components/SuccessToast";
import { ExitIntentNewsletterModal } from "./components/ExitIntentNewsletterModal";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";

const TRACKED_SECTIONS = [
  "hero",
  "clients",
  "about",
  "services",
  "tech",
  "pricing",
  "training",
  "experience",
  "tutorials",
  "projects",
  "testimonials",
  "faq",
  "blog",
  "contact",
];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [prefillMessage, setPrefillMessage] = useState("");
  const [shopOpen, setShopOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiTab, setAiTab] = useState<AiStudioTab>("chat");
  const [highlightedServiceId, setHighlightedServiceId] = useState<number | null>(null);
  const [highlightedCourseId, setHighlightedCourseId] = useState<number | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const highlightTimerRef = useRef<number | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (!target) return;
    const offset = 68;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const routeToContactWithMessage = useCallback(
    (msg: string) => {
      setPrefillMessage(msg);
      scrollToSection("contact");
    },
    [scrollToSection]
  );

  const handleSelectSearchResult = useCallback(
    (result: SearchResult) => {
      if (highlightTimerRef.current !== null) {
        window.clearTimeout(highlightTimerRef.current);
      }

      if (result.type === "service") {
        setHighlightedCourseId(null);
        setHighlightedServiceId(result.id);
        scrollToSection("services");
        highlightTimerRef.current = window.setTimeout(() => {
          setHighlightedServiceId(null);
        }, 3500);
      } else if (result.type === "training") {
        setHighlightedServiceId(null);
        setHighlightedCourseId(result.id);
        scrollToSection("training");
        highlightTimerRef.current = window.setTimeout(() => {
          setHighlightedCourseId(null);
        }, 3500);
      } else if (result.type === "blog") {
        setHighlightedServiceId(null);
        setHighlightedCourseId(null);
        scrollToSection("blog");
        setSelectedBlogPostId(result.id);
      } else if (result.type === "project") {
        setHighlightedServiceId(null);
        setHighlightedCourseId(null);
        scrollToSection("projects");
        setSelectedProjectId(result.id);
      }
    },
    [scrollToSection]
  );

  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + 200;
      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (probe >= top && probe < top + height) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onSelectSearchResult={handleSelectSearchResult}
        />

      <main className="flex-grow">
        <HeroSection
          onGetStarted={() => scrollToSection("contact")}
          onExploreCourses={() => scrollToSection("training")}
          onOpenShop={() => setShopOpen(true)}
          onOpenPortal={() => setPortalOpen(true)}
          onOpenAi={() => {
            setAiTab("scoper");
            setAiOpen(true);
          }}
        />
        <ClientsSection />
        <AboutSection />
        <ServicesSection
          highlightedServiceId={highlightedServiceId}
          onSelectService={(title) =>
            routeToContactWithMessage(
              `Hi fabu001, I would like to request a consultation for ${title}.`
            )
          }
        />
        <TechStackSection />
        <PricingSection
          onSelectPlan={(plan) =>
            routeToContactWithMessage(
              `Hi fabu001, I am interested in the ${plan} plan and would like to request a tailored quote.`
            )
          }
        />
        <TrainingSection highlightedCourseId={highlightedCourseId} />
        <ExperienceSection />
        <TutorialsSection
          onAskQuestion={(topic) =>
            routeToContactWithMessage(`Hi fabu001, I have a ${topic}.`)
          }
        />
        <ProjectsSection
          selectedProjectId={selectedProjectId}
          onSelectProjectId={setSelectedProjectId}
          onInquireProject={(projectTitle) =>
            routeToContactWithMessage(
              `Hi fabu001, I'm interested in building a solution similar to "${projectTitle}".`
            )
          }
        />
        <TestimonialsSection
          onPartnerClick={() =>
            routeToContactWithMessage(
              "Hi fabu001, I read your client testimonials and would like to explore a partnership."
            )
          }
        />
        <FaqSection />
        <BlogSection
          selectedPostId={selectedBlogPostId}
          onSelectPostId={setSelectedBlogPostId}
        />
        <ContactSection prefillMessage={prefillMessage} />
      </main>

      <Footer
        onScrollToTop={() => scrollToSection("hero")}
        onNavigate={scrollToSection}
      />

        <FloatingSocialBar />
        <ScrollToTopButton />
        <AiStudioAssistant
          open={aiOpen}
          initialTab={aiTab}
          onOpenChange={setAiOpen}
          onPrefillContact={routeToContactWithMessage}
        />
        <ShopDrawer open={shopOpen} onClose={() => setShopOpen(false)} />
        <ClientPortalModal open={portalOpen} onClose={() => setPortalOpen(false)} />
        <ExitIntentNewsletterModal />
        </div>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
