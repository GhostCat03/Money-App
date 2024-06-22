import React from "react";

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

  // converts a string to a date object
  const parseDate = (dateString: string): Date => {
    const splitData = dateString.split('/')
    return new Date(
      parseInt(splitData[2]),
      parseInt(splitData[1]) - 1,
      parseInt(splitData[0])
    )
  }

  // creates a transaction struct from a split csv
  const createTransaction = (data: string[]): Transaction => ({
    date: parseDate(data[0]),
    account: data[1],
    description: data[2],
    credit: data[3] ? parseFloat(data[3]) : 0,
    debit: data[4] ? parseFloat(data[4]) : 0,
  } as Transaction)

  // constructs the file path
  const filePath = "./data/raw/" + fileName;
  let data: Transaction[] = []

  // fetches the data and transforms it to Transaction structs.
  fetch(filePath).then(response => response.text())
  .then(text => {
    var lines = text.split("\r\n");
    lines.forEach((line, index) => {
      if (index > 0) {
        data.push(createTransaction(line.split(',')))
      }
    })
  })

  console.log(data)

  return (
    <div className="containter px-5 mx-5">
      <div className="text-start fs-1 pb-2">
        Transactions <span className="fs-4"> - {fileName}</span>
      </div>
      <TransactionTable filePath={filePath} />
    </div>
  );
}
