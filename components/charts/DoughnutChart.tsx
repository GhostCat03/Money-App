import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartData } from "../../types/ChartData";

// Doughnut chart with custom configurations
export default function DoughnutChart({
  chartData,
  title,
}:{
  chartData: ChartData,
  title: string,
}) {

  return (
    <div className="chart-container">
      <Doughnut
        data={{
          labels: chartData.labels,
          datasets: chartData.datasets
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: title
            }
          }
        }}
      />
    </div>
  );
}
