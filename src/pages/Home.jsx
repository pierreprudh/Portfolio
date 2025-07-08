import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {

    return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
    {/* Background (canvas absolu) */}
    <StarBackground />

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