import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// ── FAKE DATA STRUCTURE MATCHING YOUR INSTRUCTOR'S REAL BACKEND DATA ──
const mockSalesData = [
  { date: "2026-06-19", sales: 45000, numOrders: 3 },
  { date: "2026-06-20", sales: 125000, numOrders: 8 },
  { date: "2026-06-21", sales: 75000, numOrders: 5 },
  { date: "2026-06-22", sales: 210000, numOrders: 14 },
  { date: "2026-06-23", sales: 95000, numOrders: 6 },
];

export default function SalesChart({ salesData }) {
  // Use real backend data if it exists; otherwise, fallback to our fake data array
  const chartData = salesData && salesData.length > 0 ? salesData : mockSalesData;

  return (
    <div className="w-full h-80 sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 15, right: 10, left: -10, bottom: 5 }}
        >
          {/* Subtle Grid Pattern */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />

          {/* X-Axis: Horizontal timeline map */}
          <XAxis 
            dataKey="date" 
            stroke="#a1a1aa" 
            fontSize={11} 
            tickLine={false} 
          />

          {/* LEFT Y-Axis: Tracks Sales (Revenue in PKR) */}
          <YAxis
            yAxisId="left"
            position="left"
            stroke="#10b981" /* Organic green */
            fontSize={11}
            tickLine={false}
          />

          {/* RIGHT Y-Axis: Tracks Order Quantities */}
          <YAxis
            yAxisId="right"
            position="right"
            orientation="right"
            stroke="#8b5cf6" /* Soft Mauve */
            fontSize={11}
            tickLine={false}
          />

          {/* Hover tooltips styled cleanly */}
          <Tooltip 
            contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", borderColor: "#e4e4e7" }}
            itemStyle={{ fontSize: "12px", fontFamily: "sans-serif" }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />

          {/* Revenue Line -> tied to left scale axis */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            name="Revenue (PKR)"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#ffffff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />

          {/* Volume Line -> tied to right scale axis */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="numOfOrders"
            name="Orders Placed"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#ffffff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}