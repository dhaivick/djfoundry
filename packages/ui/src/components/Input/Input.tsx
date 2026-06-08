import { useId } from 'react'
import styles from './Input.module.css'

type Size = 'sm' | 'md' | 'lg'
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

type InputProps = {
    /** Visible label rendered above the input. */
    label?: string
    /** HTML input type. Controls keyboard on mobile and browser validation hints. Defaults to `'text'`. */
    type?: InputType
    /** Controls padding and font size. Defaults to `'md'`. */
    size?: Size
    /** Placeholder text shown when the field is empty. */
    placeholder?: string
    /** Controlled value. Pair with `onChange` for controlled usage. */
    value?: string | number
    /** Change handler for controlled usage. */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    /** Prevents interaction and applies a muted style. */
    disabled?: boolean
    /** Error message rendered below the input. Also applies a red border. */
    error?: string
    /** `id` forwarded to the `<input>` and linked to the label via `htmlFor`. */
    id?: string
    /** `name` forwarded to the `<input>` for form submission. */
    name?: string
    /** Additional class name merged onto the wrapper element. */
    className?: string
    /** Inline styles applied to the wrapper element. */
    style?: React.CSSProperties
}

export function Input({
    label,
    type = 'text',
    size = 'md',
    placeholder,
    value,
    onChange,
    disabled,
    error,
    id,
    name,
    className,
    style,
}: InputProps) {
    const generatedId = useId()
    const inputId = id ?? generatedId
    return (
        <div className={[styles.wrapper, styles[size], className].filter(Boolean).join(' ')} style={style}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={[styles.input, error ? styles.inputError : ''].filter(Boolean).join(' ')}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}
