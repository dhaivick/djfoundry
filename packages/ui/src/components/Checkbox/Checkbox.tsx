import styles from './Checkbox.module.css'

type Size = 'sm' | 'md' | 'lg'

type CheckboxProps = {
    /** Label text rendered next to the checkbox. */
    label?: string
    /** Controlled checked state. Pair with `onChange` for controlled usage. */
    checked?: boolean
    /** Change handler for controlled usage. */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    /** Controls the size of the checkbox box and label. Defaults to `'md'`. */
    size?: Size
    /** Prevents interaction and applies a muted style. */
    disabled?: boolean
    /** `id` forwarded to the `<input>` and linked to the label via `htmlFor`. */
    id?: string
    /** `name` forwarded to the `<input>` for form submission. */
    name?: string
    /** Additional class name merged onto the wrapper element. */
    className?: string
    /** Inline styles applied to the wrapper element. */
    style?: React.CSSProperties
}

export function Checkbox({ label, checked, onChange, size = 'md', disabled, id, name, className, style }: CheckboxProps) {
    return (
        <label
            className={[styles.wrapper, styles[size], disabled ? styles.disabled : '', className].filter(Boolean).join(' ')}
            style={style}
        >
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={styles.input}
            />
            <span className={styles.box} aria-hidden="true">
                <svg className={styles.check} viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    )
}
