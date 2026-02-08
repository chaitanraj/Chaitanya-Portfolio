export const personalInfo = {
    name: "Chaitanya Raj",
    title: "Full Stack AI Software Engineer",
    subtitle: "MERN • PERN • AI/ML",
    email: "chaitanya21.raj@gmail.com",
    phone: "6206116770",
    github: "chaitanraj",
    linkedin: "Chaitanya Raj",
    location: "Greater Noida, India",
    resumeUrl: "/resume.pdf",
};

export const terminalLines = [
    "> Hello, I'm Chaitanya Raj",
    "> Full Stack AI Software Engineer",
    "> Building scalable MERN/PERN apps + AI systems",
    "> Deploying Dockerized services & low-latency APIs (<1s)",
    "> Scroll to explore my work...",
];

export const aboutText = `Full Stack - AI Developer focused on building scalable, real-world web applications with clean UI and strong backend architecture. Mainly working with React, Next.js, Node.js, Express, MongoDB, and PostgreSQL, while also integrating AI/ML to build smarter products.

Focused on writing maintainable code, optimizing performance, and shipping production-ready features. Experience includes AI-powered analytics, anomaly detection systems, and Docker-based deployment workflows.`;



export const techStack = {
    languages: [
        { name: "Java", level: "Intermediate" },
        { name: "JavaScript", level: "Strong" },
        { name: "Python", level: "Strong" },
        { name: "TypeScript", level: "Strong" },
        { name: "HTML", level: "Strong" },
        { name: "CSS", level: "Strong" },
    ],
    frameworks: [
        { name: "React.js", level: "Strong" },
        { name: "Next.js", level: "Strong" },
        { name: "Node.js", level: "Strong" },
        { name: "Express.js", level: "Strong" },
        { name: "Flask", level: "Intermediate" },
        { name: "Tailwind CSS", level: "Strong" },
    ],
    databases: [
        { name: "MongoDB", level: "Strong" },
        { name: "PostgreSQL", level: "Strong" },
        { name: "MySQL", level: "Intermediate" },
        { name: "Prisma ORM", level: "Strong" },
        { name: "Sequelize ORM", level: "Intermediate" },
    ],
    aiml: [
        { name: "Prophet", level: "Intermediate" },
        { name: "pandas", level: "Strong" },
        { name: "NumPy", level: "Strong" },
        { name: "Isolation Forest", level: "Intermediate" },
    ],
    devops: [
        { name: "Docker", level: "Strong" },
        { name: "Docker Compose", level: "Strong" },
        { name: "Git", level: "Strong" },
        { name: "GitHub", level: "Strong" },
        { name: "Render", level: "Intermediate" },
        { name: "Vercel", level: "Strong" },
    ],
    others: [
        { name: "REST APIs", level: "Strong" },
        { name: "Async/Await", level: "Strong" },
        { name: "Routing", level: "Strong" },
        { name: "Chrome Extensions", level: "Intermediate" },
    ],
};

export const orbitTechs = [
    { name: "React", icon: "react", description: "UI library for modern apps" },
    { name: "Node.js", icon: "nodejs", description: "JavaScript runtime for backend" },
    { name: "MongoDB", icon: "database", description: "NoSQL document database" },
    { name: "PostgreSQL", icon: "database", description: "Powerful relational database" },
    { name: "Docker", icon: "container", description: "Containerization platform" },
    { name: "Next.js", icon: "nextjs", description: "React framework for production" },
    { name: "Tailwind", icon: "palette", description: "Utility-first CSS framework" },
    { name: "Python", icon: "code", description: "AI/ML & scripting language" },
    { name: "TypeScript", icon: "braces", description: "Typed JavaScript superset" },
];

export const projects = [
    {
        title: "FinSight-AI",
        description: "Full-stack AI finance platform featuring automated expense tracking, predictive spending analytics, and anomaly detection with ~90% categorization accuracy.",
        image: "/projects/finsight.png",
        bullets: [
            "Automated expense categorization with ML",
            "Sub-second inference latency (<1s)",
            "Behavior-based anomaly detection (3× fewer false alerts)",
            "Dockerized AI services for rapid deployment",
        ],
        tech: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Python", "Flask", "Docker", "Docker Compose", "Railway", "Vercel"],
        github: "https://github.com/chaitanraj/FinSight-AI",
        live: "https://usefinsightai.vercel.app/",
    },
    {
        title: "Buddy",
        description: "High-concurrency MERN ride-sharing app with custom matching algorithm and real-time GPS tracking for 300+ active users.",
        image: "/projects/buddy.png",
        bullets: [
            "Real-time ride matching + messaging",
            "Reduced confirmation time from 2 min to <30 sec",
            "Ride history + 1-click rescheduling",
            "Docker Compose based deployment workflow",
        ],
        tech: ["React.js", "CSS", "Docker", "Docker Compose", "Node.js", "Express", "MongoDB", "Render", "Vercel"],
        github: "https://github.com/chaitanraj/BUDDY-main",
        live: "https://buddy-ride.vercel.app/",
    },
    {
        title: "AgriConnect",
        description: "AI-driven agricultural analytics suite using MERN + Flask to process 1,000+ daily field images and deliver intelligent irrigation insights.",
        image: "/projects/agriconnect.png",
        bullets: [
            "Vision Transformer + Gaussian Process model (87% accuracy)",
            "EVPI/EVPPI decision framework for irrigation recommendations",
            "Geospatial crop monitoring across 500+ acres",
            "Automated PDF reporting replacing manual analysis",
        ],
        tech: ["React.js", "CSS", "Node.js", "Flask", "Express", "MongoDB", "Framer Motion"],
        github: "https://github.com/chaitanraj/AgriConnect_SIH2025",
        live: "https://useagriconnect.vercel.app/",
    },
];

export const experience = [
    {
        company: "Ignou Tutor",
        role: "Node.js Developer Intern",
        duration: "Dec 2025 – Present",
        bullets: [
            "Assisted in backend development using Node.js, Express.js, and TypeScript with a MySQL database.",
            "Developed and maintained RESTful APIs and integrated backend services with databases.",
            "Contributed to feature development, bug fixes, and performance optimizations.",
            "Followed coding standards, documentation practices, and security guidelines.",
            "Collaborated with the core engineering team and participated in code reviews and technical discussions.",
        ],
    },
];

export const education = {
    university: "Bennett University, Greater Noida",
    degree: "B.Tech in Computer Science",
    year: "(2027)",
    gpa: "8.20 (current)",
};

export const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Stack", href: "#stack" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

export const contactText = `I'm currently looking for internship and full-time opportunities where I can contribute as a Full Stack Developer and grow by working on real-world products. If you're looking for someone who can build complete applications with clean code, strong logic, and scalable architecture — let's connect.`;
