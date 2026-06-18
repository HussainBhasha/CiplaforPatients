// src/components/RoadmapCheckpoint.tsx
import React from "react";
import { motion } from "framer-motion";

export type Milestone = {
  year: string;
  title: string;
  text: string;
  icon: React.ReactNode;
};

interface Props {
  milestone: Milestone;
  position: "left" | "right";
}

const RoadmapCheckpoint: React.FC<Props> = ({ milestone, position }) => {
  const isLeft = position === "left";
  return (
    <motion.div
      className={`roadmap-checkpoint ${isLeft ? "left" : "right"}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="pin-wrapper">
        <div className="pin-glow" />
        <div className="pin-icon">{milestone.icon}</div>
      </div>
      <div className="card glass-card">
        <div className="year">{milestone.year}</div>
        <h3 className="title">{milestone.title}</h3>
        <p className="description">{milestone.text}</p>
      </div>
    </motion.div>
  );
};

export default RoadmapCheckpoint;
