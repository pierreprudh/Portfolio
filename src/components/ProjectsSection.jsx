import { SiGithub, SiLeetcode } from "react-icons/si"
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 0,
    title: "KLIDE — AI-native IDE",
    description: "Local-first AI-native IDE pairing a VS Code–style shell (Monaco editor, diff review) with a custom Rust agent loop, embedded terminals running delegate CLI agents, and a 16-tool schema with approval-gated execution. Includes a cross-agent orchestration layer (Sessions MCP) driving sibling sessions and parallel git worktrees, plus a LoRA fine-tuned on-device model for reliable local tool calling.",
    image: "projects/Project - KLIDE.jpg",
    video: "projects/klide-demo.mp4",
    tags: ["Rust", "TypeScript", "React", "MCP", "LoRA Fine-tuning", "Ollama", "AI"],
    githubUrl: "https://github.com/pierreprudh/KLIDE"
  },
  {
    id: 1,
    title: "Self-hosted private AI stack",
    description: "Docker-orchestrated AI platform for a small team — chat UI, Ollama LLM runtime, code-execution sandbox, web search, and automation, all on a private network",
    image: "projects/AI stack.jpg",
    tags: ["TypeScript", "React", "Express", "Docker", "Postgres", "Ollama", "AI"],
  },
  {
    id: 2,
    title: "Process-aware customer-service AI agent",
    description: "Agentic after-sales-support (SAV) pipeline built on LangGraph — identifies the customer, auto-creates a ticket, runs a structured diagnostic dialogue, and routes each case to the right resolution branch. Runs fully local on Ollama (or OpenAI/hybrid), with RAG retrieval over past execution traces, MCP tool servers, and an A/B benchmark harness that proves memory-augmented agents beat blank-slate ones.",
    image: "projects/ai-chabot.jpg",
    tags: ["Python", "LangGraph", "LangChain", "Ollama", "ChromaDB", "FastAPI", "RAG", "MCP", "AI"],
  },
  {
    id: 3,
    title: "Agentic document information extraction",
    description: "Multi-agent document extraction pipeline built with AutoGen and Streamlit — self-improving agents with continuous prompt optimization, applied to energy-market documents.",
    image: "projects/Project - Document information extractor.jpg",
    tags: ["Python", "Autogen", "AI Agent", "OCR"],
    githubUrl: "https://github.com/pierreprudh/Document-Information-Extraction"
  },
  {
    id: 4,
    title: "Strava Dashboard",
    description: "Interactive dashboard built with React and Python to visualize training data from the Strava API",
    image: "/projects/Project - Strava Dashboard.jpg",
    tags: ["Python", "React", "API"],
    githubUrl: "https://github.com/pierreprudh/Strava-Dashboard"
  },
  {
    id: 5,
    title: "Masked Face Detection",
    description: "A deep learning project that detects whether individuals are wearing face masks using MobileNet and EfficientNet architectures. Focused on real-time image classification and public health monitoring.",
    image: "/projects/Project - Mask Detection.jpg",
    tags: ["Python", "Deep Learning", "Computer Vision", "Github"],
    githubUrl: "https://github.com/WacimN/SF-mask-detection"
  },
  {
    id: 6,
    title: "French Mobile Network Analysis",
    description: "Big data pipeline analyzing mobile network coverage in France using Hadoop, Kafka, Spark, and Opensearch. Includes visualization and processing of large-scale geospatial data from ANFR.",
    image: "/projects/Project - French Mobile.jpg",
    tags: ["Python", "Hadoop", "Spark", "Opensearch"],
    githubUrl: "https://github.com/pierreprudh/Antens_Map"
  },
  {
    id: 7,
    title: "Animal Face Recognition",
    description: "A computer vision system built with TensorFlow/Keras to detect and classify animal faces. Demonstrates convolutional neural networks applied to wildlife image recognition.",
    image: "/projects/Project - Animal face recognition.jpg",
    tags: ["Python", "Deep Learning", "Computer Vision", "Keras"],
    githubUrl: "https://github.com/pierreprudh/Animal_face_recognition"
  },
  {
    id: 8,
    title: "File Analysis Tool",
    description: "A Python utility for processing CSV/XLSX files, extracting structured data, and automatically generating JSON summaries and PDF dashboards for reporting.",
    image: "/projects/Project - Default.jpg",
    tags: ["Python", "Pandas", "Data Visualization"],
    githubUrl: "https://github.com/pierreprudh/File-Analysis"
  },
  {
    id: 9,
    title: "Cars customer clustering",
    description: "Clustering and segmentation of car customers using unsupervised learning techniques like KMeans. Built for a car brand to explore marketing insights from customer data.",
    image: "/projects/Project - Cars.jpg",
    tags: ["Python", "Machine Learning", "Clustering", "Pandas", "Plotly"],
  }
]

// Plays only while on screen so the file never loads for visitors who don't scroll to it
const ProjectVideo = ({ src, poster, title }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={title}
      muted
      loop
      playsInline
      preload="none"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  )
}

export const ProjectsSection = () => {
  const [gridCols, setGridCols] = useState(() => {
    const saved = localStorage.getItem("gridCols");
    return saved ? Number(saved) : 1;
  });

  const handleToggleGrid = () => {
    setGridCols((prev) => {
      const next = prev === 1 ? 3 : 1;
      localStorage.setItem("gridCols", next);
      return next;
    });
  };

  const gridClass = gridCols === 1
    ? "grid grid-cols-1 gap-8"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8";

  return <section id="projects" className="py-24 px-4 relative">
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center"> Featured {" "}
        <span className="text-primary">
           Projects
        </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A selection of things I've built — from production AI infrastructure to personal experiments in agentic systems, computer vision, and data engineering.
        </p>

        <div className="flex justify-end mb-6">
          <button
            onClick={handleToggleGrid}
            className="p-2 text-muted-foreground hover:text-primary transition"
            aria-label="Toggle grid layout"
          >
            {gridCols === 1 ? <CiGrid2H size={24} /> : <CiGrid41 size={24} />}
          </button>
        </div>

        <div className={gridClass}>
          {projects.map((project) => (
            <div key={project.id} className="relative group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
              <div className="h-48 overflow-hidden ">
                {project.video ? (
                  <ProjectVideo src={project.video} poster={project.image} title={project.title} />
                ) : (
                  <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                )}
              </div>
              <div className="p-6">
                  <div className="flex text-center justify-center flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium border animate-hover rounded-full bg-primary/10 justify-center text-center text-secondary-foreground hover:scale-105 hover:shadow-md transition-transform transition-shadow duration-500">
                      {tag}
                    </span>
                  ))}
                </div>

              <h3 className="text-xl font-semibold mb-3 text-center justify-center">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 whitespace-pre-line">
                {project.description}
              </p>
              {project.githubUrl && (
                <div className="absolute bottom-4 left-4">
                  <a
                    href={project.githubUrl}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <SiGithub size={25} />
                  </a>
                </div>
              )}
              </div>
            </div>
          ))}

        </div>
        <hr className="my-12 border-muted" />
        <div className="text-center mt-12 flex justify-center gap-4">
          <a
            href="https://github.com/pierreprudh"
            className="cosmic-button w-fit flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <SiGithub size={20} />
          </a>

          <a
            href="https://leetcode.com/pierreprudh"
            className="cosmic-button w-fit flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            LeetCode <SiLeetcode size={20} />
          </a>
        </div>
    </div>
  </section>
}
