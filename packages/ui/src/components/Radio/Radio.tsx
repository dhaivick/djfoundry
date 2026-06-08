import styles from './Radio.module.css'

type Size = 'sm' | 'md' | 'lg'

type RadioOption = {
    /** The value passed to `onChange` when this option is selected. */
    value: string
    /** The human-readable label shown next to the radio button. */
    label: string
    /** Disables this individual option without affecting others. */
    disabled?: boolean
}

type RadioGroupProps = {
    /** Legend text rendered above the group. */
    label?: string
    /** Shared `name` attribute — required for browser grouping of radio inputs. */
    name: string
    /** List of options to render. */
    options: RadioOption[]
    /** Currently selected value. Pair with `onChange` for controlled usage. */
    value?: string
    /** Called with the selected option's `value` string when the user makes a selection. */
    onChange?: (value: string) => void
    /** Controls the size of the radio dots and labels. Defaults to `'md'`. */
    size?: Size
    /** Disables all options in the group. Individual options can also be disabled via `option.disabled`. */
    disabled?: boolean
    /** Error message rendered below the group. */
    error?: string
    /** Additional class name merged onto the root element. */
    className?: string
    /** Inline styles applied to the root element. */
    style?: React.CSSProperties
}

export function RadioGroup({ label, name, options, value, onChange, size = 'md', disabled, error, className, style }: RadioGroupProps) {
    return (
        <fieldset className={[styles.fieldset, styles[size], className].filter(Boolean).join(' ')} style={style}>
            {label && <legend className={styles.legend}>{label}</legend>}
            <div className={styles.options}>
                {options.map((opt) => {
                    const isDisabled = disabled || opt.disabled
                    return (
                        <label
                            key={opt.value}
                            className={[styles.option, isDisabled ? styles.disabled : ''].filter(Boolean).join(' ')}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={() => onChange?.(opt.value)}
                                disabled={isDisabled}
                                className={styles.input}
                            />
                            <span className={styles.dot} aria-hidden="true" />
                            <span className={styles.label}>{opt.label}</span>
                        </label>
                    )
                })}
            </div>
            {error && <span className={styles.error}>{error}</span>}
        </fieldset>
    )
}
