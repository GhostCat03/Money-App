import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import useAppState from "../functions/useAppState";

// chart.js imports
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DoughnutChart from "../components/charts/DoughnutChart";
import { ChartData, DataSetData } from "../types/ChartData";
import { Col, Row } from "react-bootstrap";

import { CATEGORIES, IN_CATEGORIES, OUT_CATEGORIES } from "../types/Categories"; 

// This is cursed, but is the officially documented way of doing things for my chart library.
Chart.register(CategoryScale);

export default function StatisticsPage() {

  const {appState, setAppState, isLoading, error} = useAppState()

  const data = {
    labels: ["A", "B"],
    datasets: [{
      label: "jfgd",
      data: [338, 55],
    }]
  } as ChartData;


  // map app state to chart data for in/out spending
  const inData = appState.filter(
    (v) => IN_CATEGORIES.includes(v.category)
  )

  const outData = appState.filter(
    (v) => OUT_CATEGORIES.includes(v.category)
  )

  const overallData = {
    labels: ["In", "Out"],
    datasets: [{
      label: "$",
      data: [
        appState.reduce((ac, v) => ac + v.credit, 0),
        appState.reduce((ac, v) => ac - v.debit, 0),
      ],
    }]
  }

  const overallInData = {
    labels: IN_CATEGORIES,
    datasets: [{
      label: "$",
      data: IN_CATEGORIES
        .map((c) => inData
          .filter((t) => t.category === c)
          .reduce((ac, t) => ac + t.credit + t.debit, 0)
        )
    }]
  }

  const overallOutData = {
    labels: OUT_CATEGORIES,
    datasets: [{
      label: "$",
      data: OUT_CATEGORIES
        .map((c) => outData
          .filter((t) => t.category === c)
          .reduce((ac, t) => ac + t.credit + t.debit, 0)
        )
    }]
  }


  return (
    <Layout page="stats">
      <div className="text-start fs-1 mb-3 border-bottom border-2">
        Statistics
      </div>
      <Row>
        <Col>
          <DoughnutChart
            chartData={overallInData}
            title="Income"
          />
        </Col>
        <Col>
          <DoughnutChart
            chartData={overallData}
            title="Overall Flow"
          />
        </Col>
        <Col>
        <DoughnutChart
            chartData={overallOutData}
            title="Spending"
          />
        </Col>
      </Row>
    </Layout>
  )
}
