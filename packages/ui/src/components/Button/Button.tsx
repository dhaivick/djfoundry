import styles from './Button.module.css'

type Size = 'sm' | 'md' | 'lg'

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    size?: Size
    loading?: boolean
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
}

const spinnerSize: Record<Size, number> = { sm: 12, md: 14, lg: 18 }

function Spinner({ size }: { size: Size }) {
    const d = spinnerSize[size]
    return (
        <svg width={d} height={d} viewBox="0 0 16 16" fill="none" className={styles.spinner}>
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
            <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 8 8"
                    to="360 8 8"
                    dur="0.7s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    )
}

export function Button({ children, onClick, size = 'md', loading, disabled, className, style }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            style={style}
            className={[styles.button, styles[size], className].filter(Boolean).join(' ')}
        >
            {loading && <Spinner size={size} />}
            <span className={loading ? styles.labelHidden : styles.label}>{children}</span>
        </button>
    )
}
