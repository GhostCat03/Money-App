import React from "react";
import TransactionTable from "../components/transactions/transactionTable";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";

import useAppState from "../functions/useAppState";

// TODO create a file picker where the user can upload their own file.
const FILE_PATH = "./data/raw/testTransactions.csv"

/**
 * Display data page
 * @returns the page containing the data logic and display
 */
export default function DataPage() {

  const {appState, setAppState, isLoading, error} = useAppState(FILE_PATH)
  
  return (
    <Layout page="transactions">
      <div className="text-start fs-1 mb-3 border-bottom border-2">
        Transactions
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading ...</div>}
      {!isLoading && <TransactionTable transactions={appState} includeTotals={true}/>}
    </Layout>
  );
}
