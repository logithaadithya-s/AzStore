import { motion } from 'framer-motion';
import './HeroDoodles.css';

const HeroDoodles = () => {
  // Floating shopping icons and doodles
  const doodles = [
    { emoji: '🛍️', x: '10%', y: '15%', duration: 4, delay: 0 },
    { emoji: '✨', x: '85%', y: '20%', duration: 5, delay: 0.5 },
    { emoji: '🎁', x: '15%', y: '70%', duration: 6, delay: 1 },
    { emoji: '⭐', x: '80%', y: '65%', duration: 4.5, delay: 0.3 },
    { emoji: '💎', x: '5%', y: '50%', duration: 5.5, delay: 0.7 },
    { emoji: '🎨', x: '90%', y: '50%', duration: 4, delay: 0.2 },
    { emoji: '🔔', x: '50%', y: '10%', duration: 6, delay: 0.8 },
    { emoji: '🎯', x: '45%', y: '80%', duration: 5, delay: 0.4 },
  ];

  // Animated circles/bubbles
  const circles = [
    { size: 80, x: '20%', y: '30%', duration: 8, delay: 0 },
    { size: 60, x: '75%', y: '40%', duration: 10, delay: 1 },
    { size: 100, x: '50%', y: '60%', duration: 12, delay: 0.5 },
    { size: 70, x: '10%', y: '70%', duration: 9, delay: 1.5 },
    { size: 90, x: '85%', y: '25%', duration: 11, delay: 0.3 },
  ];

  // Doodle lines and shapes
  const lines = [
    { path: 'M10,50 Q50,10 90,50', delay: 0 },
    { path: 'M20,80 Q60,40 100,80', delay: 0.5 },
    { path: 'M5,30 Q30,5 55,30', delay: 1 },
  ];

  return (
    <div className="hero-doodles">
      {/* Floating emoji doodles */}
      {doodles.map((doodle, index) => (
        <motion.div
          key={`doodle-${index}`}
          className="floating-doodle"
          style={{
            left: doodle.x,
            top: doodle.y,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: doodle.duration,
            delay: doodle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {doodle.emoji}
        </motion.div>
      ))}

      {/* Floating circles/bubbles */}
      {circles.map((circle, index) => (
        <motion.div
          key={`circle-${index}`}
          className="floating-circle"
          style={{
            width: circle.size,
            height: circle.size,
            left: circle.x,
            top: circle.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: circle.duration,
            delay: circle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated SVG doodle lines */}
      <svg className="doodle-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((line, index) => (
          <motion.path
            key={`line-${index}`}
            d={line.path}
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 4,
              delay: line.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Animated sparkles */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={`sparkle-${index}`}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Shopping cart doodle */}
      <motion.div
        className="cart-doodle"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🛒
      </motion.div>

      {/* Heart doodle */}
      <motion.div
        className="heart-doodle"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ❤️
      </motion.div>

      {/* Star burst */}
      <motion.div
        className="star-burst"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        ⭐
      </motion.div>
    </div>
  );
};

export default HeroDoodles;

