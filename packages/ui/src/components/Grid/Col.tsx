import styles from './Col.module.css'

export type ColProps = {
    children?: React.ReactNode
    /** Column span at all sizes (0 px+). 1–12. Defaults to 12 (full width). */
    xs?: number
    /** Column span at ≥576 px. Falls back to `xs`. */
    sm?: number
    /** Column span at ≥768 px. Falls back to `sm`. */
    md?: number
    /** Column span at ≥992 px. Falls back to `md`. */
    lg?: number
    /** Column span at ≥1200 px. Falls back to `lg`. */
    xl?: number
    className?: string
    style?: React.CSSProperties
}

export function Col({ children, xs, sm, md, lg, xl, className, style }: ColProps) {
    const cssVars: React.CSSProperties = {}
    if (xs != null) (cssVars as Record<string, unknown>)['--xs'] = xs
    if (sm != null) (cssVars as Record<string, unknown>)['--sm'] = sm
    if (md != null) (cssVars as Record<string, unknown>)['--md'] = md
    if (lg != null) (cssVars as Record<string, unknown>)['--lg'] = lg
    if (xl != null) (cssVars as Record<string, unknown>)['--xl'] = xl

    return (
        <div
            className={[styles.col, className].filter(Boolean).join(' ')}
            style={{ ...cssVars, ...style }}
        >
            {children}
        </div>
    )
}
