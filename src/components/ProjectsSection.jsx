import { ExternalLink } from "lucide-react"
import * as SiIcons from "react-icons/si"
import { CiLink } from "react-icons/ci";

const projects = [
  {
    id:1,
    title: "Masked Face Detection",
    description: "A study project using MobileNet and EfficientNet.",
    image: "/projects/Project - Mask Detection.png",
    tags: ["Python", "Deep Learning", "Computer Vision", "Github"],
    // demoUrl:"#..."
    githubUrl: "https://github.com/WacimN/SF-mask-detection"
  },
  {
    id:2,
    title: "French Mobile Network Analysis",
    description: "A study project using Hadoop, Kafka, Spark, Opensearch, Dataiku.",
    image: "/projects/Project - French Mobile.png",
    tags: ["Python", "Hadoop", "Spark", "Opensearch"],
    // demoUrl:"#..."
    githubUrl: "https://github.com/pierreprudh/Antens_Map"
  },
  {
  id: 3,
  title: "Animal Face Recognition",
  description: "Animal faces recognition TensorFlow/Keras.",
  image: "/projects/Project - Animal face recognition.png",
  tags: ["Python", "Deep Learning", "Computer Vision", "Keras"],
  githubUrl: "https://github.com/pierreprudh/Animal_face_recognition"
  }

]


export const ProjectsSection = () => {
  return <section id="projects" className="py-24 px-4 relative">
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center"> Featured {" "}
        <span className="text-primary">
           Projects
        </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Some project are for study and other are personal project.
        </p>

        <div className="grid grid-cols-1 md:grids-cols-2 lg:grids-cols-3 gap-8">
          {projects.map((project,key) => (
            <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
              <div className="h-48 overflow-hidden ">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
              </div>
              <div className="p-6">
                  <div className="flex text-center justify-center flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border animate-hover rounded-full bg-primary/10 justify-center text-center text-secondary-foreground hover:scale-105 hover:shadow-md transition-transform transition-shadow duration-500">
                      {tag}
                    </span>
                  ))}
                </div>

              <h3 className="text-xl font-semibold mb-3 text-center justify-center">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {project.description}
              </p>
              <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {/* <a href={project.demoUrl}>

                      <CiLink />
                    </a> */}
                    <a href={project.githubUrl} className="text-foreground/80 hover:text-primary transition-colors duration-300"
                        target="_blank" >
                      <SiIcons.SiGithub size={25} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
    </div>
  </section>
}