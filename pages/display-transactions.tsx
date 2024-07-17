import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import TransactionTable from "../components/transactions/transactionTable";
import { Transaction } from "../types/Transaction";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";

import { parseCSV } from "../functions/parseCSV";
import { getStoredAppData, setStoredAppData } from "../functions/localStorage";

/**
 *
 * @returns the page containing the data logic and display
 */
export default function DataPage({ fileName }: { fileName: string }) {

  const [appState, setAppState] = useState<Transaction[] | undefined>();
  const loading = appState === undefined;
  const filePath = `./data/raw/${fileName}`;

  useEffect(() => {
    const lsData = getStoredAppData()

    if (lsData) {
      setAppState(lsData);
      return;
    }

    // Otherwise populate the data from the csv
    let isValid = true;

    // Gets data from the file when the app is first opened
    fetch(filePath).then(response => response.text()).then(text => {
      if (isValid)
        setAppState(parseCSV(text));
    });

    // Cleanup whenever this is meant to be called again
    return () => {
      isValid = false;
    }
  }, [fileName]);

  // useEffect(() => {
  //   setStoredAppData(appState)
  // }, [appState]);

  // Exit early if loading data
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Layout page="transactions">
      <div className="text-start fs-1 mb-3 border-bottom border-2">
        Transactions <span className="fs-4"> - {fileName}</span>
      </div>
      {appState.length > 0 && <TransactionTable transactions={appState} includeTotals={true}/>}
    </Layout>
  );
}
