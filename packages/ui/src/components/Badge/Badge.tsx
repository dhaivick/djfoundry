import styles from './Badge.module.css'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
type Size = 'sm' | 'md' | 'lg'

type BadgeProps = {
    /** Text or content inside the badge. */
    children: React.ReactNode
    /** Color variant. Defaults to `'default'`. */
    variant?: BadgeVariant
    /** Controls padding and font size. Defaults to `'md'`. */
    size?: Size
    /** Additional class name merged onto the root element. */
    className?: string
    /** Inline styles applied to the root element. */
    style?: React.CSSProperties
}

export function Badge({ children, variant = 'default', size = 'md', className, style }: BadgeProps) {
    return (
        <span
            className={[styles.badge, styles[variant], styles[size], className].filter(Boolean).join(' ')}
            style={style}
        >
            {children}
        </span>
    )
}
