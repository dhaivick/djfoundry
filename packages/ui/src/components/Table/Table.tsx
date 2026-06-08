import styles from './Table.module.css'

export type TableColumn = {
    /** Key matching a property in each row object. */
    key: string
    /** Header label rendered in `<th>`. */
    header: string
    /** Optional fixed column width (e.g. `'120px'`). */
    width?: string
}

export type TableRow = Record<string, React.ReactNode>

type TableProps = {
    /** Column definitions — determines order and headers. */
    columns: TableColumn[]
    /** Row data — each object's keys should match column `key` values. */
    rows: TableRow[]
    /** Accessible caption rendered above the table for screen readers. */
    caption?: string
    /** Applies alternating row background colors. Defaults to `false`. */
    striped?: boolean
    /** Additional class name merged onto the `<table>` element. */
    className?: string
    /** Inline styles applied to the `<table>` element. */
    style?: React.CSSProperties
}

export function Table({ columns, rows, caption, striped = false, className, style }: TableProps) {
    return (
        <div className={styles.wrapper}>
            <table
                className={[styles.table, striped ? styles.striped : '', className].filter(Boolean).join(' ')}
                style={style}
            >
                {caption && <caption className={styles.caption}>{caption}</caption>}
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                scope="col"
                                className={styles.th}
                                style={col.width ? { width: col.width } : undefined}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} className={styles.tr}>
                            {columns.map((col) => (
                                <td key={col.key} className={styles.td}>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
