interface RuledTableProps {
  columns: { head: string; body: string }
  rows: { head: string; body: string }[]
}

export function RuledTable({ columns, rows }: RuledTableProps) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <thead>
          <tr className="border-b border-ink">
            <th scope="col" className="w-48 py-2 pr-6 font-semibold">
              {columns.head}
            </th>
            <th scope="col" className="py-2 font-semibold">
              {columns.body}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.head} className="border-b border-rule align-top">
              <th scope="row" className="py-3 pr-6 font-mono font-medium text-navy">
                {row.head}
              </th>
              <td className="py-3 text-ink/85">{row.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
