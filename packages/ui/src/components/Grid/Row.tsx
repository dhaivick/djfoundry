import styles from './Row.module.css'

export type RowProps = {
    children: React.ReactNode
    /**
     * Gap between cells in px.
     * Pass a tuple `[columnGap, rowGap]` for separate horizontal / vertical gaps.
     * Defaults to `16`.
     */
    gutter?: number | [number, number]
    /** align-items for the grid. */
    align?: 'start' | 'center' | 'end' | 'stretch'
    className?: string
    style?: React.CSSProperties
}

export function Row({ children, gutter = 16, align, className, style }: RowProps) {
    const [cg, rg] = Array.isArray(gutter) ? gutter : [gutter, gutter]

    return (
        <div
            className={[styles.row, align && styles[`align_${align}`], className]
                .filter(Boolean)
                .join(' ')}
            style={{ columnGap: `${cg}px`, rowGap: `${rg}px`, ...style }}
        >
            {children}
        </div>
    )
}
