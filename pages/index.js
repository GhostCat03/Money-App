import Layout from "../components/layout.tsx"
import DataPage from "./data.tsx"

import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/globals.css";

export default function Home() {
  return (
    <div className="App">
      <Layout page="Data">
        <DataPage fileName="testTransactions.csv"/>
      </Layout>
    </div>
  );
}
