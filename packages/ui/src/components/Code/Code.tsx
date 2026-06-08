import { useState } from 'react'
import styles from './Code.module.css'

type CodeProps = {
    /** The code string to display. */
    children: string
    /** Renders a full code block with toolbar instead of inline code. Defaults to `false`. */
    block?: boolean
    /** Language label shown in the toolbar (e.g. `'tsx'`, `'bash'`). Only shown in block mode. */
    language?: string
    /** Additional class name merged onto the root element. */
    className?: string
    /** Inline styles applied to the root element. */
    style?: React.CSSProperties
}

export function Code({ children, block = false, language, className, style }: CodeProps) {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(children)
        } catch {
            // clipboard API unavailable in some environments
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (!block) {
        return (
            <code className={[styles.inline, className].filter(Boolean).join(' ')} style={style}>
                {children}
            </code>
        )
    }

    return (
        <div className={[styles.wrapper, className].filter(Boolean).join(' ')} style={style}>
            <div className={styles.toolbar}>
                {language && <span className={styles.language}>{language}</span>}
                <button className={styles.copyBtn} onClick={copy} aria-label="Copy code">
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className={styles.pre}>
                <code className={styles.code}>{children}</code>
            </pre>
        </div>
    )
}
