import styles from './Chip.module.css'

type ChipVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
type Size = 'sm' | 'md' | 'lg'

type ChipProps = {
    /** Text or content inside the chip. */
    children: React.ReactNode
    /** Color variant. Defaults to `'default'`. */
    variant?: ChipVariant
    /** Controls padding and font size. Defaults to `'md'`. */
    size?: Size
    /** Additional class name merged onto the root element. */
    className?: string
    /** Inline styles applied to the root element. */
    style?: React.CSSProperties
}

export function Chip({ children, variant = 'default', size = 'md', className, style }: ChipProps) {
    return (
        <span
            className={[styles.chip, styles[variant], styles[size], className].filter(Boolean).join(' ')}
            style={style}
        >
            {children}
        </span>
    )
}
