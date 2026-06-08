import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

type ModalSize = 'sm' | 'md' | 'lg'

type ModalProps = {
    /** Controls whether the modal is visible. */
    open: boolean
    /** Called when the user closes the modal via the button, backdrop, or Escape key. */
    onClose: () => void
    /** Optional title shown in the modal header. */
    title?: string
    /** Content rendered inside the modal body. */
    children: React.ReactNode
    /** Controls the max-width of the dialog. Defaults to `'md'`. */
    size?: ModalSize
    /** Closes the modal when clicking the backdrop. Defaults to `true`. */
    closeOnBackdrop?: boolean
    /** Additional class name merged onto the dialog element. */
    className?: string
}

export function Modal({ open, onClose, title, children, size = 'md', closeOnBackdrop = true, className }: ModalProps) {
    const titleId = useId()
    const dialogRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [open, onClose])

    useEffect(() => {
        if (open) dialogRef.current?.focus()
    }, [open])

    if (!open) return null

    return createPortal(
        <div
            className={styles.backdrop}
            onClick={closeOnBackdrop ? onClose : undefined}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                className={[styles.dialog, styles[size], className].filter(Boolean).join(' ')}
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                <div className={styles.header}>
                    {title && <h2 id={titleId} className={styles.title}>{title}</h2>}
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>,
        document.body
    )
}
