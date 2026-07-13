import { Check, Copy, Mail, MapPin } from "lucide-react"
import { SiGithub, SiLinkedin } from "react-icons/si"
import { useState } from "react"
import { Reveal } from "./Reveal"
import { SectionHeader } from "./SectionHeader"

const EMAIL = "prudh.pierre@gmail.com"

export const ContactSection = () => {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — the mailto link still works
    }
  }

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <SectionHeader
          kicker="Contact"
          title="Get in"
          accent="Touch"
          lead="AI Engineer at Ontraak — always up for a good conversation about agents, local LLMs, or shipping AI that holds up in production."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-xl border border-border/70 bg-card p-8 md:p-10 flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md">
              <a
                href={`mailto:${EMAIL}`}
                className="cosmic-button flex-1 inline-flex items-center justify-center gap-2 text-center"
              >
                <Mail size={16} /> {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                {copied ? <Check size={15} className="text-primary" /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://www.linkedin.com/in/pierre-prudhomme-14b145222/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <SiLinkedin size={15} /> LinkedIn
              </a>
              <a
                href="https://github.com/pierreprudh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <SiGithub size={15} /> GitHub
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-primary/70" /> Paris, France
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
