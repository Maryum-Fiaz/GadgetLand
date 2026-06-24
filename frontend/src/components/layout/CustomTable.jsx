
const CustomTable = ({ columns = [], data = [] }) => {
  return (
    <div className="w-full overflow-x-auto bg-white border border-zinc-200/80 rounded-xl shadow-xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200">
            {columns.map((col, index) => (
              <th 
                key={index} 
                className={`px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400 ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-xs text-zinc-400 font-medium">
                No records found.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-zinc-50/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`px-6 py-4 text-xs ${
                      col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {/* dynamically accesses row value using the column's field key */}
                    {row[col.field]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;