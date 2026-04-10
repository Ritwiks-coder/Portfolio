import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata' // Assuming Indian time based on the metadata
    });
  };

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ritik-gaikwad-17abb6267' },
    { label: 'GitHub', href: 'https://github.com/Ritwiks-coder' },
    { label: 'Resume', href: 'https://drive.google.com/file/d/1Id7CEECKeb06EYRBBkuTOuQZdfzaDFEZ/view?usp=drive_link' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <footer style={{ background: '#0f0f0d', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '80px 0 40px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, marginBottom: 80 }}>
          {/* Left Column */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 style={{ fontSize: 48, fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.04em', marginBottom: 24, fontFamily: 'DM Sans, sans-serif' }}>
              Let's build something <br /> exceptional together.
            </h2>
            <a href="mailto:ritikgaikwad109@gmail.com" 
               style={{ 
                 display: 'inline-flex', 
                 alignItems: 'center', 
                 gap: 12, 
                 padding: '14px 28px', 
                 borderRadius: 12, 
                 background: 'rgba(255,255,255,0.90)', 
                 color: '#0f0f0d', 
                 textDecoration: 'none', 
                 fontWeight: 600, 
                 fontSize: 15,
                 transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                 fontFamily: 'DM Sans, sans-serif'
               }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)' }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>
               Get in touch
            </a>
          </motion.div>

          {/* Right Column */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 32, marginBottom: 12 }}>
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                   style={{ 
                     fontSize: 14, 
                     color: 'rgba(255,255,255,0.45)', 
                     textDecoration: 'none', 
                     transition: 'color 0.2s',
                     fontFamily: 'DM Sans, sans-serif'
                   }}
                   onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.90)' }}
                   onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}>
                   {link.label} ↗
                </a>
              ))}
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Local Time — {formatTime(time)} IST
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.03)' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: 'DM Sans, sans-serif' }}>
            © {new Date().getFullYear()} Designed & Built by Rutik Gaikwad
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}>
              BUILT WITH VITE & FRAMER MOTION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
