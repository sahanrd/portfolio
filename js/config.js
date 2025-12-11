// ============================================
// CONFIGURATION & DATA
// ============================================

const CONFIG = {
    email: {
        enabled: true,
        serviceId: 'service_3ycwuw8',
        templateId: 'template_0okcrno',
        publicKey: 'Q8e0ljAPdkxSMcqYH'
    },
    starfield: {
        particleCount: window.innerWidth < 768 ? 1000 : 2500,
        mouseInfluence: 0.0003
    },
    animations: {
        duration: 0.8,
        stagger: 0.1
    }
};

const skills = {
    technical: [
        { name: "HTML5", icon: "fab fa-html5" },
        { name: "CSS3", icon: "fab fa-css3-alt" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "C++", icon: "fas fa-code" },
        { name: "Java", icon: "fab fa-java" },
        { name: "PHP", icon: "fab fa-php" },
        { name: "MySQL", icon: "fas fa-database" },
        { name: "Arduino", icon: "fas fa-microchip" },
        { name: "Firebase", icon: "fas fa-fire" },
        { name: "React", icon: "fab fa-react" }
    ],
    creative: [
        { name: "Graphic Design", icon: "fas fa-paint-brush" },
        { name: "Digital Marketing", icon: "fas fa-chart-line" },
        { name: "UI/UX Design", icon: "fas fa-palette" },
        { name: "Adobe Suite", icon: "fas fa-desktop" },
        { name: "Figma", icon: "fab fa-figma" },
        { name: "Brand Identity", icon: "fas fa-bullseye" },
        { name: "Meta Ads", icon: "fab fa-facebook-f" }
    ]
};

const projects = [
    {
        id: 1,
        title: "Smart Parking System",
        category: "hardware",
        description: "Hardware-based automated parking solution designed to monitor vehicle availability and control entry using sensors and microcontrollers. The system uses ultrasonic sensors to detect parking slot occupancy, a servo-controlled barrier gate for vehicle access.",
        technologies: ["Arduino", "IoT", "Sensors", "Servo", "Firebase"],
        image: "assets/images/projects/Smart-Parking System.jpg",
        liveLink: "#",
        githubLink: "https://github.com/sahanrd/Smart-Parking-System.git",
        featured: true
    },
    {
        id: 2,
        title: "Design Highlight",
        category: "graphic",
        description: "Showcasing creative design projects in branding, social media, posters, logos, and promotional graphics, crafted with focus on layout, color, and typography for visually impactful results.",
        technologies: ["Photoshop", "Illustrator", "Figma", "Canva"],
        image: "assets/images/projects/design-highlight.jpg",
        liveLink: "https://drive.google.com/drive/folders/1PevLCygVuxTt0h39mbcucYVZDRO1djOq?usp=sharing",
        githubLink: "#",
        featured: true
    },
    {
        id: 3,
        title: "Personal Portfolio",
        category: "web",
        description: "Interactive portfolio website with Three.js starfield animations and GSAP scroll-triggered effects.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Three.js", "GSAP"],
        image: "assets/images/projects/sahan-portfolio.jpg",
        liveLink: "#",
        githubLink: "https://github.com/sahanrd/portfolio.git",
        featured: true
    },
    {
        id: 4,
        title: "CashDash",
        category: "software",
        description: "CashDash is a sleek, lightweight Java app that makes tracking your income and expenses effortless with a clean, modern Swing-based UI",
        technologies: ["Java"],
        image: "assets/images/projects/CashDash.jpg",
        liveLink: "#",
        githubLink: "https://github.com/sahanrd/CashDash.git",
        featured: true
    },
    {
        id: 5,
        title: "QuickCarz",
        category: "web",
        description: "The Online Vehicle Rental System is a smart web app that makes renting vehicles simple—browse, book, and manage rentals effortlessly, while owners handle vehicles and payments with ease.",
        technologies: ["HTML5", "CSS3", "JavaScript", "MySQL", "PHP"],
        image: "assets/images/projects/QuickCarz.jpg",
        liveLink: "#",
        githubLink: "https://github.com/sahanrd/QuickCarz.git",
        featured: false
    },
    {
        id: 6,
        title: "Digital Marketing Campaign",
        category: "graphic",
        description: "Complete digital marketing strategy with social media graphics, ads, and analytics tracking.",
        technologies: ["Content", "Meta Ads", "Analytics", "Strategy", "SEO", "Social Media"],
        image: "assets/images/projects/marketing.jpg",
        liveLink: "#",
        githubLink: "#",
        featured: false
    }
];

const timelineData = [
    {
        id: 1,
        year: "2024 - Present",
        yearNumber: 2024,
        title: "Computer Engineering Undergraduate",
        subtitle: "General Sir John Kotelawala Defence University",
        description: "Currently pursuing degree in Computer Engineering with focus on hardware-software integration, embedded systems, and digital design.",
        icon: "fas fa-graduation-cap",
        tags: ["Embedded Systems", "Digital Logic", "Architecture", "Algorithms", "Electronics", "Programming"]
    },
    {
        id: 2,
        year: "2022 - Present",
        yearNumber: 2022,
        title: "Professional Graphic Designer & Digital Marketer",
        subtitle: "Freelance",
        description: "Providing graphic design and digital marketing services to various clients, creating brand identities, marketing materials, and UI/UX designs.",
        icon: "fas fa-paint-brush",
        tags: ["Brand Identity", "Digital Marketing", "UI/UX", "Canva", "Adobe Suite", "Analytics", "Strategy", "Meta Ads"]
    },
    {
        id: 3,
        year: "2025",
        yearNumber: 2025,
        title: "CCNA: Introduction to Networks",
        subtitle: "Cisco Networking Academy",
        description: "Gained foundational networking knowledge, including network architecture, IP addressing, routing basics, protocols, and hands-on configuration of routers and switches. Built strong skills in troubleshooting and understanding how modern networks operate.",
        icon: "fas fa-graduation-cap",
        tags: ["Cisco", "NetaCad", "Packet Tracer"]
    },
    {
        id: 4,
        year: "2024",
        yearNumber: 2024,
        title: "Digital Marketing Certification",
        subtitle: "Simplebooks (Pvt) Limited",
        description: "Completed comprehensive training in SEO, Social Media Marketing, Meta Ads, Content Creation, and Analytics. Gained hands-on experience in optimizing online visibility, managing ad campaigns, creating impactful content, and using data insights to improve digital performance.",
        icon: "fas fa-graduation-cap",
        tags: ["SEO", "Social Media", "Meta Ads", "Content", "Analytics"]
    },
    {
        id: 5,
        year: "2023",
        yearNumber: 2023,
        title: "GCE Advanced Level",
        subtitle: "Kingswood College, Kandy",
        description: "Completed the Mathematics stream with a strong foundation in Pure Mathematics, Applied Mathematics, Physics, and Chemistry. Built strong analytical and problem-solving skills, along with a deep understanding of scientific and mathematical concepts relevant to engineering, technology.",
        icon: "fas fa-graduation-cap",
        tags: ["Combined Maths", "Physics", "Chemistry"]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, skills, projects, timelineData };
}