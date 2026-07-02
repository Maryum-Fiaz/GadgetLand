import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ salesData }) {
  return (
    <div className="w-full h-80 sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={salesData}
          margin={{ top: 15, right: 10, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />

          {/* X-Axis: date */}
          <XAxis
            dataKey="date"
            stroke="#a1a1aa"
            fontSize={11}
            tickLine={false}
          />

          {/* LEFT Y-Axis: Sales/Revenue */}
          <YAxis
            yAxisId="left"
            position="left"
            stroke="#10b981"
            fontSize={11}
            tickLine={false}
          />

          {/* RIGHT Y-Axis: Order Quantities */}
          <YAxis
            yAxisId="right"
            position="right"
            orientation="right"
            stroke="#8b5cf6"
            fontSize={11}
            tickLine={false}
          />

          {/* Hover tooltips */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              borderColor: "#e4e4e7",
            }}
            itemStyle={{ fontSize: "12px", fontFamily: "sans-serif" }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />

          {/* Revenue Line -> tied to left Y-axis */}
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

          {/* Order Quantities Line -> tied to right Y-axis */}
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
