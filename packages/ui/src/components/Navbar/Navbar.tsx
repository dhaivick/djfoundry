import styles from './Navbar.module.css'

export type NavItem = {
    /** Display text for the link. */
    label: string
    /** The href for the anchor element. */
    href: string
    /** Marks this item as the current page. Adds `aria-current="page"`. */
    active?: boolean
}

type NavbarProps = {
    /** Brand logo or name rendered on the left. */
    brand?: React.ReactNode
    /** Navigation links rendered in the center. */
    items?: NavItem[]
    /** Content rendered on the right (e.g. buttons, avatar). */
    actions?: React.ReactNode
    /** Sticks the navbar to the top of the viewport. Defaults to `false`. */
    sticky?: boolean
    /** Additional class name merged onto the root element. */
    className?: string
    /** Inline styles applied to the root element. */
    style?: React.CSSProperties
}

export function Navbar({ brand, items = [], actions, sticky = false, className, style }: NavbarProps) {
    return (
        <nav
            className={[styles.navbar, sticky ? styles.sticky : '', className].filter(Boolean).join(' ')}
            style={style}
        >
            {brand && <div className={styles.brand}>{brand}</div>}
            {items.length > 0 && (
                <ul className={styles.items} role="list">
                    {items.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={[styles.link, item.active ? styles.active : ''].filter(Boolean).join(' ')}
                                aria-current={item.active ? 'page' : undefined}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            {actions && <div className={styles.actions}>{actions}</div>}
        </nav>
    )
}
