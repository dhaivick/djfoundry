import styles from './Card.module.css'

type Padding = 'sm' | 'md' | 'lg'

type CardProps = {
    /** Main content rendered inside the card body. */
    children: React.ReactNode
    /** Optional header section rendered above the body with a divider. */
    header?: React.ReactNode
    /** Optional footer section rendered below the body with a divider. */
    footer?: React.ReactNode
    /** Adds a drop shadow. Defaults to `false`. */
    shadow?: boolean
    /** Controls body padding. Defaults to `'md'`. */
    padding?: Padding
    /** Additional class name merged onto the root element. */
    className?: string
    /** Inline styles applied to the root element. */
    style?: React.CSSProperties
}

export function Card({ children, header, footer, shadow = false, padding = 'md', className, style }: CardProps) {
    return (
        <div
            className={[styles.card, shadow ? styles.shadow : '', styles[padding], className].filter(Boolean).join(' ')}
            style={style}
        >
            {header && <div className={styles.header}>{header}</div>}
            <div className={styles.body}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    )
}
