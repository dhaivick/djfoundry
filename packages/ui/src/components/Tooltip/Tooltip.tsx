import { cloneElement, useId, useState } from 'react'
import styles from './Tooltip.module.css'

type Placement = 'top' | 'bottom' | 'left' | 'right'

type TooltipProps = {
    /** The element that triggers the tooltip on hover or focus. */
    children: React.ReactElement
    /** Content shown inside the tooltip. */
    content: React.ReactNode
    /** Position of the tooltip relative to the trigger. Defaults to `'top'`. */
    placement?: Placement
    /** Additional class name merged onto the wrapper element. */
    className?: string
}

export function Tooltip({ children, content, placement = 'top', className }: TooltipProps) {
    const [visible, setVisible] = useState(false)
    const id = useId()

    return (
        <span
            className={[styles.wrapper, className].filter(Boolean).join(' ')}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocusCapture={() => setVisible(true)}
            onBlurCapture={() => setVisible(false)}
        >
            {cloneElement(children, { 'aria-describedby': visible ? id : undefined })}
            {visible && (
                <span
                    id={id}
                    role="tooltip"
                    className={[styles.tooltip, styles[placement]].filter(Boolean).join(' ')}
                >
                    {content}
                </span>
            )}
        </span>
    )
}
