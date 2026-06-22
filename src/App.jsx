import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  Users,
  X,
} from 'lucide-react';
import Background3D from './components/Background3D';
import SkillsUniverse from './components/SkillsUniverse';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const EDUCATION_DATA = [
  {
    id: 1,
    degree: 'B.Tech Computer Science & Business Systems',
    school: 'K.S. Rangasamy College of Technology, Namakkal, Tamil Nadu',
    duration: '2024 - 2028',
    grade: 'CGPA: 8.1',
    desc: 'A focused program combining core computer science, algorithms, databases, service science, and business systems thinking.',
  },
  {
    id: 2,
    degree: 'Higher Secondary Certificate',
    school: 'Vanmathi Matric Hr. Sec. School, Kallakurichi, Tamil Nadu',
    duration: '2023 - 2024',
    grade: 'Score: 74%',
    desc: 'Studied mathematics, physics, chemistry, and computer science with a strong foundation for engineering work.',
  },
  {
    id: 3,
    degree: 'Secondary School Leaving Certificate',
    school: 'Government Hr. Sec. School, Sellampattu, Kallakurichi, Tamil Nadu',
    duration: '2021 - 2022',
    grade: 'Score: 71%',
    desc: 'Built early interest in science, computing, community activities, and practical problem solving.',
  },
];

const EXPERIENCE_DATA = [
  {
    id: 1,
    role: 'Tech Associate Internship',
    company: 'SiDRA Hub, Inaiyam Innovations',
    duration: 'Dec 2025 – Feb 2026',
    type: 'On-site',
    pdf: '/cert-sidra.pdf',
    summary:
      'Completed an on-site internship working on real-time AgriTech projects focused on digital agriculture and data-driven advisory systems.',
    details: [
      'Actively contributed to field coordination, system implementation, and community engagement to support farmers.',
      'Helped design architecture for crop disease classification and location-aware advisory workflows.',
      'Worked with field coordinators to understand practical farmer deployment constraints.',
      'Gained experience solving real-world problems in a collaborative, live project environment.',
    ],
    skills: ['React.js', 'Node.js', 'CNN Models', 'Geolocation', 'AgriTech'],
  },
  {
    id: 2,
    role: 'Celonis Process Mining Virtual Internship',
    company: 'EduSkills',
    duration: 'July 2025 – Sept 2024',
    type: 'Virtual',
    pdf: '/cert-eduskills.pdf',
    summary:
      'Completed hands-on training in process mining techniques, focusing on analyzing and optimizing business processes using event logs.',
    details: [
      'Gained experience in process discovery, conformance checking, and performance analysis.',
      'Applied data preprocessing and visualization methods to identify inefficiencies.',
      'Used industry tools to improve workflow optimization strategies.',
      'Suggested workflow improvements based on diagnostic event-log results.',
    ],
    skills: ['Process Mining', 'Celonis Studio', 'Data Preprocessing', 'Workflow Analysis'],
  },
];

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'AI Code Visualizer',
    category: 'MERN Full Stack',
    duration: '2025',
    tagline: 'Step-by-step algorithm execution visualized with AI support.',
    desc:
      'A full-stack web application using MongoDB, Express.js, React.js, and Node.js to visualize code execution step-by-step with AI-based analysis.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Gemini API'],
    highlights: [
      'Built step-by-step logical state tracking for code execution.',
      'Integrated AI-based logic to analyze and represent algorithms dynamically.',
      'Implemented user-friendly interfaces with real-time code rendering.',
      'Created interactive visualizations to enhance understanding of programming concepts.',
    ],
    link: 'https://github.com/balasankaran4/Ai-Code-Visuallizer',
  },
  {
    id: 2,
    title: 'AR-Based Crop Advisory System',
    category: 'AR and CNN AI',
    duration: '2025 – 2026',
    tagline: 'Crop diagnosis and localized recommendations through AR.',
    desc:
      'An augmented reality-based application to provide real-time crop advisory solutions using CNN for disease detection and geolocation for recommendations.',
    tech: ['Unity 3D', 'C#', 'Python', 'TensorFlow', 'Geolocation', 'IEEE'],
    highlights: [
      'Utilized Convolutional Neural Networks (CNN) for crop disease detection.',
      'Integrated geolocation algorithms for location-based crop recommendations.',
      'Implemented interactive AR features to enhance user experience for farmers.',
      'Presented at IEEE 4th International Conference (AIMLA 2026).',
    ],
    link: 'https://github.com/balasankaran4/AR--Based-Smart-Crop-Advisory-System-Using-CNN-and-Geolocation-Algorithm-',
  },
  {
    id: 3,
    title: 'Bus Booking System',
    category: 'Full Stack Web Application',
    duration: '2024',
    tagline: 'Full-stack bus ticket booking with real-time seat availability.',
    desc:
      'A full-stack Bus Booking System using Java, HTML, CSS, JavaScript, and MySQL with user registration, seat booking, and ticket management.',
    tech: ['Java', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    highlights: [
      'Implemented user registration, login, bus search, and seat booking.',
      'Designed a responsive UI and integrated a MySQL database for data storage.',
      'Built backend modules for booking management and user authentication.',
      'Added real-time seat availability tracking across booking workflows.',
    ],
    link: 'https://github.com/balasankaran4',
  },
];

const CERTIFICATIONS_DATA = [
  {
    id: 1,
    title: 'Introduction to Industry 4.0 and Industrial Internet of Things',
    issuer: 'NPTEL',
    date: 'Oct 2025',
    tag: 'Elite + Silver',
    pdf: '/cert-industry4.pdf',
    desc:
      'Covered IoT sensors, industrial protocols, cloud architectures, cyber-physical systems, and smart factory analytics.',
  },
  {
    id: 2,
    title: 'Introduction to Internet of Things',
    issuer: 'NPTEL',
    date: 'Apr 2026',
    tag: 'Elite + Silver',
    pdf: '/cert-iot.pdf',
    desc:
      'Explored IoT device ecosystems, communication protocols, data handling, and connected device programming fundamentals.',
  },
  {
    id: 3,
    title: 'Digital Application Fundamentals - STEM',
    issuer: 'NASSCOM',
    date: 'April 2025',
    tag: 'STEM Certified',
    pdf: '/cert-nasscom.pdf',
    desc:
      'Validated foundational technology concepts, computational logic, data representation, and digital workflow skills.',
  },
  {
    id: 4,
    title: 'Best Social Worker Award',
    issuer: 'Atchatyam Trust',
    date: 'Mar 2026',
    tag: 'Community Honor',
    desc:
      'Recognized for community welfare work, local support drives, mentoring, and technology-assisted awareness work.',
  },
  {
    id: 5,
    title: 'AR–VR Bootcamp: Concepts, Tools & Application Development',
    issuer: 'VIT Vellore',
    date: 'Jan 2026',
    tag: 'Bootcamp',
    pdf: '/cert-arvr.pdf',
    desc:
      'Hands-on training in augmented and virtual reality concepts, tools, and application development at VIT Vellore.',
  },
  {
    id: 6,
    title: 'IEEE Conference Certificate of Participation',
    issuer: 'IEEE — AIMLA 2026',
    date: 'Feb 2026',
    tag: 'IEEE Certified',
    pdf: '/cert-ieee-participation.pdf',
    desc:
      'Awarded for participation in the 4th International Conference on AI & Machine Learning Applications (AIMLA 2026), organized under IEEE.',
  },
  {
    id: 7,
    title: 'IEEE Presenter Certificate',
    issuer: 'IEEE — AIMLA 2026',
    date: 'Feb 2026',
    tag: 'IEEE Presenter',
    pdf: '/cert-ieee-presenter.pdf',
    desc:
      'Recognized as a paper presenter at the IEEE AIMLA 2026 conference for the AR-Based Smart Crop Advisory System research paper.',
  },
];

const CODING_PROFILES = [
  {
    platform: 'LeetCode',
    username: 'Balasankaran004',
    stat: '15+ Days Coding Streak',
    desc: 'Active problem solver practicing arrays, strings, trees, dynamic programming, and interview-focused challenges.',
    link: 'https://leetcode.com/u/Balasankaran004',
  },
  {
    platform: 'GitHub',
    username: 'balasankaran4',
    stat: '200+ Contributions',
    desc: 'Multiple deployed projects — MERN apps, Unity scenes, AgriTech tools, and collaborative source repositories.',
    link: 'https://github.com/balasankaran4',
  },
  {
    platform: 'LinkedIn',
    username: 'Balasankaran B',
    stat: 'Professional profile',
    desc: 'Shares project progress, internship experience, certifications, and AgriTech and process mining updates.',
    link: 'https://linkedin.com/in/balasankaran-b-020a96329',
  },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/balasankaran4', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/balasankaran-b-020a96329', icon: Linkedin },
  { label: 'Email', href: 'mailto:bsankaran80@gmail.com', icon: Mail },
];



function AnimatedSection({ id, kicker, title, children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'center 52%', 'end 8%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.86, 1], [0.32, 1, 1, 0.72]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section-shell ${className}`}
      style={{ opacity }}
    >
      {(kicker || title) && (
        <div className="section-header">
          {kicker && <span className="section-kicker">{kicker}</span>}
          {title && <h2>{title}</h2>}
        </div>
      )}
      {children}
    </motion.section>
  );
}

function ScrollCard({ children, className = '', index = 0, onClick, asButton = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'center 62%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.58, 1], [0.5, 0.92, 1]);
  const Component = asButton ? motion.button : motion.article;

  return (
    <Component
      ref={ref}
      className={`scroll-card ${className}`}
      onClick={onClick}
      style={{ opacity }}
      type={asButton ? 'button' : undefined}
    >
      {children}
    </Component>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function DetailModal({ title, eyebrow, children, onClose }) {
  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.article
        className="detail-modal"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: 30, rotateX: 6 }}
        transition={{ type: 'spring', stiffness: 190, damping: 24 }}
      >
        <div className="modal-title-row">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h3>{title}</h3>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close details">
            <X size={18} />
          </button>
        </div>
        {children}
      </motion.article>
    </motion.div>
  );
}

function PdfViewerModal({ title, pdfUrl, onClose }) {
  return (
    <motion.div
      className="modal-backdrop pdf-viewer-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="pdf-viewer-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
      >
        <div className="pdf-viewer-header">
          <span className="pdf-viewer-title">{title}</span>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close viewer">
            <X size={18} />
          </button>
        </div>
        <div className="pdf-viewer-body">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            title={title}
            className="pdf-iframe"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function TagList({ tags }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scrollScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.78, 1], [1, 1, 0.78]);
  const heroY = useTransform(heroScroll, [0, 0.78, 1], [0, 0, -44]);
  const heroRotateX = useTransform(heroScroll, [0, 0.78, 1], [0, 0, -3]);
  const heroScale = useTransform(heroScroll, [0, 0.78, 1], [1, 1, 0.985]);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeExperience, setActiveExperience] = useState(null);
  const [theme, setTheme] = useState('light');
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ status: 'idle', message: '' });
  const [pdfViewer, setPdfViewer] = useState(null); // { title, url }
  const [showResearch, setShowResearch] = useState(false);

  const navItems = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'education', 'skills', 'experience', 'projects', 'research', 'certifications', 'volunteering', 'coding', 'contact'];

    const handleScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        if (probe >= element.offsetTop && probe < element.offsetTop + element.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playClick = () => {
    if (window.playHoloSfx) window.playHoloSfx('click');
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    playClick();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus({ status: 'error', message: 'Please fill in your name, email, and message.' });
      return;
    }

    playClick();

    const subject = encodeURIComponent(
      formState.subject ? formState.subject : 'Portfolio Contact'
    );
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );

    // Opens the visitor's email client (Gmail/Outlook etc.) pre-filled — lands in your inbox.
    window.open(`mailto:bsankaran80@gmail.com?subject=${subject}&body=${body}`, '_blank');

    setFormStatus({
      status: 'success',
      message: 'Your email client opened with the message ready. Just hit Send!',
    });
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  const triggerPrintResume = () => {
    playClick();
    window.print();
  };

  return (
    <>
      <Background3D />
      <motion.div className="scroll-progress" style={{ scaleX: scrollScale }} />

      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#hero" onClick={handleNavClick}>
          <span className="brand-symbol">BB</span>
          <span>Balasankaran B</span>
        </a>

        <div className="nav-links" aria-label="Section links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            onClick={() => {
              setTheme((current) => (current === 'light' ? 'dark' : 'light'));
              playClick();
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            className="icon-button mobile-only"
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.aside
              className="mobile-menu"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <span>Navigation</span>
                <button className="icon-button" type="button" aria-label="Close navigation" onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={handleNavClick}>
                  {item.label}
                </a>
              ))}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <motion.section
          ref={heroRef}
          id="hero"
          className="hero-section"
          style={{ opacity: heroOpacity, y: heroY, rotateX: heroRotateX, scale: heroScale, transformPerspective: 1200 }}
        >
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 48, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-kicker">Computer Science and Business Systems</span>
            <h1>Balasankaran B</h1>
            <p>
              I build web, AI, and AgriTech systems with clear interfaces, practical engineering, and a strong interest in visual learning tools.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#projects" onClick={handleNavClick}>
                <Code2 size={18} />
                View projects
              </a>
              <a
                className="secondary-button"
                href="/resume.pdf"
                download="Balasankaran_B_Resume.pdf"
              >
                <Download size={18} />
                Download resume
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 70, rotateY: -16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-visual-stack">
              <div className="portrait-stage" aria-label="Profile visual">
                <img src="/avatar.png" alt="Balasankaran B" />
                <div className="orbit-line one" />
                <div className="orbit-line two" />
              </div>
            </div>
            <div className="hero-data-strip">
              <StatCard value="8.1" label="CGPA" />
              <StatCard value="3+" label="Major projects" />
              <StatCard value="2" label="Internships" />
            </div>
          </motion.div>
        </motion.section>

        <AnimatedSection id="about" kicker="Profile" title="A practical builder with visual-first thinking">
          <div className="about-grid">
            <article className="text-panel">
              <p>
                I am a Computer Science and Business Systems student at K.S. Rangasamy College of Technology. My work sits across full-stack development, process mining, AI models, AR interfaces, and community-focused technology.
              </p>
              <p>
                I like projects where the interface makes complex ideas easier to understand. That shows up in algorithm visualizers, crop advisory systems, dashboards, research presentations, and educational content.
              </p>
              <div className="inline-contact">
                <a href="mailto:bsankaran80@gmail.com">
                  <Mail size={17} />
                  bsankaran80@gmail.com
                </a>
                <a href="tel:+919786065407">
                  <Phone size={17} />
                  +91 9786065407
                </a>
                <span>
                  <MapPin size={17} />
                  Kallakurichi, Tamil Nadu
                </span>
              </div>
            </article>

            <div className="focus-grid">
              {[
                ['Full-stack systems', 'React, Node.js, databases, and user-centered project flows.'],
                ['AI and AgriTech', 'Crop disease classification, geolocation logic, and field workflows.'],
                ['Creative execution', 'Video editing, poster design, and technical storytelling for teams.'],
                ['Community work', 'Volunteer coordination and digital resources for local initiatives.'],
              ].map(([title, copy], index) => (
                <ScrollCard className="focus-card" key={title} index={index}>
                  <Sparkles size={18} />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </ScrollCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="education" kicker="Education" title="Learning path">
          <div className="timeline">
            {EDUCATION_DATA.map((item) => (
              <ScrollCard className="timeline-card" key={item.id} index={item.id}>
                <div className="timeline-icon">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <span className="eyebrow">{item.duration}</span>
                  <h3>{item.degree}</h3>
                  <p className="item-meta">{item.school}</p>
                  <strong>{item.grade}</strong>
                  <p>{item.desc}</p>
                </div>
              </ScrollCard>
            ))}
          </div>
        </AnimatedSection>

        <SkillsUniverse />

        <AnimatedSection id="experience" kicker="Experience" title="Professional practice">
          <div className="experience-grid">
            {EXPERIENCE_DATA.map((item) => (
              <ScrollCard
                className="experience-card"
                key={item.id}
                index={item.id}
              >
                <div className="card-icon">
                  <BriefcaseBusiness size={22} />
                </div>
                <span className="eyebrow">{item.duration}</span>
                <h3>{item.role}</h3>
                <p className="item-meta">{item.company}</p>
                <p>{item.summary}</p>
                <TagList tags={item.skills} />
                <button className="text-button" type="button" onClick={() => setActiveExperience(item)}>
                  Read contribution details
                  <ChevronRight size={16} />
                </button>
              </ScrollCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects" kicker="Selected work" title="Featured projects">
          <div className="project-grid">
            {PROJECTS_DATA.map((project, index) => (
              <ScrollCard
                className="project-card"
                key={project.id}
                index={index}
              >
                <div className="project-index">0{index + 1}</div>
                <span className="eyebrow">{project.category}</span>
                <h3>{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <p>{project.desc}</p>
                <TagList tags={project.tech.slice(0, 4)} />
                <div className="card-actions">
                  <button className="text-button" type="button" onClick={() => setActiveProject(project)}>
                    Details
                    <ChevronRight size={16} />
                  </button>
                  <a className="icon-link" href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.title} repository`}>
                    <ExternalLink size={17} />
                  </a>
                </div>
              </ScrollCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="research" kicker="Research" title="Conference and Publications">
          <ScrollCard className="wide-panel">
            <div className="card-icon">
              <BookOpen size={22} />
            </div>
            <div>
              <span className="eyebrow">IEEE AIMLA 2026 · Published</span>
              <h3>AR-Based Smart Crop Advisory System Using CNN and Geolocation Algorithms</h3>
              <p style={{ marginTop: '8px' }}>
                Combines AR interfaces, CNN-based crop diagnosis, and geolocation to deliver real-time agricultural advisory for farmers.
              </p>
              <TagList tags={['Unity 3D', 'ARCore', 'CNN', 'Geolocation', 'IEEE']} />
              <div className="card-actions" style={{ marginTop: '12px' }}>
                <button className="text-button" type="button" onClick={() => setShowResearch(true)}>
                  More Details
                  <ChevronRight size={16} />
                </button>
                <a className="icon-link" href="https://doi.org/10.1109/AIMLA67915.2026.11522553" target="_blank" rel="noreferrer" aria-label="Visit IEEE paper">
                  <ExternalLink size={17} />
                </a>
              </div>
            </div>
          </ScrollCard>
        </AnimatedSection>

        <AnimatedSection id="certifications" kicker="Recognition" title="Certifications and awards">
          <div className="achievement-grid">
            {CERTIFICATIONS_DATA.map((item) => (
              <ScrollCard className="achievement-card" key={item.id} index={item.id}>
                <Award size={22} />
                <span className="eyebrow">{item.date}</span>
                <h3>{item.title}</h3>
                <p className="item-meta">{item.issuer}</p>
                <strong>{item.tag}</strong>
                <p>{item.desc}</p>
                {item.pdf && (
                  <button
                    className="text-button cert-view-btn"
                    type="button"
                    onClick={() => setPdfViewer({ title: item.title, url: item.pdf })}
                  >
                    View Certificate
                    <ExternalLink size={14} />
                  </button>
                )}
              </ScrollCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="volunteering" kicker="Community" title="Volunteering and creative work">
          <div className="split-grid">
            <ScrollCard className="text-panel">
              <Users size={24} />
              <h3>Talent Quest for India (TQI)</h3>
              <p>
                Mentored students from Grades 9–12 through school-based cluster classes and motivational sessions. Provided phone mentoring to students from Grades 6–12 on academic guidance, career awareness, and personal development.
              </p>
            </ScrollCard>
            <ScrollCard className="text-panel" index={1}>
              <Code2 size={24} />
              <h3>Service Motto Volunteers (SMV)</h3>
              <p>
                Lead and coordinate the media team for volunteer activities and events. Guide team members in content creation, video production, and event documentation while contributing to community service and student engagement programs.
              </p>
            </ScrollCard>
            <ScrollCard className="text-panel" index={2}>
              <Users size={24} />
              <h3>Atchayam Trust</h3>
              <p>
                Supported rehabilitation and care of homeless and vulnerable individuals including elderly and young people rescued from streets. Participated in community service activities aimed at improving well-being and social reintegration.
              </p>
            </ScrollCard>
          </div>
        </AnimatedSection>

        <AnimatedSection id="coding" kicker="Profiles" title="Coding platforms">
          <div className="profile-grid">
            {CODING_PROFILES.map((profile) => (
              <ScrollCard className="profile-card" key={profile.platform}>
                <span className="eyebrow">{profile.stat}</span>
                <h3>{profile.platform}</h3>
                <p className="item-meta">{profile.username}</p>
                <p>{profile.desc}</p>
                <a className="text-button" href={profile.link} target="_blank" rel="noreferrer">
                  Open profile
                  <ExternalLink size={16} />
                </a>
              </ScrollCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" kicker="Contact" title="Let us build something useful">
          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <label>
                  Name
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>
              <label>
                Subject
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(event) => setFormState({ ...formState, subject: event.target.value })}
                  placeholder="Project inquiry"
                />
              </label>
              <label>
                Message
                <textarea
                  value={formState.message}
                  onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                  placeholder="Tell me what you want to build or discuss."
                  required
                />
              </label>
              {formStatus.message && <div className={`form-status ${formStatus.status}`}>{formStatus.message}</div>}
              <button className="primary-button" type="submit" disabled={formStatus.status === 'sending'}>
                <Send size={18} />
                {formStatus.status === 'sending' ? 'Preparing message' : 'Send message'}
              </button>
            </form>

            <aside className="contact-panel">
              <h3>Direct contact</h3>
              <a href="mailto:bsankaran80@gmail.com">
                <Mail size={18} />
                bsankaran80@gmail.com
              </a>
              <a href="tel:+919786065407">
                <Phone size={18} />
                +91 9786065407
              </a>
              <span>
                <MapPin size={18} />
                Kallakurichi, Tamil Nadu, India
              </span>
              <div className="social-row">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a key={label} className="icon-button" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label}>
                    <Icon size={18} />
                  </a>
                ))}
              
              </div>
            </aside>
          </div>
        </AnimatedSection>
      </main>

      <AnimatePresence>
        {activeProject && (
          <DetailModal title={activeProject.title} eyebrow={activeProject.category} onClose={() => setActiveProject(null)}>
            <p>{activeProject.desc}</p>
            <div className="modal-section">
              <h4>Highlights</h4>
              <ul>
                {activeProject.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <TagList tags={activeProject.tech} />
            <a className="primary-button modal-button" href={activeProject.link} target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              Open repository
            </a>
          </DetailModal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeExperience && (
          <DetailModal title={activeExperience.role} eyebrow={activeExperience.company} onClose={() => setActiveExperience(null)}>
            <p className="item-meta">{activeExperience.type}</p>
            <p>{activeExperience.summary}</p>
            <div className="modal-section">
              <h4>Contribution details</h4>
              <ul>
                {activeExperience.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <TagList tags={activeExperience.skills} />
            {activeExperience.pdf && (
              <button
                className="primary-button modal-button"
                type="button"
                onClick={() => {
                  setActiveExperience(null);
                  setPdfViewer({ title: `${activeExperience.role} — Internship Certificate`, url: activeExperience.pdf });
                }}
              >
                <ExternalLink size={18} />
                View Internship Certificate
              </button>
            )}
          </DetailModal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResearch && (
          <DetailModal
            title="AR-Based Smart Crop Advisory System Using CNN and Geolocation Algorithms"
            eyebrow="IEEE AIMLA 2026"
            onClose={() => setShowResearch(false)}
          >
            <p className="item-meta">DOI: 10.1109/AIMLA67915.2026.11522553</p>
            <p>
              An innovative agricultural solution leveraging Augmented Reality, Computer Vision, CNNs, and Geolocation to provide farmers with real-time crop monitoring and intelligent advisory services. Users visualize crop health through an interactive AR interface with insights from vegetation indices and location-specific data.
            </p>

            <div className="modal-section">
              <h4>Publication Details</h4>
              <ul>
                <li><strong>Publication:</strong> IEEE Conference Proceedings</li>
                <li><strong>Conference:</strong> 4th International Conference on AI &amp; Machine Learning Applications (AIMLA 2026)</li>
                <li><strong>Indices Monitored:</strong> NDVI · NDMI · RECI · MSAVI · NDRE</li>
                <li><strong>Language Support:</strong> Tamil language advisory for farmers</li>
                <li><strong>Platform:</strong> Mobile Android Application</li>
              </ul>
            </div>

            <div className="modal-section">
              <h4>Key Features</h4>
              <ul>
                <li>AR-based crop visualization via AR Foundation &amp; ARCore</li>
                <li>GPS and geolocation integration for field-specific insights</li>
                <li>CNN-assisted crop health analysis and disease detection</li>
                <li>Real-time agricultural advisory in Tamil language</li>
                <li>Interactive dashboard for vegetation index monitoring</li>
                <li>Mobile Android application deployment</li>
              </ul>
            </div>

            <div className="modal-section">
              <h4>Technologies Used</h4>
              <TagList tags={['Unity 3D', 'AR Foundation', 'ARCore', 'C#', 'CNN', 'JSON', 'GPS Services', 'Computer Vision', 'Machine Learning']} />
            </div>

            <div className="modal-section">
              <h4>Research Impact</h4>
              <p>Bridges the gap between modern technology and agriculture — helping farmers make informed decisions on irrigation, crop health, nutrient management, and field monitoring, enhancing accessibility for rural communities.</p>
            </div>

            <div className="research-actions">
              <a
                className="primary-button modal-button"
                href="https://doi.org/10.1109/AIMLA67915.2026.11522553"
                target="_blank"
                rel="noreferrer"
              >
                <BookOpen size={17} />
                Visit Paper
              </a>
              <a
                className="secondary-button modal-button"
                href="https://github.com/balasankaran4/AR--Based-Smart-Crop-Advisory-System-Using-CNN-and-Geolocation-Algorithm-"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} />
                GitHub Repo
              </a>
              <button
                className="secondary-button modal-button"
                type="button"
                onClick={() => {
                  setShowResearch(false);
                  setPdfViewer({ title: 'IEEE Conference Certificate of Participation', url: '/cert-ieee-participation.pdf' });
                }}
              >
                <ExternalLink size={17} />
                Participation Certificate
              </button>
              <button
                className="secondary-button modal-button"
                type="button"
                onClick={() => {
                  setShowResearch(false);
                  setPdfViewer({ title: 'IEEE Presenter Certificate', url: '/cert-ieee-presenter.pdf' });
                }}
              >
                <ExternalLink size={17} />
                Presenter Certificate
              </button>
            </div>
          </DetailModal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pdfViewer && (
          <PdfViewerModal
            title={pdfViewer.title}
            pdfUrl={pdfViewer.url}
            onClose={() => setPdfViewer(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
