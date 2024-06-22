import Layout from "./components/layout.tsx"
import DataPage from "./pages/data.tsx"

import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/globals.css";

export default function Home() {
  return (
    <div className="App">
      <Layout/>
      <DataPage fileName="testTransactions.csv"/>
    </div>
  );
}
