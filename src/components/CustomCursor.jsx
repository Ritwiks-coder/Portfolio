import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Mouse position values
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Physics for different parts
    const dotConfig = { damping: 40, stiffness: 1000, mass: 0.1 };
    const blobConfig = { damping: 25, stiffness: 150, mass: 0.5 };

    const dotX = useSpring(mouseX, dotConfig);
    const dotY = useSpring(mouseY, dotConfig);

    const blobX = useSpring(mouseX, blobConfig);
    const blobY = useSpring(mouseY, blobConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || ('ontouchstart' in window));
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const interactive = target.closest('a, button, [role="button"], input, select, textarea, .interactive');
            setIsHovering(!!interactive);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (isMobile) return null;

    return (
        <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 99999 }}>
            <style>
                {`
                    * {
                        cursor: none !important;
                    }
                `}
            </style>
            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* Fluid Blob - The "Ambient" part */}
                        <motion.div
                            style={{
                                position: 'fixed',
                                left: 0,
                                top: 0,
                                x: blobX,
                                y: blobY,
                                translateX: '-50%',
                                translateY: '-50%',
                                width: isHovering ? 90 : 40,
                                height: isHovering ? 90 : 40,
                                borderRadius: '50%',
                                backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: isHovering ? 'blur(4px)' : 'blur(2px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: isHovering ? '0 0 30px rgba(255,255,255,0.1)' : 'none',
                                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s'
                            }}
                        />

                        {/* Precision Dot */}
                        <motion.div
                            style={{
                                position: 'fixed',
                                left: 0,
                                top: 0,
                                x: dotX,
                                y: dotY,
                                translateX: '-50%',
                                translateY: '-50%',
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                zIndex: 10,
                                mixBlendMode: 'difference',
                            }}
                            animate={{
                                scale: isClicking ? 0.6 : isHovering ? 2.5 : 1,
                            }}
                            transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                        />
                        
                        {/* Hover Ring - Only shows on hover */}
                        <motion.div
                            style={{
                                position: 'fixed',
                                left: 0,
                                top: 0,
                                x: dotX,
                                y: dotY,
                                translateX: '-50%',
                                translateY: '-50%',
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                opacity: isHovering ? 1 : 0,
                                scale: isHovering ? 1 : 0.5,
                            }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomCursor;
