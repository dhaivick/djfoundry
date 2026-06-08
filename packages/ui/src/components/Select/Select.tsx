import { useId } from 'react'
import styles from './Select.module.css'

type Size = 'sm' | 'md' | 'lg'

export type SelectOption = {
    /** The value submitted with the form or passed to `onChange`. */
    value: string
    /** The human-readable text shown in the dropdown. */
    label: string
    /** Prevents this option from being selected. */
    disabled?: boolean
}

type SelectProps = {
    /** Visible label rendered above the select. */
    label?: string
    /** List of options to render in the dropdown. */
    options: SelectOption[]
    /** Controls padding and font size. Defaults to `'md'`. */
    size?: Size
    /** Controlled selected value. Pair with `onChange` for controlled usage. */
    value?: string
    /** Change handler for controlled usage. */
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    /** Prevents interaction and applies a muted style. */
    disabled?: boolean
    /** Error message rendered below the select. Also applies a red border. */
    error?: string
    /** Disabled placeholder option shown when no value is selected. */
    placeholder?: string
    /** `id` forwarded to the `<select>` and linked to the label via `htmlFor`. */
    id?: string
    /** `name` forwarded to the `<select>` for form submission. */
    name?: string
    /** Additional class name merged onto the wrapper element. */
    className?: string
    /** Inline styles applied to the wrapper element. */
    style?: React.CSSProperties
}

export function Select({
    label,
    options,
    size = 'md',
    value,
    onChange,
    disabled,
    error,
    placeholder,
    id,
    name,
    className,
    style,
}: SelectProps) {
    const generatedId = useId()
    const selectId = id ?? generatedId
    return (
        <div className={[styles.wrapper, styles[size], className].filter(Boolean).join(' ')} style={style}>
            {label && (
                <label htmlFor={selectId} className={styles.label}>
                    {label}
                </label>
            )}
            <div className={styles.selectWrapper}>
                <select
                    id={selectId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={[styles.select, error ? styles.selectError : ''].filter(Boolean).join(' ')}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <svg
                    className={styles.chevron}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}
