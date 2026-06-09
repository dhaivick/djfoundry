import styles from './Badge.module.css'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
type Size = 'sm' | 'md' | 'lg'
type Placement = 'top-right' | 'bottom-right'

type BadgeProps = {
    /** The element(s) the badge is anchored to. */
    children: React.ReactNode
    /** Text or number shown inside the badge indicator. Omit for a dot. */
    label?: React.ReactNode
    /** Color variant. Defaults to `'error'`. */
    variant?: BadgeVariant
    /** Controls indicator size. Defaults to `'md'`. */
    size?: Size
    /** Corner where the badge is anchored. Defaults to `'top-right'`. */
    placement?: Placement
    /** Additional class name merged onto the wrapper element. */
    className?: string
    /** Inline styles applied to the wrapper element. */
    style?: React.CSSProperties
}

const placementClass: Record<Placement, string> = {
    'top-right': styles.topRight,
    'bottom-right': styles.bottomRight,
}

export function Badge({
    children,
    label,
    variant = 'error',
    size = 'md',
    placement = 'top-right',
    className,
    style,
}: BadgeProps) {
    return (
        <span
            className={[styles.wrapper, className].filter(Boolean).join(' ')}
            style={style}
        >
            {children}
            <span
                className={[
                    styles.indicator,
                    styles[variant],
                    styles[size],
                    placementClass[placement],
                    label == null ? styles.dot : undefined,
                ]
                    .filter(Boolean)
                    .join(' ')}
            >
                {label}
            </span>
        </span>
    )
}
