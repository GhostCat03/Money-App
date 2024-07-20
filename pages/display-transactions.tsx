import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import TransactionTable from "../components/transactions/transactionTable";
import { Transaction } from "../types/Transaction";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";

import useAppState from "../functions/useAppState";

/**
 *
 * @returns the page containing the data logic and display
 */
export default function DataPage({ fileName }: { fileName: string }) {

  const filePath = `./data/raw/${fileName}`;
  const {appState, setStoredAppData: setAppState, isLoading, error} = useAppState(filePath)
  
  return (
    <Layout page="transactions">
      <div className="text-start fs-1 mb-3 border-bottom border-2">
        Transactions <span className="fs-4"> - {fileName}</span>
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading ...</div>}
      {!isLoading && <TransactionTable transactions={appState} includeTotals={true}/>}
    </Layout>
  );
}
