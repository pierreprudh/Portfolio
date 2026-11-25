import { Fragment, useMemo } from "react"
import { ArrowUpRight } from "lucide-react"

// Renders an article from src/data/articles.js as a reading page:
// web typography, numbered citations linking to the reference list.

const CITE = /\[(@[\w-]+(?:\s*,\s*@[\w-]+)*)\]/g

// Number references in order of first citation (biblatex sorting=none)
const numberReferences = (blocks) => {
  const order = []
  const scan = (text) => {
    for (const m of text.matchAll(CITE)) {
      for (const key of m[1].split(",").map((k) => k.trim().slice(1))) {
        if (!order.includes(key)) order.push(key)
      }
    }
  }
  for (const b of blocks) {
    if (b.p) scan(b.p)
    if (b.list) b.list.forEach(scan)
    if (b.box) b.box.items.forEach(scan)
    if (b.figure) scan(b.figure.caption)
    if (b.table) [...b.table.rows.flat(), ...(b.table.foot ?? [])].forEach(scan)
  }
  return order
}

// **bold** and *italic*, applied to a citation-free fragment
const Emphasis = ({ text }) =>
  text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    if (part.startsWith("*") && part.length > 1) return <em key={i}>{part.slice(1, -1)}</em>
    return <Fragment key={i}>{part}</Fragment>
  })

const Inline = ({ text, numbers, onCite }) => {
  const out = []
  let last = 0
  for (const m of text.matchAll(CITE)) {
    // drop the space LaTeX would have tied with ~
    const before = text.slice(last, m.index).replace(/\s+$/, "")
    out.push(<Emphasis key={`t${last}`} text={before} />)
    const keys = m[1].split(",").map((k) => k.trim().slice(1))
    out.push(
      <sup key={`c${m.index}`} className="ml-0.5 font-mono text-[0.68em] font-medium">
        {keys.map((k, i) => (
          <Fragment key={k}>
            {i > 0 && ","}
            <a
              href={`#ref-${k}`}
              onClick={(e) => { e.preventDefault(); onCite(k) }}
              className="text-primary hover:underline underline-offset-2"
            >
              {numbers.get(k)}
            </a>
          </Fragment>
        ))}
      </sup>
    )
    last = m.index + m[0].length
  }
  out.push(<Emphasis key="end" text={text.slice(last)} />)
  return out
}

export const ArticleReader = ({ item, content, marks }) => {
  const order = useMemo(() => numberReferences(content.blocks), [content])
  const numbers = useMemo(() => new Map(order.map((k, i) => [k, i + 1])), [order])

  const onCite = (key) => {
    const el = document.getElementById(`ref-${key}`)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "center" })
    el.classList.add("ref-flash")
    setTimeout(() => el.classList.remove("ref-flash"), 1600)
  }

  let fig = 0
  let tab = 0
  const inl = (text) => <Inline text={text} numbers={numbers} onCite={onCite} />

  return (
    <article className="mx-auto max-w-2xl px-6 md:px-10 py-10 md:py-14 text-left">
      {/* Title block */}
      <header className="mb-10 md:mb-12">
        <div className="flex gap-4 mb-8" aria-hidden="true">
          {marks.map((svg, i) => (
            <span key={i} className="inline-flex text-[44px] text-foreground [&>svg]:block" dangerouslySetInnerHTML={{ __html: svg }} />
          ))}
        </div>
        <h4 className="text-[1.9rem] md:text-[2.5rem] leading-[1.1] font-bold tracking-tight text-foreground">
          {item.title}
        </h4>
        <p className="mt-4 text-lg md:text-xl leading-snug text-muted-foreground italic">{content.subtitle}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-4 text-[13px] text-muted-foreground">
          <span>{content.byline}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-[12px]">{content.date}</span>
        </div>
      </header>

      {/* Body */}
      <div className="text-[16px] md:text-[17px] leading-[1.75] text-foreground/80">
        {content.blocks.map((b, i) => {
          if (b.h) {
            return (
              <h5 key={i} className="mt-12 mb-4 first:mt-0 text-xl md:text-2xl font-semibold tracking-tight leading-snug text-foreground">
                {b.h}
              </h5>
            )
          }
          if (b.p) return <p key={i} className="mb-5">{inl(b.p)}</p>
          if (b.list) {
            return (
              <ul key={i} className="mb-5 space-y-1.5 pl-1">
                {b.list.map((li) => (
                  <li key={li} className="flex gap-3">
                    <span className="mt-[0.85em] h-px w-3.5 shrink-0 bg-primary/60" />
                    <span>{inl(li)}</span>
                  </li>
                ))}
              </ul>
            )
          }
          if (b.box) {
            return (
              <aside key={i} className="my-8 rounded-2xl border border-border/70 bg-foreground/[0.03] px-6 py-5">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{b.box.title}</div>
                <ul className="space-y-2.5 text-[15px] leading-relaxed">
                  {b.box.items.map((li) => (
                    <li key={li} className="flex gap-3">
                      <span className="mt-[0.75em] h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{inl(li)}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )
          }
          if (b.figure) {
            fig += 1
            return (
              <figure key={i} className="my-9">
                <img
                  src={b.figure.src}
                  alt={b.figure.alt}
                  loading="lazy"
                  className="w-full rounded-xl border border-border/60 bg-muted"
                />
                <figcaption className="mt-3 text-[13px] leading-snug text-muted-foreground">
                  <span className="font-medium text-foreground/70">Figure {fig}.</span> {inl(b.figure.caption)}
                </figcaption>
              </figure>
            )
          }
          if (b.table) {
            tab += 1
            const { head, rows, foot, caption } = b.table
            return (
              <figure key={i} className="my-9">
                <div className="overflow-x-auto">
                  <table className="w-full text-[15px] leading-snug">
                    <thead>
                      <tr className="border-b border-foreground/30">
                        {head.map((h, j) => (
                          <th key={h} className={`py-2.5 font-semibold text-foreground ${j > 0 ? "text-right" : "text-left"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r[0]} className="border-b border-border/50">
                          {r.map((c, j) => (
                            <td key={j} className={`py-2.5 ${j > 0 ? "text-right font-mono text-[14px] tabular-nums" : ""}`}>{inl(c)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                    {foot && (
                      <tfoot>
                        <tr className="border-b border-foreground/30">
                          {foot.map((c, j) => (
                            <td key={j} className={`py-2.5 text-foreground ${j > 0 ? "text-right font-mono text-[14px] tabular-nums" : ""}`}>{inl(c)}</td>
                          ))}
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
                <figcaption className="mt-3 text-[13px] text-muted-foreground">
                  <span className="font-medium text-foreground/70">Table {tab}.</span> {caption}
                </figcaption>
              </figure>
            )
          }
          return null
        })}
      </div>

      {/* References */}
      <section className="mt-14 border-t border-border/60 pt-8">
        <h5 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">References</h5>
        <ol className="space-y-3 text-[13px] leading-snug">
          {order.map((key, i) => {
            const r = content.references[key]
            if (!r) return null
            return (
              <li key={key} id={`ref-${key}`} className="ref-item -mx-3 flex gap-3 rounded-lg px-3 py-1.5 transition-colors duration-700">
                <span className="w-6 shrink-0 font-mono text-[12px] text-muted-foreground/70">{i + 1}</span>
                <span className="text-muted-foreground">
                  {r.author}.{" "}
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="group text-foreground/85 hover:text-primary transition-colors">
                      {r.title}
                      <ArrowUpRight size={12} className="ml-0.5 inline -translate-y-px opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="text-foreground/85">{r.title}</span>
                  )}
                  {r.note && <> ({r.note})</>}
                  {r.date && <span className="font-mono text-[11.5px] text-muted-foreground/70"> · {r.date}</span>}
                </span>
              </li>
            )
          })}
        </ol>
      </section>
    </article>
  )
}
