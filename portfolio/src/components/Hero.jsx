import React from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Hero() {
  return (
    <motion.section
      id="home"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="hero-badge">
            <span>👋 Hello, I'm </span>
          </motion.div>
          <motion.h1
            className="glitch"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
          >
            Salaheddin Altarabichi
          </motion.h1>
          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            Developer & Computer Scientist
          </motion.h2>
          <motion.p className="hero-description" variants={fadeInUp}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            laboriosam, neque fuga est tenetur illo sunt, odit similique eaque,
            tempore perferendis autem voluptates doloribus? Asperiores sunt
            inventore dolore magni quos!
          </motion.p>
          <motion.div className="cta-buttons" variants={staggerContainer}>
            <motion.a
              href="#projects"
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
          <motion.div className="social-links" variants={staggerContainer}>
            <motion.a target="_blank" href="https://github.com">
              <i className="fab fa-github"></i>
            </motion.a>
            <motion.a target="_blank" href="https://linkedin.com">
              <i className="fab fa-linkedin"></i>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="code-display">
            <SyntaxHighlighter
              language="typescript"
              customStyle={{
                margin: 0,
                padding: "2rem",
                height: "100%",
                borderRadius: "20px",
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(10px)",
                marginBottom: 50,
              }}
              style={vscDarkPlus}
            >
              {`const aboutMe: DeveloperProfile = {
  Name: "Salaheddin Altarabichi",
  Origin: "Somewhere between the command line and the clouds",
  Role: "Fullstack Web Developer",
  Stack: {
    languages: ["JavaScript", "TypeScript", "SQL", "HTML/CSS"],
    frameworks: ["React", "Express.js", "TailwindCSS"],
  },
  Traits: [
    "Perfectionist",
    "Aesthetics Enthusiast",
    "Dark mode Knight",
    "Bug Exorcist",
  ],
  MissionStatement:
    "Engineering tomorrow's web, one commit at a time",
  Availability: "Available for hire",
};`}
            </SyntaxHighlighter>
          </div>
          <motion.div
            className="floating-card"
            animate={{ x: [0, 10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-content">
              <span className="card-icon">💻</span>
              <span className="card-text">
                Currently creating amazing applications!
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Hero;
