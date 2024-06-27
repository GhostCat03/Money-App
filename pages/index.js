import Layout from "../components/layout.tsx"
import DataPage from "./display-transactions.tsx"

import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/global.css";

export default function Home() {
  return (
    <div className="App">
      <DataPage fileName="testTransactions.csv"/>
    </div>
  );
}
