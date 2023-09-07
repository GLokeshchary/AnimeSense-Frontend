import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Loading from "./Loading";
function OrdersChart({ data }) {
  const chartData = {
    labels: Object.keys(data || {}),
    datasets: [
      {
        label: "No of Orders",
        data: Object.values(data || {}),
        backgroundColor: "rgb(232, 95, 95)",
      },
    ],
  };
  if (data === null) {
    return <Loading />;
  }
  return (
    <div style={{ width: 700 }}>
      <h3>Orders Data Visualization</h3>
      <Bar data={chartData} />
    </div>
  );
}

export default OrdersChart;
