import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Code2, Cpu, Layers3 } from 'lucide-react';
import { useRef } from 'react';

const SKILLS_DATA = [
  { name: 'Java', category: 'languages', desc: 'Object-oriented programming, data structures, and backend systems.', mark: 'JV', level: 'Advanced' },
  { name: 'Python', category: 'languages', desc: 'AI workflows, CNN models, and data-driven crop analysis.', mark: 'PY', level: 'Intermediate' },
  { name: 'C Lang', category: 'languages', desc: 'Systems programming, data acquisition, and physical-principles modeling.', mark: 'C', level: 'Intermediate' },
  { name: 'JavaScript', category: 'languages', desc: 'Core logic for MERN apps, interactions, and browser state.', mark: 'JS', level: 'Advanced' },
  { name: 'HTML and CSS', category: 'languages', desc: 'Responsive structure, accessible layouts, and visual systems.', mark: 'UI', level: 'Advanced' },
  { name: 'MongoDB', category: 'web', desc: 'NoSQL storage for dynamic full-stack project data.', mark: 'DB', level: 'Intermediate' },
  { name: 'Express.js', category: 'web', desc: 'Routing, endpoints, middleware, and server-side application logic.', mark: 'EX', level: 'Advanced' },
  { name: 'React.js', category: 'web', desc: 'Component architecture, hooks, state, and interactive interfaces.', mark: 'RE', level: 'Advanced' },
  { name: 'Node.js', category: 'web', desc: 'Backend JavaScript runtime for APIs and project services.', mark: 'ND', level: 'Advanced' },
  { name: 'CNN Models', category: 'systems', desc: 'Convolutional neural networks for crop disease classification.', mark: 'AI', level: 'Intermediate' },
  { name: 'Geo Algorithms', category: 'systems', desc: 'Distance mapping and local advisory routing using location data.', mark: 'GO', level: 'Intermediate' },
  { name: 'Process Mining', category: 'systems', desc: 'Workflow event-log analysis through Celonis process mining.', mark: 'PM', level: 'Certified' },
  { name: 'IoT and Industry 4.0', category: 'systems', desc: 'Industrial IoT architecture, protocols, and connected systems.', mark: 'I4', level: 'Elite + Silver' },
  { name: 'GitHub', category: 'tools', desc: 'Version control, collaboration, and project repository management.', mark: 'GH', level: 'Advanced' },
  { name: 'VS Code', category: 'tools', desc: 'Primary workspace for web, C, Python, and algorithm practice.', mark: 'VC', level: 'Expert' },
  { name: 'Unity 3D', category: 'tools', desc: 'Interactive augmented reality scenes and spatial interfaces.', mark: '3D', level: 'Intermediate' },
  { name: 'Figma', category: 'tools', desc: 'UI/UX design, wireframing, prototyping, and design system work.', mark: 'FG', level: 'Skilled' },
  { name: 'Video Editing', category: 'tools', desc: 'DaVinci Resolve, After Effects — motion edits and event media.', mark: 'VE', level: 'Skilled' },
  { name: 'Canva & Illustrator', category: 'tools', desc: 'Visual composition, poster design, and communication design.', mark: 'PD', level: 'Skilled' },
];

const CATEGORIES = [
  { id: 'languages', name: 'Languages', icon: Code2 },
  { id: 'web', name: 'Web stack', icon: Layers3 },
  { id: 'systems', name: 'AI and systems', icon: BrainCircuit },
  { id: 'tools', name: 'Tools and creative', icon: Cpu },
];

export default function SkillsUniverse() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'center 52%', 'end 8%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.86, 1], [0.32, 1, 1, 0.72]);

  return (
    <motion.section
      ref={ref}
      id="skills"
      className="section-shell skills-section"
      style={{ opacity }}
    >
      <div className="section-header">
        <span className="section-kicker">Skills</span>
        <h2>Technical toolkit</h2>
      </div>

      <div className="skills-grid">
        {CATEGORIES.map(({ id, name, icon: Icon }) => {
          const skills = SKILLS_DATA.filter((skill) => skill.category === id);

          return (
            <motion.article
              className="skill-category"
              key={id}
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.35 }}
              transition={{ duration: 0.3 }}
            >
              <div className="skill-category-header">
                <span className="card-icon">
                  <Icon size={21} />
                </span>
                <h3>{name}</h3>
              </div>

              <div className="skill-list">
                {skills.map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <span className="skill-mark">{skill.mark}</span>
                    <div>
                      <div className="skill-title-row">
                        <h4>{skill.name}</h4>
                        <span>{skill.level}</span>
                      </div>
                      <p>{skill.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
