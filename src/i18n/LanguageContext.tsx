import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type Language = "en" | "rw";

export const TRANSLATIONS = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      projects: "Projects",
      training: "Training",
      pricing: "Pricing",
      requestService: "Request Service",
    },
    hero: {
      eyebrow: "Nyange, Rwanda · Software, Training & IT Solutions",
      lead: "We engineer custom web applications, resilient enterprise infrastructure, and practical full-stack software cohorts built for measurable operational growth.",
      startProject: "Start a Project",
      exploreCourses: "Explore Courses",
      digitalShop: "Digital Shop & Kits",
      clientPortal: "Client Portal",
      founderRole: "Founder & Lead Engineer",
      studioName: "fabu001 Studio",
      quote:
        "“Advancing Rwanda’s digital infrastructure through disciplined software architecture and hands-on technical mentorship.”",
      studioView: "Studio View",
      deskView: "Workstation View",
    },
    clients: {
      eyebrow: "Ecosystem",
      title: "Trusted by Leading Organizations",
      subtitle:
        "Supporting regional institutions, hubs, and high-growth enterprises across East Africa.",
    },
    about: {
      eyebrow: "Studio Leadership",
      title: "About fabu001",
      subtitle:
        "Full-stack software engineering, systems administration, and technical instruction anchored in Kigali and Nyange.",
      role: "Lead Software Engineer",
      location: "Nyange, Rwanda · EAV Kivumu TSS",
      mastery: "Technical Mastery",
      tabExperience: "Experience",
      tabCredentials: "Credentials",
      headlineStart: "Engineering for ",
      headlineAccent: "Reliability & Scale.",
      bio: "fabu001 builds reliable digital ecosystems. From custom web applications and fintech integrations to hands-on IT infrastructure support and technical education, every system is engineered to be maintainable, fast, and intuitive.",
      metrics: {
        clients: "Clients Served",
        students: "Students Trained",
        projects: "Projects Delivered",
        years: "Years Experience",
      },
      cvTitle: "Curriculum Vitae",
      cvLockedDesc: "Submit a quick request to unlock fabu001's engineering dossier.",
      cvUnlockedDesc: (name: string) =>
        `Unlocked for ${name}. Ready to download.`,
      requestDownload: "Request Download",
      downloadCv: "Download CV",
      messageWhatsapp: "Message on WhatsApp",
      cvModalTitle: "Request CV Access",
      cvModalDesc: "Share your name and context to unlock fabu001’s professional CV.",
      yourName: "Your Name",
      inquiryReason: "Inquiry Reason",
      unlockNow: "Unlock CV Now",
      cvValidationError: "Please enter both your name and inquiry reason.",
    },
    services: {
      eyebrow: "Capabilities",
      title: "Core Engineering Services",
      subtitle:
        "Structured technical execution across software builds, consulting, and reliable IT infrastructure.",
      categories: {
        all: "All",
        Development: "Development",
        Consulting: "Consulting",
        Infrastructure: "Infrastructure",
      },
      showingCount: (visible: number, total: number) =>
        `${visible} of ${total} services`,
      workflowEyebrow: "Methodology",
      workflowTitle: "Structured Delivery Workflow",
      workflowSubtitle:
        "Every engagement follows four disciplined phases from discovery to production support.",
      items: [
        {
          id: 1,
          code: "01",
          category: "Development" as const,
          icon: "code" as const,
          title: "Software Development",
          description: "Custom, scalable digital products built with modern frameworks.",
          items: ["Web Applications", "Mobile Solutions", "Custom APIs"],
        },
        {
          id: 2,
          code: "02",
          category: "Development" as const,
          icon: "server" as const,
          title: "Enterprise Systems & APIs",
          description: "Multi-tenant platforms, payment gateways, and legacy integrations engineered for high uptime.",
          items: ["Payment Bridges (MoMo/Stripe)", "Multi-Tenant SaaS", "ERP Workflows"],
        },
        {
          id: 3,
          code: "03",
          category: "Consulting" as const,
          icon: "cog" as const,
          title: "Digital Consulting",
          description: "Strategic roadmap for your organization's digital transformation.",
          items: ["Cloud Strategy", "Workflow Automation", "Tech Audits"],
        },
        {
          id: 4,
          code: "04",
          category: "Consulting" as const,
          icon: "graduation" as const,
          title: "Tech Training & Mentorship",
          description: "Empowering teams and cohorts with practical full-stack and IT engineering fluency.",
          items: ["Full-Stack Cohorts", "Corporate Upskilling", "Curriculum Advisory"],
        },
        {
          id: 5,
          code: "05",
          category: "Infrastructure" as const,
          icon: "laptop" as const,
          title: "Professional IT Support",
          description: "Reliable hardware and software maintenance for your business.",
          items: ["Network Security", "Hardware Repair", "System Recovery"],
        },
        {
          id: 6,
          code: "06",
          category: "Infrastructure" as const,
          icon: "cloud" as const,
          title: "Cloud & DevOps Operations",
          description: "Resilient server provisioning, automated backups, and continuous uptime monitoring.",
          items: ["AWS & Docker Hosting", "Automated Off-Site Backups", "Security Hardening"],
        },
      ],
      steps: [
        { step: "01", title: "Consult", desc: "Analyzing your operational goals and technical bottlenecks." },
        { step: "02", title: "Plan", desc: "Architecting the system blueprint, milestones, and stack." },
        { step: "03", title: "Execute", desc: "Engineering clean, tested software and resilient infrastructure." },
        { step: "04", title: "Support", desc: "Continuous monitoring, training, and iterative growth." },
      ],
    },
    tech: {
      eyebrow: "Architecture",
      title: "Tech Stack & Tools",
      subtitle:
        "Battle-tested frameworks, typed APIs, and container tooling powering fabu001 production systems.",
    },
    pricing: {
      eyebrow: "Engagement Tiers",
      title: "Transparent Pricing",
      subtitle:
        "Every project is scoped to your exact business requirements, timeline, and growth milestones.",
      recommended: "Recommended",
      plans: [
        {
          name: "Starter",
          price: "Custom",
          cadence: "per project",
          desc: "Ideal for small businesses and startups launching a credible, fast web presence.",
          features: [
            "Responsive Website (up to 5 pages)",
            "Technical SEO Setup",
            "Contact Form & WhatsApp Routing",
            "1 Month Post-Launch Support",
            "Domain & Hosting Setup",
          ],
          popular: false,
          action: "Request Starter Quote",
        },
        {
          name: "Business",
          price: "Custom",
          cadence: "per project",
          desc: "For growing companies needing a custom web platform with dashboards and payment rails.",
          features: [
            "Custom Web Application",
            "Role-Based Admin Dashboard",
            "Database Architecture & APIs",
            "Mobile Money / Card Integration",
            "3 Months Priority Support",
            "Core Web Vitals Optimization",
          ],
          popular: true,
          action: "Request Business Quote",
        },
        {
          name: "Enterprise",
          price: "Custom",
          cadence: "per project",
          desc: "End-to-end digital transformation for institutions, schools, and large organizations.",
          features: [
            "Full-Stack Multi-Tenant Platform",
            "Infrastructure & Security Audit",
            "CI/CD & Automated Backups",
            "On-Site & Remote Team Training",
            "6 Months Dedicated SLA",
            "Custom ERP / Legacy Migration",
          ],
          popular: false,
          action: "Contact Studio",
        },
      ],
    },
    training: {
      eyebrow: "Cohort Academy",
      title: "Professional Tech Training",
      subtitle: "Practical, mentor-led engineering tracks hosted in Nyange and online.",
      coreSyllabus: "Core Syllabus",
      enrollBtn: "Enroll in Cohort",
      outcomesEyebrow: "Cohort Outcomes",
      outcomesTitle: "Alumni & Student Perspectives",
      deskTitle: "Enrollment Desk",
      deskDescStart: "Reserve your place in ",
      fullName: "Your Full Name",
      phoneWhatsapp: "Phone Number (WhatsApp)",
      submitEnroll: "Request Enrollment",
      receivedTitle: "Enrollment Request Received",
      receivedDesc: (name: string, course: string) =>
        `Thank you, ${name}. Your seat inquiry for ${course} has been logged.`,
      confirmWhatsapp: "Confirm via WhatsApp",
      done: "Done",
      courses: [
        {
          id: 0,
          title: "Web Development",
          duration: "8 Weeks",
          projects: "5+ Real Projects",
          difficulty: "Beginner",
          icon: "code" as const,
          topics: ["UI/UX", "React", "Git", "REST API"],
          desc: "Master the craft of building responsive, production-ready web applications from the ground up.",
        },
        {
          id: 1,
          title: "Advanced Laravel",
          duration: "6 Weeks",
          projects: "SaaS Platform",
          difficulty: "Intermediate",
          icon: "layers" as const,
          topics: ["Auth", "Database", "Scaling", "Cloud"],
          desc: "Deep dive into enterprise-grade backend architecture, queues, and scalable PHP systems.",
        },
        {
          id: 2,
          title: "IT Support",
          duration: "4 Weeks",
          projects: "Lab Simulation",
          difficulty: "Beginner",
          icon: "shield" as const,
          topics: ["Networking", "Hardware", "Security", "OS"],
          desc: "The foundation of technical operations. Master networking, hardware diagnostics, and endpoint security.",
        },
      ],
    },
    experience: {
      eyebrow: "Track Record",
      title: "Experience & Education",
      subtitle:
        "Select any milestone along the timeline to inspect role responsibilities, key deliverables, and featured engineering builds.",
      workLabel: "Work",
      educationLabel: "Education",
      expandDetails: "Expand details",
      collapseDetails: "Hide details",
      prevMilestone: "Previous milestone",
      nextMilestone: "Next milestone",
      highlightsHeading: "Key Achievements & Responsibilities",
      projectsHeading: "Featured Projects & Initiatives",
      stackHeading: "Core Tools & Focus",
      clickHint: "Click any milestone above to view full role & project details.",
      milestones: [
        {
          id: 1,
          type: "work" as const,
          year: "2021",
          period: "2021 — Present",
          title: "Founder & Lead Engineer",
          org: "fabu001 Studio",
          location: "Nyange & Kigali, Rwanda",
          desc: "Leading an independent software studio delivering custom web apps, IT infrastructure, and technical training.",
          extendedDetails:
            "Founded fabu001 Studio to bridge disciplined software engineering and practical technical mentorship across Rwanda. Architected production web systems, automated mobile-money billing pipelines, and enterprise management portals backed by clear SLA retainers.",
          highlights: [
            "Shipped 30+ custom software platforms, ERPs, and institutional portals",
            "Built MTN MoMo & Airtel Money automated payment reconciliation engines",
            "Trained 100+ students and corporate staff in modern full-stack engineering",
          ],
          relatedProjects: ["Payment Gateway API", "E-Commerce Dashboard", "Smart Warehouse ERP"],
          stack: ["React", "TypeScript", "Laravel", "PostgreSQL", "Docker"],
        },
        {
          id: 2,
          type: "work" as const,
          year: "2023",
          period: "2023 — 2024",
          title: "IT Support Specialist",
          org: "Dione Coaching Center",
          location: "Nyange, Rwanda",
          desc: "Managed local area networking, workstation maintenance, and hardware diagnostics for a multi-room center.",
          extendedDetails:
            "Directed daily IT operations across multi-room training labs. Standardized workstation OS imaging, router traffic segmentation, and preventative hardware checks to eliminate downtime during live classes and assessments.",
          highlights: [
            "Sustained 99.5% network and workstation availability across training rooms",
            "Deployed segmented staff & student VLANs with endpoint protection",
            "Authored structured hardware troubleshooting runbooks for rapid recovery",
          ],
          relatedProjects: ["Campus LAN Segmentation", "Workstation Imaging Pipeline"],
          stack: ["Linux", "Windows Server", "TCP/IP & VLANs", "CompTIA A+"],
        },
        {
          id: 3,
          type: "education" as const,
          year: "2024",
          period: "2024 — Present",
          title: "Level 4 Software Development",
          org: "EAV Kivumu TSS",
          location: "Kivumu, Rwanda",
          desc: "Advanced technical track covering web engineering, database systems, UI/UX, and collaborative Git.",
          extendedDetails:
            "Pursuing applied Level 4 Software Development (L4SWD) studies at EAV Kivumu Technical Secondary School. Focused on translating software fundamentals directly into real-world client systems, relational database architecture, and team Git workflows.",
          highlights: [
            "Co-designed and built the fabu001 DevHub student education gateway",
            "Engineered normalized MySQL & PostgreSQL schemas for school systems",
            "Practiced collaborative PR reviews, testing, and accessible UI engineering",
          ],
          relatedProjects: ["fabu001 DevHub • Kivumu TSS", "School Management"],
          stack: ["TypeScript", "PHP / Laravel", "MySQL", "Tailwind CSS", "Git"],
        },
        {
          id: 4,
          type: "work" as const,
          year: "2024+",
          period: "2024 — Present",
          title: "Software Development Instructor",
          org: "EAV Kivumu TSS (L4SWD)",
          location: "Kivumu, Rwanda",
          desc: "Mentoring Level 4 Software Development students in full-stack engineering and production deployment.",
          extendedDetails:
            "Serving as L4SWD student coordinator and practical engineering mentor. Guiding cohorts from core web fundamentals to React component architecture, backend authentication, and deploying capstone systems used by schools and local businesses.",
          highlights: [
            "Mentored 60+ software development students across live team capstones",
            "Led weekly code reviews covering clean TypeScript and SQL security",
            "Facilitated hands-on hardware simulation and cloud deployment labs",
          ],
          relatedProjects: ["Full-Stack Cohort Curriculum", "Capstone Evaluation Labs"],
          stack: ["React", "Node.js", "REST APIs", "Git Workflows"],
        },
        {
          id: 5,
          type: "education" as const,
          year: "2025",
          period: "2025",
          title: "AWS Cloud Practitioner",
          org: "Amazon Web Services",
          location: "Cloud Certification",
          desc: "Certified in cloud architecture fundamentals, IAM security best practices, and cost optimization.",
          extendedDetails:
            "Earned official Amazon Web Services certification validating cloud architectural patterns, least-privilege IAM governance, automated off-site backup durability, and cost-effective deployment strategies for regional startups.",
          highlights: [
            "Implemented least-privilege IAM roles and encrypted S3 off-site backups",
            "Containerized full-stack deployments using Docker and cloud pipelines",
            "Optimized compute sizing and caching to lower client hosting overhead",
          ],
          relatedProjects: ["Network Monitor Pro", "Security Audit Script"],
          stack: ["AWS IAM & S3", "Docker", "VPC", "CloudWatch"],
        },
      ],
    },
    tutorials: {
      eyebrow: "Video Guides",
      title: "Client Tutorials",
      openGuide: "Open Interactive Guide",
      checklistTitle: "Walkthrough Checklist",
      askTeam: "Ask Team About This Step",
      close: "Close",
      allCategory: "All",
    },
    projects: {
      eyebrow: "Selected Builds",
      titleStart: "Innovating ",
      titleAccent: "Digital",
      titleEnd: " Systems",
      searchPlaceholder: "Search spec or tech (React, fabu001)...",
      viewCaseStudy: "View Case Study",
      emptyTitle: "No projects matched your search",
      emptyDesc: (q: string) =>
        `No portfolio items matched “${q}”. Reset filters to view all 13 builds.`,
      resetFilters: "Reset Filters",
      overviewHeading: "Project Overview & Impact",
      measuredOutcome: "Measured Outcome",
      requestSimilar: "Request Similar Build",
      discussWhatsapp: "Discuss on WhatsApp",
      primaryTab: "Primary",
      archTab: "Architecture",
    },
    testimonials: {
      eyebrow: "Client Endorsements",
      title: "Partner Feedback",
      subtitle:
        "Verified outcomes from startup founders, technical directors, and educational institutions.",
      cta: "Explore a Partnership",
    },
    faq: {
      eyebrow: "Questions",
      title: "Frequently Asked Questions",
      subtitle:
        "Clear answers on project timelines, payment integration, cohort enrollment, and post-launch support with fabu001.",
      items: [
        {
          q: "What services does fabu001 offer?",
          a: "We deliver full-cycle software development (web applications, custom APIs, and internal systems), professional IT infrastructure support, hands-on tech training cohorts, and digital strategy consulting.",
        },
        {
          q: "How long does it take to build a custom web application?",
          a: "Timelines depend on scope and integrations. A focused business website typically ships in 2–4 weeks, while a custom SaaS platform or ERP takes 8–14 weeks with weekly staging demos.",
        },
        {
          q: "Do you offer remote training programs?",
          a: "Yes. Our training cohorts run both in-person in Nyange, Rwanda and remotely via live interactive sessions, complete with recordings, project reviews, and lab guides.",
        },
        {
          q: "What is the cost of your services?",
          a: "Every engagement is quoted transparently by scope, timeline, and support requirements. We structure accessible milestone pricing for startups, NGOs, schools, and enterprises.",
        },
        {
          q: "Do you provide post-launch support and maintenance?",
          a: "Yes. All builds include an initial warranty period, with optional ongoing retainers covering uptime monitoring, security patches, backups, and feature iterations.",
        },
        {
          q: "How can I enroll in a training cohort?",
          a: "Open the Training section, select your preferred track (Web Development, Advanced Laravel, or IT Support), and submit the enrollment form. Our admissions desk responds within 24 hours.",
        },
        {
          q: "What technologies do you use for development?",
          a: "We specialize in React, TypeScript, Next.js, Laravel, Node.js, Python, and Tailwind CSS backed by PostgreSQL, MySQL, Redis, Docker, and AWS cloud infrastructure.",
        },
        {
          q: "Do you work with international clients?",
          a: "Yes. We collaborate with organizations across East Africa, Europe, and North America using structured milestones, async updates, and live weekly video check-ins.",
        },
        {
          q: "Can you integrate mobile money payments into my site?",
          a: "Yes. We implement MTN MoMo, Airtel Money, Flutterwave, and Stripe payment flows with automated webhook verification and instant receipt generation.",
        },
      ],
    },
    blog: {
      eyebrow: "Engineering Notes",
      title: "Tech Blog & News",
      subtitle:
        "Field notes on full-stack engineering, cybersecurity hygiene, and East African fintech architecture.",
      readArticle: "Read Article",
      by: "By",
      closeArticle: "Close Article",
      minRead: (minutes: number) => `${minutes} min read`,
      wordsCount: (count: number) => `${count} words`,
    },
    contact: {
      eyebrow: "Project Inquiry",
      title: "Start a Build with fabu001",
      subtitle:
        "Share your requirements or schedule a discovery session with our engineering desk.",
      deskEyebrow: "Direct Studio Desk",
      deskTitle: "Nyange, Rwanda · Remote Worldwide",
      deskDesc:
        "Available for custom software builds, institutional training cohorts, and dedicated IT architecture advisory.",
      directLine: "Direct Line",
      emailLabel: "Email",
      availabilityLabel: "Availability",
      availabilityValue: "Accepting Q4 / Q1 Client Projects",
      availabilityNote: "Typical reply within 5 minutes during studio hours",
      bookCall: "Book Discovery Call",
      fullName: "Full Name",
      emailAddress: "Email Address",
      projectBrief: "Project Brief",
      briefPlaceholder: "Hi fabu001, I have a project or training inquiry...",
      sendBrief: "Send Official Brief",
      chatWhatsapp: "Chat on WhatsApp",
      dispatchedTitle: "Inquiry Dispatched",
      dispatchedDesc: (name: string, email: string) =>
        `Thank you, ${name}. Your brief for fabu001 has been recorded and we will respond to ${email} shortly.`,
      continueWhatsapp: "Continue on WhatsApp",
      sendAnother: "Send Another Message",
      errName: "Please enter your full name.",
      errEmail: "Please enter a valid email address.",
      errMsg: "Please provide a brief description of your project or inquiry.",
    },
    footer: {
      bio: "Software Engineering Studio & IT Training Center based in Nyange, Rwanda. Building reliable digital systems and empowering technical talent.",
      rights: "All rights reserved.",
      location: "Nyange, Rwanda",
      newsletterEyebrow: "Newsletter",
      newsletterTitle: "Engineering & Cohort Updates",
      newsletterDesc:
        "Receive monthly notes on software launches, open training seats, and technical guides.",
      newsletterPlaceholder: "you@company.com",
      subscribe: "Subscribe",
      subscribeAnother: "Subscribe another email",
      newsletterEmptyErr: "Please enter your email address.",
      newsletterInvalidErr:
        "Please enter a valid email address (e.g., name@domain.com).",
      newsletterSuccess:
        "You're subscribed to fabu001 product releases and cohort updates.",
      newsletterDuplicate:
        "This email is already subscribed to fabu001 updates.",
    },
    support: {
      title: "fabu001 Support",
      status: "Available · Replies under 5 min",
      prompt: "Choose an action to jump straight into a brief or WhatsApp chat:",
      startWhatsapp: "Start WhatsApp Chat",
      quickChat: "Quick Chat",
      quickChatDesc: "General studio inquiry",
      hireStudio: "Hire Studio",
      hireStudioDesc: "Start a custom build",
      bookMeeting: "Book Meeting",
      bookMeetingDesc: "Schedule a discovery call",
    },
    search: {
      placeholder: "Search services, training, blog...",
      ariaLabel: "Search services, training programs, blog posts, and projects",
      openSearch: "Search site",
      clear: "Clear search",
      resultsLabel: "Search results",
      allTab: "All",
      servicesGroup: "Services",
      trainingGroup: "Training",
      blogGroup: "Blogs",
      projectsGroup: "Projects",
      quickJump: "Quick Discovery",
      matchesCount: (count: number) =>
        `${count} ${count === 1 ? "match" : "matches"}`,
      emptyTitle: (q: string) => `No matches found for “${q}”`,
      emptyHint: "Try searching for Web Development, Laravel, IT Support, or Fintech.",
      reset: "Clear query",
      keyboardHint: "↑↓ navigate · Enter open · Esc close",
    },
  },
  rw: {
    nav: {
      about: "Turi Bande",
      services: "Serivisi",
      projects: "Imishinga",
      training: "Amahugurwa",
      pricing: "Ibiciro",
      requestService: "Saba Serivisi",
    },
    hero: {
      eyebrow: "Nyange, Rwanda · Software, Amahugurwa n'Ibisubizo bya IT",
      lead: "Twubaka porogaramu za web zihariye, ibikorwaremezo bya IT bikomeye, n'amahugurwa ya software afasha ibigo n'urubyiruko gutera imbere mu ikoranabuhanga.",
      startProject: "Tangira Umushinga",
      exploreCourses: "Reba Amasomo",
      digitalShop: "Iduka ry'Ikoranabuhanga",
      clientPortal: "Urubuga rw'Abakiriya",
      founderRole: "Uwashinze & Umwenjeniyeri Mukuru",
      studioName: "fabu001 Studio",
      quote:
        "“Guteza imbere ibikorwaremezo by'ikoranabuhanga mu Rwanda binyuze mu kubaka software zinoze n'amahugurwa y'umwuga.”",
      studioView: "Muri Studio",
      deskView: "Ku Meza y'Akazi",
    },
    clients: {
      eyebrow: "Abafatanyabikorwa",
      title: "Twizewe n'Ibigo Bikomeye",
      subtitle:
        "Dufasha ibigo by'imari, amashuri, n'amasosiyete atandukanye mu karere ka Afurika y'Iburasirazuba.",
    },
    about: {
      eyebrow: "Ubuyobozi bwa Studio",
      title: "Ibyerekeye fabu001",
      subtitle:
        "Kubaka porogaramu zigezweho, gucunga sisitemu za IT, no kwigisha abanyeshuri i Kigali no mu karere ka Nyange.",
      role: "Umwenjeniyeri Mukuru wa Software",
      location: "Nyange, Rwanda · EAV Kivumu TSS",
      mastery: "Ubuhanga mu Ikoranabuhanga",
      tabExperience: "Uburambe",
      tabCredentials: "Impamyabushobozi",
      headlineStart: "Twubaka Ikoranabuhanga ",
      headlineAccent: "Rirambye kandi Ryizewe.",
      bio: "fabu001 yubaka sisitemu z'ikoranabuhanga zikora neza. Kuva ku mbuga za web, API z'ubwishyu, kugeza ku bufasha bwa IT n'amahugurwa, buri gikorwa kigamije koroshya akazi no kongera umusaruro.",
      metrics: {
        clients: "Abakiriya Twafashije",
        students: "Abanyeshuri Bahuguwe",
        projects: "Imishinga Yuzuye",
        years: "Imyaka y'Uburambe",
      },
      cvTitle: "Umwirondoro w'Umwuga (CV)",
      cvLockedDesc: "Uzuza umwirondoro muto kugira ngo ubone CV ya fabu001.",
      cvUnlockedDesc: (name: string) =>
        `Yafunguriwe ${name}. Ushobora kuyimanura nonaha.`,
      requestDownload: "Saba Kuyimanura",
      downloadCv: "Manura CV",
      messageWhatsapp: "Tuvugane kuri WhatsApp",
      cvModalTitle: "Saba Uburenganzira kuri CV",
      cvModalDesc: "Andika izina ryawe n'impamvu kugira ngo ufungure CV ya fabu001.",
      yourName: "Izina Ryawe",
      inquiryReason: "Impamvu yo Gusaba",
      unlockNow: "Fungura CV Nonaha",
      cvValidationError: "Nyamuneka andika izina ryawe n'impamvu yo gusaba.",
    },
    services: {
      eyebrow: "Ubushobozi Bwacu",
      title: "Serivisi z'Ikoranabuhanga",
      subtitle:
        "Gutanga ibisubizo bya tekiniki binoze mu kubaka software, ubujyanama, n'ibikorwaremezo bya IT.",
      categories: {
        all: "Byose",
        Development: "Iterambere",
        Consulting: "Ubujyanama",
        Infrastructure: "Ibikorwaremezo",
      },
      showingCount: (visible: number, total: number) =>
        `Serivisi ${visible} muri ${total}`,
      workflowEyebrow: "Uko Dukora",
      workflowTitle: "Intambwe Zinoze z'Umushinga",
      workflowSubtitle:
        "Buri mushinga unyura mu byiciro bine bisobanutse kuva ku kiganiro kugeza ku bufasha nyuma yo gutangira.",
      items: [
        {
          id: 1,
          code: "01",
          category: "Development" as const,
          icon: "code" as const,
          title: "Kubaka Software",
          description: "Porogaramu zigezweho kandi zaguka zubatswe mu ikoranabuhanga rishya.",
          items: ["Imbuga za Web", "Porogaramu za Telefone", "Custom APIs"],
        },
        {
          id: 2,
          code: "02",
          category: "Development" as const,
          icon: "server" as const,
          title: "Sisitemu z'Ibigo na APIs",
          description: "Imiyoboro y'ubwishyu ya MoMo na Stripe hamwe na sisitemu zagutse zikora ubudahwema.",
          items: ["Ubwishyu (MoMo / Stripe)", "Sisitemu za SaaS", "ERP z'Ibigo"],
        },
        {
          id: 3,
          code: "03",
          category: "Consulting" as const,
          icon: "cog" as const,
          title: "Ubujyanama mu Ikoranabuhanga",
          description: "Icyerekezo gikwiye cyo kunoza imikorere y'ikigo binyuze muri digital.",
          items: ["Ingamba za Cloud", "Kwikoresha kw'Akazi", "Isuzuma rya Tekiniki"],
        },
        {
          id: 4,
          code: "04",
          category: "Consulting" as const,
          icon: "graduation" as const,
          title: "Amahugurwa & Ubujyanama",
          description: "Gutegura abakozi n'abanyeshuri mu bumenyi ngiro bwa software na IT.",
          items: ["Amasomo ya Full-Stack", "Guhugura Abakozi", "Inyigisho z'Umwuga"],
        },
        {
          id: 5,
          code: "05",
          category: "Infrastructure" as const,
          icon: "laptop" as const,
          title: "Ubufasha bwa IT",
          description: "Gukurikirana no gusana ibikoresho na porogaramu mu kigo cyawe.",
          items: ["Umutekano wa Network", "Gusana Mudasobwa", "Kugarura Sisitemu"],
        },
        {
          id: 6,
          code: "06",
          category: "Infrastructure" as const,
          icon: "cloud" as const,
          title: "Cloud na DevOps",
          description: "Gucunga seriveri ku murongo, kubika amakuru buri gihe, no gukumira ihagarara.",
          items: ["AWS & Docker Hosting", "Backups Zikora Buri Gihe", "Umutekano wa Seriveri"],
        },
      ],
      steps: [
        { step: "01", title: "Kugisha Inama", desc: "Kusesengura intego z'ikigo n'ibibazo bya tekiniki bihari." },
        { step: "02", title: "Gutegura", desc: "Gushushanya imiterere ya sisitemu, igihe, n'ikoranabuhanga." },
        { step: "03", title: "Kubaka", desc: "Kwandika code isukuye no kugenzura ko sisitemu ikora neza." },
        { step: "04", title: "Ubufasha", desc: "Gukurikirana imikorere buri gihe, guhugura abakozi, no kuvugurura." },
      ],
    },
    tech: {
      eyebrow: "Imyubakire",
      title: "Ikoranabuhanga Dukoresha",
      subtitle:
        "Ikoranabuhanga ryizewe na API zikomeye zikoreshwa muri sisitemu za fabu001.",
    },
    pricing: {
      eyebrow: "Ibyiciro by'Ibiciro",
      title: "Ibiciro Bisobanutse",
      subtitle:
        "Buri mushinga uhabwa agaciro gashingiye ku byifuzo byawe, igihe, n'iterambere wifuza.",
      recommended: "Icyiciro Cyatoranyijwe",
      plans: [
        {
          name: "Starter",
          price: "Kumvikana",
          cadence: "ku mushinga",
          desc: "Byiza ku bucuruzi buto n'ibigo bitangiye bishaka urubuga rwa web ruzima.",
          features: [
            "Urubuga rwa Web (kugeza ku mpapuro 5)",
            "Gutunganya SEO y'Ibanze",
            "Ifishi yo Kuvugana & WhatsApp",
            "Ukwezi 1 kw'Ubufasha Nyuma yo Gutangira",
            "Gushyira ku Murongo & Domain",
          ],
          popular: false,
          action: "Saba Igiciro cya Starter",
        },
        {
          name: "Business",
          price: "Kumvikana",
          cadence: "ku mushinga",
          desc: "Ku masosiyete ari kwaguka akeneye sisitemu ifite dashboards n'ubwishyu.",
          features: [
            "Porogaramu ya Web Yihariye",
            "Dashboard y'Ubuyobozi",
            "Imiterere ya Database & APIs",
            "Kwishyura na Mobile Money / Ikarita",
            "Amezi 3 y'Ubufasha Bwihuse",
            "Kunoza Umuvuduko wa Web",
          ],
          popular: true,
          action: "Saba Igiciro cya Business",
        },
        {
          name: "Enterprise",
          price: "Kumvikana",
          cadence: "ku mushinga",
          desc: "Impinduka zuzuye mu ikoranabuhanga ku mashuri n'ibigo binini.",
          features: [
            "Sisitemu Yagutse ya Multi-Tenant",
            "Isuzuma ry'Umutekano wa Sisitemu",
            "CI/CD & Kubika Amakuru Buri Gihe",
            "Amahugurwa y'Abakozi ku Kigo",
            "Amezi 6 ya SLA Yihariye",
            "ERP Yihariye / Kwimura Sisitemu",
          ],
          popular: false,
          action: "Vugana na Studio",
        },
      ],
    },
    training: {
      eyebrow: "Ishuri ry'Ikoranabuhanga",
      title: "Amahugurwa y'Umwuga",
      subtitle:
        "Amasomo ngiro ayoborwa n'abamenyereye umwuga abera i Nyange no kuri interineti.",
      coreSyllabus: "Ibyigwa by'Ibanze",
      enrollBtn: "Iyandikishe mu Itsinda",
      outcomesEyebrow: "Umusaruro w'Amahugurwa",
      outcomesTitle: "Ubuhamya bw'Abanyeshuri",
      deskTitle: "Ibiro byo Kwiyandikisha",
      deskDescStart: "Fata umwanya wawe mu isomo rya ",
      fullName: "Amazina Yawe Yuzuye",
      phoneWhatsapp: "Nimero ya Telefone (WhatsApp)",
      submitEnroll: "Ohereza Ubusabe",
      receivedTitle: "Ubusabe Bwakiriwe",
      receivedDesc: (name: string, course: string) =>
        `Murakoze, ${name}. Ubusabe bwawe mu isomo rya ${course} bwanditswe.`,
      confirmWhatsapp: "Emeza kuri WhatsApp",
      done: "Byarangiye",
      courses: [
        {
          id: 0,
          title: "Web Development",
          duration: "Ibyumweru 8",
          projects: "Imishinga 5+",
          difficulty: "Abatangizi",
          icon: "code" as const,
          topics: ["UI/UX", "React", "Git", "REST API"],
          desc: "Iga kubaka imbuga za web zikora neza kuri telefone no kuri mudasobwa uhereye ku ntangiriro.",
        },
        {
          id: 1,
          title: "Advanced Laravel",
          duration: "Ibyumweru 6",
          projects: "Sisitemu ya SaaS",
          difficulty: "Ababiziho",
          icon: "layers" as const,
          topics: ["Auth", "Database", "Scaling", "Cloud"],
          desc: "Sobanukirwa imyubakire ya backend ikomeye, database n'uburyo bwo kwagura sisitemu za PHP.",
        },
        {
          id: 2,
          title: "IT Support",
          duration: "Ibyumweru 4",
          projects: "Imyitozo mu Ikoraniro",
          difficulty: "Abatangizi",
          icon: "shield" as const,
          topics: ["Networking", "Hardware", "Security", "OS"],
          desc: "Urufatiro rw'imirimo ya IT. Iga network, gusana ibikoresho, n'umutekano wa sisitemu.",
        },
      ],
    },
    experience: {
      eyebrow: "Inzira y'Akazi",
      title: "Uburambe n'Amashuri",
      subtitle:
        "Kanda ku ntambwe iyo ari yo yose kuri timeline kugira ngo usome ibisobanuro birambuye ku mirimo n'imishinga.",
      workLabel: "Akazi",
      educationLabel: "Amashuri",
      expandDetails: "Fungura ibisobanuro",
      collapseDetails: "Funga ibisobanuro",
      prevMilestone: "Intambwe ibanza",
      nextMilestone: "Intambwe ikurikira",
      highlightsHeading: "Ibyagezweho n'Inshingano",
      projectsHeading: "Imishinga n'Ibikorwa",
      stackHeading: "Ikoranabuhanga Ryakoreshejwe",
      clickHint: "Kanda ku ntambwe hejuru kugira ngo ufungure ibisobanuro byayo.",
      milestones: [
        {
          id: 1,
          type: "work" as const,
          year: "2021",
          period: "2021 — Kugeza ubu",
          title: "Uwashinze & Umwenjeniyeri Mukuru",
          org: "fabu001 Studio",
          location: "Nyange & Kigali, Rwanda",
          desc: "Kuyobora studio yigenga yubaka imbuga za web, sisitemu za IT, n'amahugurwa y'umwuga.",
          extendedDetails:
            "Yashinze fabu001 Studio mu rwego rwo guhuza iyubakwa rya software rinoze n'ubujyanama ngiro mu ikoranabuhanga mu Rwanda. Yubatse sisitemu za web, imiyoboro yo kwishyurana ya Mobile Money, na porogaramu z'ibigo.",
          highlights: [
            "Yagejeje imishinga irenga 30 ya software, ERP, n'imbuga z'ibigo",
            "Yubatse uburyo bwo guhuza ubwishyu bwa MTN MoMo na Airtel Money",
            "Yahuguye abanyeshuri n'abakozi barenga 100 mu kubaka software",
          ],
          relatedProjects: ["Payment Gateway API", "E-Commerce Dashboard", "Smart Warehouse ERP"],
          stack: ["React", "TypeScript", "Laravel", "PostgreSQL", "Docker"],
        },
        {
          id: 2,
          type: "work" as const,
          year: "2023",
          period: "2023 — 2024",
          title: "Impuguke mu Bufasha bwa IT",
          org: "Dione Coaching Center",
          location: "Nyange, Rwanda",
          desc: "Gucunga imiyoboro ya network, mudasobwa z'abanyeshuri, no gusana ibikoresho by'ikoranabuhanga.",
          extendedDetails:
            "Yayoboye ibikorwa bya IT bya buri munsi mu byumba by'amahugurwa. Yatunganyije uburyo bwo gushyira porogaramu kuri mudasobwa nyinshi icyarimwe, agabanya ibibazo bya network mu gihe cy'amasomo.",
          highlights: [
            "Yarinze umuyoboro na mudasobwa gukora neza ku kigero cya 99.5%",
            "Yatandukanyije imiyoboro (VLANs) y'abakozi n'abanyeshuri ku mutekano",
            "Yanditse inyobora zifasha mu gukemura ibibazo bya mudasobwa vuba",
          ],
          relatedProjects: ["Campus LAN Segmentation", "Workstation Imaging Pipeline"],
          stack: ["Linux", "Windows Server", "TCP/IP & VLANs", "CompTIA A+"],
        },
        {
          id: 3,
          type: "education" as const,
          year: "2024",
          period: "2024 — Kugeza ubu",
          title: "Level 4 Software Development",
          org: "EAV Kivumu TSS",
          location: "Kivumu, Rwanda",
          desc: "Amasomo yimbitse mu kubaka software, database, UI/UX, n'imikoranire kuri Git.",
          extendedDetails:
            "Kwiga mu cyiciro cya 4 mu kubaka software (L4SWD) muri EAV Kivumu TSS, ashyira mu bikorwa ubumenyi bwo kubaka sisitemu zifasha ibigo, gushushanya database zinoze, no gukorera hamwe hakoreshejwe Git.",
          highlights: [
            "Yafatanyije kubaka urubuga rwa fabu001 DevHub rw'abanyeshuri",
            "Yashushanyije database za MySQL na PostgreSQL z'amashuri",
            "Yimenyereje isuzuma rya code n'imyubakire ibereye bose (UI accessibility)",
          ],
          relatedProjects: ["fabu001 DevHub • Kivumu TSS", "School Management"],
          stack: ["TypeScript", "PHP / Laravel", "MySQL", "Tailwind CSS", "Git"],
        },
        {
          id: 4,
          type: "work" as const,
          year: "2024+",
          period: "2024 — Kugeza ubu",
          title: "Umwarimu wa Software Development",
          org: "EAV Kivumu TSS (L4SWD)",
          location: "Kivumu, Rwanda",
          desc: "Gutoza abanyeshuri ba L4SWD kubaka sisitemu za full-stack no kuzishyira ku murongo.",
          extendedDetails:
            "Guhagararira no guhugura abanyeshuri ba L4SWD mu masomo ngiro yo kubaka imbuga za React, API zikora neza, no gutegura imishinga y'abanyeshuri ikemura ibibazo by'ibigo n'amashuri.",
          highlights: [
            "Yahuguye abanyeshuri barenga 60 mu mishinga ngiro ya software",
            "Yayoboye isuzuma rya buri cyumweru kuri TypeScript n'umutekano wa SQL",
            "Yateguye imyitozo ya hardware n'ishyirwa ku murongo rya Cloud",
          ],
          relatedProjects: ["Full-Stack Cohort Curriculum", "Capstone Evaluation Labs"],
          stack: ["React", "Node.js", "REST APIs", "Git Workflows"],
        },
        {
          id: 5,
          type: "education" as const,
          year: "2025",
          period: "2025",
          title: "AWS Cloud Practitioner",
          org: "Amazon Web Services",
          location: "Impamyabushobozi ya Cloud",
          desc: "Impamyabushobozi mu myubakire ya Cloud, umutekano wa IAM, no kugabanya ikiguzi cya seriveri.",
          extendedDetails:
            "Yahawe impamyabushobozi ya Amazon Web Services igaragaza ubumenyi mu gucunga ibikorwaremezo bya Cloud, umutekano wa IAM, kubika amakuru mu buryo bwizewe (S3 backups), no kugena igiciro gito cyo gucumbikira imbuga.",
          highlights: [
            "Yashyizeho uburenganzira bwa IAM n'ububiko bwizewe bwa S3 backups",
            "Yateguye sisitemu zikoresha Docker kuri seriveri za Cloud",
            "Yagabanyije ikiguzi cya seriveri ku bakiriya bakoresha Cloud",
          ],
          relatedProjects: ["Network Monitor Pro", "Security Audit Script"],
          stack: ["AWS IAM & S3", "Docker", "VPC", "CloudWatch"],
        },
      ],
    },
    tutorials: {
      eyebrow: "Amasomo y'Amashusho",
      title: "Inyobora ku Bakiriya",
      openGuide: "Fungura Inyobora",
      checklistTitle: "Intambwe zo Gukurikiza",
      askTeam: "Baza Ikipe Iyi Ntambwe",
      close: "Funga",
      allCategory: "Byose",
    },
    projects: {
      eyebrow: "Imishinga Twakoze",
      titleStart: "Duhanga Ibisubizo ",
      titleAccent: "by'Ikoranabuhanga",
      titleEnd: "",
      searchPlaceholder: "Shakisha umushinga cyangwa tech (React, fabu001)...",
      viewCaseStudy: "Reba Umushinga Wose",
      emptyTitle: "Nta mushinga ujyanye n'ibyo washatse",
      emptyDesc: (q: string) =>
        `Nta mushinga wabonetse kuri “${q}”. Subiza ku ntangiriro urebe imishinga 13 yose.`,
      resetFilters: "Subiza ku Ntangiriro",
      overviewHeading: "Incicamake & Umusaruro",
      measuredOutcome: "Ibyagezweho",
      requestSimilar: "Saba Umushinga Nk'uyu",
      discussWhatsapp: "Ganira kuri WhatsApp",
      primaryTab: "Iy'Ibanze",
      archTab: "Imyubakire",
    },
    testimonials: {
      eyebrow: "Ubuhamya",
      title: "Ibyo Abafatanyabikorwa Bavuga",
      subtitle:
        "Umusaruro wagaragajwe n'abayobozi b'ibigo, abashinze startups, n'amashuri.",
      cta: "Tangira Ubufatanye",
    },
    faq: {
      eyebrow: "Ibibazo",
      title: "Ibibazo Bikunze Kubazwa",
      subtitle:
        "Ibisubizo bisobanutse ku gihe cy'umushinga, ubwishyu, amahugurwa, n'ubufasha bwa fabu001.",
      items: [
        {
          q: "Ni izihe serivisi fabu001 itanga?",
          a: "Dutanga serivisi zo kubaka porogaramu za web na telefone, ubujyanama n'ubufasha bwa IT, amahugurwa y'ikoranabuhanga, no kunoza imikorere y'ibigo.",
        },
        {
          q: "Bifata igihe kingana iki kubaka urubuga cyangwa porogaramu?",
          a: "Biterwa n'ubunini bw'umushinga. Urubuga rusanzwe rufata ibyumweru 2–4, naho sisitemu nini nka SaaS cyangwa ERP igafata ibyumweru 8–14.",
        },
        {
          q: "Mutanga amahugurwa yo kuri interineti?",
          a: "Yego. Amahugurwa yacu atangwa imbonankubone i Nyange no kuri interineti binyuze mu masomo ya live n'ibikoresho byo gusubiramo.",
        },
        {
          q: "Serivisi zanyu zigura gute?",
          a: "Igiciro kigenwa hashingiwe ku bunini bw'umushinga n'ibisabwa. Dufite ibiciro byoroheye ibigo bito, imiryango itegamiye kuri Leta, n'amashuri.",
        },
        {
          q: "Mutanga ubufasha nyuma y'uko umushinga urangiye?",
          a: "Yego. Buri mushinga ugira igihe cy'ubwishingizi n'amasezerano yo gukurikirana umutekano, kubika amakuru, no kongeramo ibishya.",
        },
        {
          q: "Niyandikisha nte mu mahugurwa?",
          a: "Jya mu gice cy'Amahugurwa, uhitemo ishami ushaka (Web Development, Advanced Laravel, cyangwa IT Support), maze wuzuze ifishi yo kwiyandikisha.",
        },
        {
          q: "Ni irihe koranabuhanga mukoresha?",
          a: "Dukoresha React, TypeScript, Next.js, Laravel, Node.js, Python, na Tailwind CSS hamwe na PostgreSQL, MySQL, Docker, na AWS.",
        },
        {
          q: "Mukorana n'abakiriya bo hanze y'u Rwanda?",
          a: "Yego. Dukorana n'ibigo byo muri Afurika y'Iburasirazuba, Uburayi, na Amerika y'Amajyaruguru binyuze mu ikoranabuhanga rya kure.",
        },
        {
          q: "Mwashyira uburyo bwo kwishyura bwa Mobile Money ku rubuga?",
          a: "Yego. Dushyira mu mbuga uburyo bwa MTN MoMo, Airtel Money, Flutterwave, na Stripe hamwe na raporo z'ubwishyu zihita zikora.",
        },
      ],
    },
    blog: {
      eyebrow: "Inyandiko z'Ikoranabuhanga",
      title: "Amakuru & Inyigisho",
      subtitle:
        "Ibitekerezo n'inama ku myubakire ya software, umutekano w'amakuru, na fintech mu Rwanda.",
      readArticle: "Soma Inyandiko",
      by: "Yanditswe na",
      closeArticle: "Funga Inyandiko",
      minRead: (minutes: number) => `Iminota ${minutes} yo gusoma`,
      wordsCount: (count: number) => `Amagambo ${count}`,
    },
    contact: {
      eyebrow: "Vugana Natwe",
      title: "Tangira Umushinga na fabu001",
      subtitle:
        "Dusangize igitekerezo cyawe cyangwa usabe inama y'uburyo twakubakira sisitemu.",
      deskEyebrow: "Ibiro bya Studio",
      deskTitle: "Nyange, Rwanda · Dukorera Isi Yose",
      deskDesc:
        "Tuboneka ku mishinga ya software yihariye, amahugurwa y'ibigo, n'ubujyanama mu ikoranabuhanga.",
      directLine: "Telefone",
      emailLabel: "Imeli",
      availabilityLabel: "Kuboneka",
      availabilityValue: "Twakira Imishinga ya Q4 / Q1",
      availabilityNote: "Dusubiza mu minota 5 mu masaha y'akazi",
      bookCall: "Fata Umwanya w'Ikiganiro",
      fullName: "Amazina Yuzuye",
      emailAddress: "Imeli",
      projectBrief: "Incicamake y'Umushinga",
      briefPlaceholder: "Muraho fabu001, mfite umushinga cyangwa ikibazo...",
      sendBrief: "Ohereza Ubutumwa",
      chatWhatsapp: "Ganira kuri WhatsApp",
      dispatchedTitle: "Ubutumwa Bwoherejwe",
      dispatchedDesc: (name: string, email: string) =>
        `Murakoze, ${name}. Ubutumwa bwawe bwakiriwe na fabu001 kandi tuzagusubiza kuri ${email} vuba.`,
      continueWhatsapp: "Komeza kuri WhatsApp",
      sendAnother: "Ohereza Ubundi Butumwa",
      errName: "Nyamuneka andika amazina yawe yuzuye.",
      errEmail: "Nyamuneka andika imeli yemewe.",
      errMsg: "Nyamuneka sobanura muri make umushinga cyangwa icyo ukeneye.",
    },
    footer: {
      bio: "Ikigo cyubaka Software kikanatanga Amahugurwa ya IT giherereye i Nyange, mu Rwanda.",
      rights: "Uburenganzira bwose burarinzwe.",
      location: "Nyange, Rwanda",
      newsletterEyebrow: "Ikinyamakuru",
      newsletterTitle: "Amakuru y'Ikoranabuhanga n'Amahugurwa",
      newsletterDesc:
        "Akira buri kwezi amakuru ku mishinga mishya, amasomo afunguye, n'inyobora za tekiniki.",
      newsletterPlaceholder: "izina@ikigo.com",
      subscribe: "Iyandikishe",
      subscribeAnother: "Iyandikishe indi imeli",
      newsletterEmptyErr: "Nyamuneka andika imeli yawe.",
      newsletterInvalidErr:
        "Nyamuneka andika imeli yemewe (urugero: izina@ikigo.com).",
      newsletterSuccess:
        "Wiyandikishije kubona amakuru ya fabu001 n'amahugurwa.",
      newsletterDuplicate:
        "Iyi imeli isanzwe yiyandikishije kuri fabu001.",
    },
    support: {
      title: "Ubufasha bwa fabu001",
      status: "Turaboneka · Igisubizo mu minota 5",
      prompt: "Hitamo uburyo bwo gutangira ikiganiro cyangwa kohereza ubutumwa:",
      startWhatsapp: "Tangira kuri WhatsApp",
      quickChat: "Ikiganiro Cyihuse",
      quickChatDesc: "Ikibazo rusange",
      hireStudio: "Duhe Akazi",
      hireStudioDesc: "Tangira kubaka software",
      bookMeeting: "Fata Inama",
      bookMeetingDesc: "Gena umwanya wo kuganira",
    },
    search: {
      placeholder: "Shakisha serivisi, amasomo, blog...",
      ariaLabel: "Shakisha serivisi, amahugurwa, inyandiko za blog, n'imishinga",
      openSearch: "Shakisha ku rubuga",
      clear: "Siba ishakiro",
      resultsLabel: "Ibisubizo by'ishakiro",
      allTab: "Byose",
      servicesGroup: "Serivisi",
      trainingGroup: "Amahugurwa",
      blogGroup: "Blog",
      projectsGroup: "Imishinga",
      quickJump: "Guhita Ubona",
      matchesCount: (count: number) => `Ibisubizo ${count}`,
      emptyTitle: (q: string) => `Nta bisubizo bibonetse kuri “${q}”`,
      emptyHint: "Gerageza nka Web Development, Laravel, IT Support, cyangwa Fintech.",
      reset: "Siba ishakiro",
      keyboardHint: "↑↓ hitamo · Enter fungura · Esc funga",
    },
  },
} as const;

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (typeof TRANSLATIONS)[Language];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANG_STORAGE_KEY = "fabu001_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      return saved === "rw" ? "rw" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage error
    }
  }, [lang]);

  const setLang = (next: Language) => setLangState(next);
  const toggleLang = () => setLangState((prev) => (prev === "en" ? "rw" : "en"));

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t: TRANSLATIONS[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
