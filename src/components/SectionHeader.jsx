import { Reveal } from "./Reveal"

// Editorial section marker: mono index + label on a full-width hairline.
// The title stays in the DOM for screen readers and SEO, but is not shown —
// the kicker row alone labels each section.
export const SectionHeader = ({ index, label, title, lead }) => (
  <Reveal>
    <div className="flex items-baseline gap-4 mb-7 md:mb-9">
      <span className="font-mono text-sm text-primary">{index}</span>
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <div className="h-px flex-1 self-center bg-border/60" />
    </div>
    <h2 className="sr-only">{title}</h2>
    {lead && (
      <p className="text-left text-muted-foreground max-w-xl leading-relaxed mb-0">
        {lead}
      </p>
    )}
  </Reveal>
)
