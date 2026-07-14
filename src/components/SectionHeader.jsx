import { Reveal } from "./Reveal"

// Editorial section header: mono index + label on a full-width hairline,
// then an oversized left-aligned title.
export const SectionHeader = ({ index, label, title, lead }) => (
  <Reveal>
    <div className="flex items-baseline gap-4 mb-7 md:mb-9">
      <span className="font-mono text-sm text-primary">{index}</span>
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <div className="h-px flex-1 self-center bg-border/60" />
    </div>
    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-left mb-4">
      {title}
    </h2>
    {lead && (
      <p className="text-left text-muted-foreground max-w-xl leading-relaxed mb-0">
        {lead}
      </p>
    )}
  </Reveal>
)
