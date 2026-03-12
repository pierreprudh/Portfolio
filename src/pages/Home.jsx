import { useEffect, useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { DarkBackground } from "../components/DarkBackground";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionDivider } from "../components/SectionDivider";

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

    {isDarkMode ? <DarkBackground /> : <AuroraBackground />}

    <ScrollProgress />

    <div className="relative z-10">
        <ThemeToggle />
        <Navbar />
        <main>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <ScrollReveal delay={0.05}>
          <SkillsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <ProjectsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <ContactSection />
        </ScrollReveal>
        </main>
        <Footer />
    </div>
    </div>
    );
};