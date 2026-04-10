import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CaseTOC({ sections }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    const sectionIds = sections.map(s => s.id);
    const observers = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observers.observe(el);
    });
    
    return () => observers.disconnect();
  }, [sections]);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div style={{
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '10px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.25)',
        marginBottom: '16px'
      }}>
        CONTENTS
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              padding: '5px 0',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans, sans-serif)'
            }}
          >
            <motion.span
              animate={{
                color: activeSection === section.id 
                  ? 'rgba(255,255,255,0.92)' 
                  : 'rgba(255,255,255,0.28)',
                fontWeight: activeSection === section.id ? 500 : 400,
                fontSize: activeSection === section.id ? '13px' : '12.5px',
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ display: 'block', lineHeight: 1.4 }}
            >
              {section.label}
            </motion.span>
          </button>
        ))}
      </nav>
    </>
  );
}
