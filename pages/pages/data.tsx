import React, { useCallback, useEffect, useState } from "react";
import { useFilePicker } from 'use-file-picker';
import { Button } from "react-bootstrap";

import TransactionTable from "../components/transactions/transactionTable";
import { Transaction } from "../types/Transaction";

// import csv from "./testTransaction.csv"
// import { parse } from "csv-parse";
// import * as fs from "fs-js";

/**
 *
 * @returns the page containing the data logic and display
 */
export default function DataPage({ fileName }: { fileName: string }) {

  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: '.csv',
  });

  const [appState, setAppState] = useState<Transaction[]>([]);
  
  useEffect(() => {
    // Side effect whenever filesContent changes
    if (filesContent.length === 0)
      return;
    
    console.log("files content changed")
    setAppState(parseCSV(filesContent[0].content));
  }, [filesContent]);

  // Exit early if loading data
  if (loading) {
    return <div>Loading...</div>;
  }

  /** converts a string to a date object */
  const parseDate = (dateString: string): Date => {
    const splitData = dateString.split('/')
    return new Date(
      parseInt(splitData[2]),
      parseInt(splitData[1]) - 1,
      parseInt(splitData[0])
    )
  }

  /** creates a transaction struct from a split csv */
  const createTransaction = (data: string[]): Transaction => ({
    date: parseDate(data[0]),
    account: data[1],
    description: data[2],
    credit: data[3] ? parseFloat(data[3]) : 0,
    debit: data[4] ? parseFloat(data[4]) : 0,
  } as Transaction)

  /** parses a CSV string and maps each line to a Transaction */
  const parseCSV = (fileContent: string): Transaction[] => {
    var data: Transaction[] = []
    fileContent.split("\r\n").forEach((line, index) => {
          if (index > 0) {
            data.push(createTransaction(line.split(',')))
          }
        })
    return data
  }

  return (
    <div className="containter px-5 mx-5">
      <div className="text-start fs-1 mb-3 border-bottom border-2">
        Transactions {filesContent.length > 0 && <span className="fs-4"> - {filesContent[0].name}</span>}
      </div>
      {filesContent.length == 0 && <Button variant="secondary" onClick={() => openFilePicker()}>Select File</Button>}
      {appState.length > 0 && <TransactionTable transactions={appState} />}
      <Button onClick={() => {
        setAppState([...appState, { 
          date: new Date(),
          account: "idk",
          description: "made up stuff",
          credit: 1,
          debit: 0 }
        ]);
      }}>Update state</Button>
    </div>
  );
}
