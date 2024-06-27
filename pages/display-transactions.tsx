import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import TransactionTable from "../components/transactions/transactionTable";
import { Transaction } from "../types/Transaction";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";

// import csv from "./testTransaction.csv"
// import { parse } from "csv-parse";
// import * as fs from "fs-js";

const LOCAL_STORAGE_KEY = "app-data"

/**
 *
 * @returns the page containing the data logic and display
 */
export default function DataPage({ fileName }: { fileName: string }) {

  const [appState, setAppState] = useState<Transaction[] | undefined>();
  const loading = appState === undefined;
  const filePath = `./data/raw/${fileName}`;

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
    category: undefined,
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

  useEffect(() => {
    const lsData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (lsData) {
      // Existing local data
      const naiveData = JSON.parse(lsData) as Transaction[];
      
      const data = naiveData.map((item) => ({
        ...item,
        date: new Date(item.date)
      }))

      setAppState(data);
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

  useEffect(() => {
    if (!appState)
      return;

    // Save data whenever changed
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  // Exit early if loading data
  if (loading) {
    return <div>Loading...</div>;
  }


  

  // {filesContent.length == 0 && <Button variant="secondary" onClick={() => openFilePicker()}>Select File</Button>}
  
  return (
  
    <Layout page="transactions">
      <div className="text-start fs-1 mb-3 border-bottom border-2">
        Transactions <span className="fs-4"> - {fileName}</span>
      </div>
      {appState.length > 0 && <TransactionTable transactions={appState}/>}
      <Button onClick={() => {
        setAppState([...appState, { 
          date: new Date(),
          account: "idk",
          description: "made up stuff",
          credit: 1,
          debit: 0,
        category: undefined}
        ]);
      }}>Update state</Button>
    </Layout>
  );
}
