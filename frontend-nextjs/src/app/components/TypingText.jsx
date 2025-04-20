'use client';

import { useState, useEffect } from 'react';

const TypingText = ({ text = '', speed = 300 }) => {
  const [isTyping, setIsTyping] = useState(true);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (text && text.trim() !== '') {
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }
  }, [text]);

  // Dot animation
  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, speed);

    return () => clearInterval(interval);
  }, [isTyping, speed]);

  return (
    <span>
      {isTyping ? <span className="opacity-60">Typing{dots}</span> : text}
    </span>
  );
};

export default TypingText;



// 'use client';

// import { useState, useEffect } from 'react';
// import styles from './TypingText.module.css'; // Create this CSS file

// const TypingText = ({ text = '', speed = 50, blinkSpeed = 500 }) => {
//   const [visibleText, setVisibleText] = useState('');
//   const [showCursor, setShowCursor] = useState(true);

//   useEffect(() => {
//     setVisibleText('');
//     if (!text) return;

//     let currentIndex = 0;
//     const typingInterval = setInterval(() => {
//       if (currentIndex < text.length) {
//         setVisibleText(text.substring(0, currentIndex + 1));
//         currentIndex++;
//       } else {
//         clearInterval(typingInterval);
//       }
//     }, speed);

//     return () => clearInterval(typingInterval);
//   }, [text, speed]);

//   // Cursor blink effect
//   useEffect(() => {
//     const cursorInterval = setInterval(() => {
//       setShowCursor(prev => !prev);
//     }, blinkSpeed);
//     return () => clearInterval(cursorInterval);
//   }, [blinkSpeed]);

//   return (
//     <span className={styles.typingContainer}>
//       {visibleText}
//       <span className={`${styles.cursor} ${showCursor ? styles.visible : styles.hidden}`}>|</span>
//     </span>
//   );
// };

// export default TypingText;