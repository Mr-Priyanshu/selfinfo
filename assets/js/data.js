/* -------------------------------------------------------------
 * Priyanshu Garg Developer Portfolio - Data Provider v2.0
 * ------------------------------------------------------------- */

export const RESUME_DATA = {
  profile: {
    name: "Priyanshu Garg",
    role: "Senior Software Developer | Full-Stack Developer",
    email: "impriyanshu.garg@gmail.com",
    phone: "70474-90032",
    location: "Jabalpur, MP, India",
    linkedin: "linkedin.com/in/priyanshu-garg-software-engineer",
    github: "github.com/Mr-Priyanshu",
    summary: "Full-Stack Developer with 3+ years of experience building and automating web platforms across MERN, WordPress, and Shopify. Currently building a unified social-media ad management platform integrating Meta, Google Ads, LinkedIn, YouTube, and WhatsApp Business APIs. Proven track record integrating third-party APIs to cut manual workload by 50% and resolving 30+ critical production bugs to improve platform stability. Strong foundation in MySQL/PostgreSQL database design and REST/GraphQL API development, with a focus on delivering measurable efficiency gains for business operations."
  },
  
  experience: [
    {
      role: "Senior Software Developer",
      company: "White Force Infosystem",
      location: "Jabalpur",
      period: "March 2026 – Present",
      highlights: [
        "Developing Whiteforce Ad Manager, a MERN-based platform that centralizes ad campaign management across Meta (Facebook/Instagram), Google Ads, LinkedIn, YouTube, and WhatsApp into a single dashboard.",
        "Integrated Meta Ads API to create, launch, and monitor ad campaigns, track campaign performance and lead data, and route leads to the appropriate sales team members.",
        "Built Google Ads and YouTube Ads integrations to pull campaign performance, lead, and ad revenue data directly into the platform for real-time reporting.",
        "Developed LinkedIn integration enabling ad campaign creation, post management, and city-wise campaign targeting and performance tracking.",
        "Engineered WhatsApp Business API integration to manage multiple WhatsApp accounts, run WhatsApp ad campaigns, and support bulk SMS messaging with reusable, editable message templates."
      ]
    },
    {
      role: "Full-Stack Developer",
      company: "DOAGuru InfoSystems",
      location: "Jabalpur",
      period: "2023 – March 2026",
      highlights: [
        "Built scalable referral systems and eCommerce platforms, and developed internal automation tools that streamlined recurring business workflows.",
        "Diagnosed and resolved 30+ critical bugs across Dental Guru Software (Pro & Lite), improving application stability and overall performance.",
        "Integrated Meta API to automate lead data processing end-to-end, cutting manual data-entry effort by 50% and accelerating lead response time.",
        "Recognized by leadership for debugging and optimization expertise, consistently ensuring reliable data flow across automated workflows."
      ]
    },
    {
      role: "Software Developer",
      company: "Engineering Innovation",
      location: "Jabalpur",
      period: "2022 – 2023",
      highlights: [
        "Led the SRS team, owning project documentation and serving as primary point of contact for client communication.",
        "Transitioned into frontend development and redesigned the UI for Gosavvy Management, a loan servicing platform, improving usability.",
        "Improved project documentation accuracy by 40% and streamlined client feedback cycles, reducing revision turnaround time."
      ]
    }
  ],

  projects: [
    {
      title: "CLMS (Meta API Integration)",
      description: "Built an automated Meta Ads lead-fetching system using React and Node.js, eliminating manual lead exports for clients.",
      tags: ["React.js", "Node.js", "Express.js", "Meta API", "Automation"],
      category: "Full-Stack & APIs",
      icon: "fa-solid fa-server"
    },
    {
      title: "Fashion Shopping Website",
      description: "Designed a fully responsive eCommerce UI with React and Tailwind CSS, optimized for mobile-first browsing.",
      tags: ["React.js", "Tailwind CSS", "MUI", "UI/UX"],
      category: "Frontend",
      icon: "fa-solid fa-bag-shopping"
    },
    {
      title: "Affiliate Marketing Application",
      description: "Developed a scalable affiliate-tracking system to support business promotion and partner payouts.",
      tags: ["Node.js", "MySQL", "REST API", "Full-Stack"],
      category: "Full-Stack & APIs",
      icon: "fa-solid fa-share-nodes"
    },
    {
      title: "Static Portfolio Website & Binary Converter Tool",
      description: "Built JavaScript-based utility tools for personal and client use.",
      tags: ["JavaScript", "HTML5", "CSS3", "GSAP"],
      category: "Utility & Creative",
      icon: "fa-solid fa-screwdriver-wrench"
    }
  ],

  skills: [
    {
      category: "Full Stack (MERN)",
      list: [
        { name: "React.js", icon: "fa-brands fa-react" },
        { name: "Node.js", icon: "fa-brands fa-node-js" },
        { name: "Express.js", icon: "fa-solid fa-code" },
        { name: "MongoDB", icon: "fa-solid fa-database" }
      ]
    },
    {
      category: "Web Development",
      list: [
        { name: "WordPress", icon: "fa-brands fa-wordpress" },
        { name: "Shopify", icon: "fa-brands fa-shopify" },
        { name: "WordPress Plugin Dev", icon: "fa-solid fa-puzzle-piece" },
        { name: "Tailwind CSS", icon: "fa-brands fa-css3-alt" },
        { name: "Bootstrap / MUI", icon: "fa-brands fa-bootstrap" },
        { name: "GSAP", icon: "fa-solid fa-wand-magic-sparkles" }
      ]
    },
    {
      category: "Databases",
      list: [
        { name: "MySQL", icon: "fa-solid fa-table" },
        { name: "PostgreSQL", icon: "fa-solid fa-table-list" }
      ]
    },
    {
      category: "APIs & Automation",
      list: [
        { name: "REST APIs", icon: "fa-solid fa-link" },
        { name: "GraphQL", icon: "fa-solid fa-network-wired" },
        { name: "Meta API", icon: "fa-brands fa-meta" },
        { name: "n8n Workflow Automation", icon: "fa-solid fa-gears" }
      ]
    },
    {
      category: "DevOps & Version Control",
      list: [
        { name: "Docker", icon: "fa-brands fa-docker" },
        { name: "Linux", icon: "fa-brands fa-linux" },
        { name: "Cloud Hosting", icon: "fa-solid fa-cloud" },
        { name: "cPanel", icon: "fa-solid fa-server" },
        { name: "Git & GitHub", icon: "fa-brands fa-github" }
      ]
    }
  ],

  achievements: [
    {
      metric: "50%",
      label: "Workload Reduction",
      description: "Programmed API automations (Meta Lead API) that cut manual data transfer administrative workloads in half."
    },
    {
      metric: "30+",
      label: "Production Bugs Solved",
      description: "Diagnosed and resolved critical logic and data flow issues across Dental Guru Software products to restore stability."
    },
    {
      metric: "40%",
      label: "Documentation Efficiency",
      description: "Optimized software requirements specifications (SRS) and feedback cycles, boosting turnaround speeds by 40%."
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "Gyan Ganga Institute of Technology & Science, Jabalpur (RGPV)",
      year: "2023",
      score: "CGPA: 8.36"
    },
    {
      degree: "Diploma in Computer Science Engineering",
      institution: "Govt. Polytechnic College Dindori (RGPV)",
      year: "2020",
      score: "CGPA: 7.21"
    }
  ],

  certifications: [
    "Project Management",
    "Google Ads",
    "Web Development",
    "Cyber Security",
    "AWS EC2 VM",
    "Core Java",
    "JavaScript",
    "Cisco Data Fundamentals of Communication"
  ],

  languages: [
    "Hindi",
    "English"
  ]
};
