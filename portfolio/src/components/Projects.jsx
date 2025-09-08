import React, { useRef } from "react";
import { motion } from "framer-motion";

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

function Projects() {
  const rowRef = useRef(null);
  const nudge = (dir) => {
    const row = rowRef.current;
    if (!row) return;
    const step = row.clientWidth * 0.9; // scroll almost a full viewport
    row.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>
      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        viewport={{ once: true }}
      >
        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          />
          <img
            className="project-image"
            src="/images/SQL-WebApp.png"
            alt="SQL Generator screenshot"
          />
          <h3> SQL Query Generator</h3>
          <p>
            An SQL query generator with React, Node.js, and TailwindCSS, using
            OpenAI’s API to convert natural language into SQL queries.
          </p>
          <div className="project-tech">
            <span>Express.js</span>
            <span>OpenAI</span>
            <span>TailwindCSS</span>
          </div>
        </motion.div>

        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <img
            className="project-image"
            src="/images/socialmedia.png"
            alt="Social Media Web Application"
          />
          <h3>Social Media Application</h3>
          <p>
            Full-stack social media app with React, Node.js, and MySQL
            Workbench, implementing user authentication, posting, and
            interactions with JavaScript, HTML, and CSS.
          </p>
          <div className="project-tech">
            <span>React</span>
            <span>Node.js</span>
            <span>MySQL Workbench</span>
          </div>
        </motion.div>

        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <img className="project-image" src="" alt="In Progress..." />
          <h3>In Progress...</h3>
          <p>In Progress...</p>
          <div className="project-tech">
            <span>In Progress...</span>
            <span>In Progress...</span>
            <span>In Progress...</span>
          </div>
        </motion.div>

        {/* test */}
        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <img className="project-image" src="" alt="In Progress..." />
          <h3>In Progress...</h3>
          <p>In Progress...</p>
          <div className="project-tech">
            <span>In Progress...</span>
            <span>In Progress...</span>
            <span>In Progress...</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Projects;
