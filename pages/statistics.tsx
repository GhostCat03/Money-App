import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import useAppState from "../functions/useAppState";

// chart.js imports
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DoughnutChart from "../components/charts/DoughnutChart";
import { ChartData, DataSetData } from "../types/ChartData";

Chart.register(CategoryScale)

export default function StatisticsPage() {

  const {appState, setStoredAppData: setAppState, isLoading, error} = useAppState()

  const data = {
    labels: ["A", "B"],
    datasets: [{
      label: "jfgd",
      data: [338, 55],
    }]
  } as ChartData

  return (
    <Layout page="stats">
      
      <DoughnutChart
        chartData={data}
        title="test"
      />
    </Layout>
  )
}
