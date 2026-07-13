import { useState, useEffect } from "react"
import { cn } from "../lib/utils";
import {
  SiPython, SiOpenai, SiOllama, SiHuggingface, SiN8N, SiTypescript, SiReact,
  SiExpress, SiPostgresql, SiRust, SiFastapi, SiDocker, SiGithubactions,
  SiCloudflare, SiTailscale, SiJsonwebtokens, SiTensorflow, SiPytorch,
  SiOpencv, SiPandas, SiMysql, SiR, SiApachehadoop, SiApachekafka,
  SiApachespark, SiOpensearch, SiGithub, SiPlotly, SiLatex, SiAnthropic,
} from "react-icons/si"
import { FaEye } from "react-icons/fa"

const iconMap = {
  SiPython, SiOpenai, SiOllama, SiHuggingface, SiN8N, SiTypescript, SiReact,
  SiExpress, SiPostgresql, SiRust, SiFastapi, SiDocker, SiGithubactions,
  SiCloudflare, SiTailscale, SiJsonwebtokens, SiTensorflow, SiPytorch,
  SiOpencv, SiPandas, SiMysql, SiR, SiApachehadoop, SiApachekafka,
  SiApachespark, SiOpensearch, SiGithub, SiPlotly, SiLatex, SiAnthropic,
  FaEye,
}

const skills = [
  // Agentic AI
  {name: "LLM APIs (OpenAI, Mistral, Claude)", level: 85, category: "Agentic AI", icon: "SiOpenai" },
  {name: "MCP", level: 85, category: "Agentic AI", icon: "SiPython"},
  {name: "RAG", level: 80, category: "Agentic AI", icon: "SiPython"},
  {name: "LangChain / LangGraph", level: 78, category: "Agentic AI", icon: "SiPython"},
  {name: "Local inference (Ollama, MLX)", level: 85, category: "Agentic AI", icon: "SiOllama"},
  {name: "Fine-tuning (LoRA)", level: 70, category: "Agentic AI", icon: "SiHuggingface"},
  {name: "AutoGen", level: 70, category: "Agentic AI", icon: "FaEye"},
  {name: "n8n", level: 75, category: "Agentic AI", icon: "SiN8N"},

  // Engineering
  {name : "TypeScript", level:75, category: "Engineering", icon: "SiTypescript"},
  {name : "React", level:75, category: "Engineering", icon: "SiReact"},
  {name : "Express / Node.js", level:72, category: "Engineering", icon: "SiExpress"},
  {name : "PostgreSQL", level:70, category: "Engineering", icon: "SiPostgresql"},
  {name : "Rust", level:55, category: "Engineering", icon: "SiRust"},
  {name : "FastAPI", level:70, category: "Engineering", icon: "SiFastapi"},

  // Infrastructure
  {name : "Docker", level:80, category: "Infrastructure", icon: "SiDocker"},
  {name : "CI/CD", level:72, category: "Infrastructure", icon: "SiGithubactions"},
  {name : "Caddy / Cloudflare Tunnel", level:70, category: "Infrastructure", icon: "SiCloudflare"},
  {name : "Tailscale / Networking", level:68, category: "Infrastructure", icon: "SiTailscale"},
  {name : "Auth & Security (JWT)", level:72, category: "Infrastructure", icon: "SiJsonwebtokens"},

  // Data Science
  {name : "Python", level:92, category: "Data Science", icon: "SiPython"},
  {name : "Machine Learning", level:82, category: "Data Science", icon: "SiTensorflow"},
  {name : "Deep Learning", level:78, category: "Data Science", icon: "SiPytorch"},
  {name : "Computer Vision", level:78, category: "Data Science", icon: "SiOpencv"},
  {name : "Data Manipulation", level:82, category: "Data Science", icon: "SiPandas"},
  {name : "SQL", level:75, category: "Data Science", icon: "SiMysql"},
  {name : "OCR (Azure, Tesseract)", level: 70, category: "Data Science", icon: "FaEye"},
  {name : "R", level:65, category: "Data Science", icon: "SiR"},

  // Big Data
  {name : "Hadoop", level:65, category: "Big Data", icon: "SiApachehadoop"},
  {name : "Kafka", level:60, category: "Big Data", icon: "SiApachekafka"},
  {name : "Spark", level:65, category: "Big Data", icon: "SiApachespark"},
  {name : "OpenSearch", level: 60, category: "Big Data", icon: "SiOpensearch" },

  // Tools
  {name : "Git/Github", level:88, category: "Tools", icon: "SiGithub"},
  {name : "Plotly / Streamlit", level:75, category: "Tools", icon: "SiPlotly"},
  {name : "LaTeX", level:80, category: "Tools", icon: "SiLatex"},
  {name : "Claude Code", level:85, category: "Tools", icon: "SiAnthropic"},
]

const categories = ["all", "Agentic AI", "Engineering", "Infrastructure", "Data Science", "Big Data", "Tools"]

export const SkillsSection =  () => {

  const [activeCategory, setActiveCategory] = useState("all")
  const [animatingCategory, setAnimatingCategory] = useState(activeCategory)
  const filteredSkills = skills.filter((skill) => activeCategory === "all" || skill.category === activeCategory)

  useEffect(() => {
    setAnimatingCategory(null);
    const timeout = setTimeout(() => {
      setAnimatingCategory(activeCategory);
    }, 300);
    return () => clearTimeout(timeout);
  }, [activeCategory]);

  return <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills </span>
        </h2>

        <div className="relative flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "relative px-5 py-2 rounded-full transition-all duration-700 ease-in-out capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground scale-105"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-700 ease-in-out",
            animatingCategory === activeCategory ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {filteredSkills.map((skill, key) =>
          (
            <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover transition-opacity duration-700 ease-in-out opacity-100 hover:scale-105 hover:shadow-md transition-transform transition-shadow duration-500">
              <div className="text-left mb-4 flex items-center">
                {(() => {
                  const IconComponent = iconMap[skill.icon] || FaEye
                  return <IconComponent className="text-2xl mr-2" />
                })()}
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left transition-all duration-1000 ease-in-out"
                  style={{width: skill.level + "%"}}
                />
              </div>
              <div className="text-right mt-1 ">
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
            </div>
          )
          )}
        </div>
      </div>

  </section>
}
