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
    { label: 'Behance', href: 'https://www.behance.net/ritikgaikwad12' },
    { label: 'GitHub', href: 'https://github.com/Ritwiks-coder' },
    { label: 'Resume', href: 'https://drive.google.com/file/d/17qRQzmC9KyBoyrbmR7pvzP5J0ISn1WxL/view?usp=drive_link' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-[#0f0f0d] border-t border-white/5 py-[60px] md:py-20">
      <div className="responsive-container">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-40 mb-16 md:mb-20">
          {/* Left Column */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.04em', marginBottom: 24, fontFamily: 'DM Sans, sans-serif' }}>
              Let's build something <br className="hidden sm:block" /> exceptional together.
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
                      className="flex flex-col md:items-end md:justify-end">
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-4 md:mb-3">
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <p className="text-[12px] text-white/25 font-sans text-center sm:text-left">
            © {new Date().getFullYear()} Designed & Built by Rutik Gaikwad
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] sm:text-[11px] text-white/15 font-mono tracking-wider uppercase">
              BUILT WITH VITE & FRAMER MOTION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
