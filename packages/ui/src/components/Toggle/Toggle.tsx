import styles from './Toggle.module.css'

type Size = 'sm' | 'md' | 'lg'

type ToggleProps = {
    /** Label text rendered next to the toggle. */
    label?: string
    /** Controlled on/off state. Pair with `onChange` for controlled usage. */
    checked?: boolean
    /** Change handler for controlled usage. */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    /** Controls the size of the track and thumb. Defaults to `'md'`. */
    size?: Size
    /** Prevents interaction and applies a muted style. */
    disabled?: boolean
    /** Text shown inside the track when the toggle is on. Enables the labeled variant. */
    enabledText?: string
    /** Text shown inside the track when the toggle is off. Used with `enabledText`. */
    disabledText?: string
    /** `id` forwarded to the `<input>` and linked to the label via `htmlFor`. */
    id?: string
    /** `name` forwarded to the `<input>` for form submission. */
    name?: string
    /** Additional class name merged onto the wrapper element. */
    className?: string
    /** Inline styles applied to the wrapper element. */
    style?: React.CSSProperties
}

export function Toggle({ label, checked, onChange, size = 'md', disabled, enabledText, disabledText, id, name, className, style }: ToggleProps) {
    const isLabeled = enabledText !== undefined || disabledText !== undefined
    return (
        <label
            className={[styles.wrapper, styles[size], disabled ? styles.disabled : '', className].filter(Boolean).join(' ')}
            style={style}
        >
            <input
                type="checkbox"
                role="switch"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={styles.input}
            />
            <span className={[styles.track, isLabeled ? styles.trackLabeled : ''].filter(Boolean).join(' ')} aria-hidden="true">
                {isLabeled && <span className={styles.enabledText}>{enabledText}</span>}
                <span className={styles.thumb} />
                {isLabeled && <span className={styles.disabledText}>{disabledText}</span>}
            </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    )
}
