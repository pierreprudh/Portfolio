import { useEffect, useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const observer = new MutationObserver(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      setIsDarkMode(document.documentElement.classList.contains("dark"));
      return () => observer.disconnect();
    }, []);

    return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
    {/* Background (canvas absolu) */}
    {isDarkMode ? <StarBackground /> : <AuroraBackground />}

    {/* Foreground (z-10 pour être au-dessus du fond) */}
    <div className="relative z-10">
        <ThemeToggle />
        <Navbar />
        <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        </main>
        <Footer />
    </div>
    </div>
    );
};