import { Reveal } from "./Reveal"

// Unified section header: mono kicker between rules, then title with accent word.
export const SectionHeader = ({ kicker, title, accent, lead }) => (
  <Reveal>
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-10 bg-primary/40" />
      <span className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">{kicker}</span>
      <div className="h-px w-10 bg-primary/40" />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight">
      {title} <span className="text-primary">{accent}</span>
    </h2>
    {lead && (
      <p className="text-center text-muted-foreground mt-4 mb-0 max-w-2xl mx-auto leading-relaxed">
        {lead}
      </p>
    )}
  </Reveal>
)
