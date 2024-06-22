import React from "react";

import TransactionTable from "../components/transactions/transactionTable";

// import csv from "./testTransaction.csv"
// import { parse } from "csv-parse";
// import * as fs from "fs-js";

/**
 *
 * @returns the page containing the data logic and display
 */
export default function DataPage({ fileName }: { fileName: string }) {

  // const csv = require("./testTransaction.csv")
  // console.log(csv)

  const filePath = "./" + fileName;
  // let data: string[][] = []

  // fetch(filePath).then(response => response.text())
  // .then(text => {
  //   var lines = text.split("\r\n");
  //   lines.forEach((line, index) => {
  //     if (index > 0) {
  //       data.push(line.split(','))
  //     }
  //   })
  // })

  // console.log(data)

  

  return (
    <div className="containter px-5 mx-5">
      <div className="text-start fs-1 pb-2">
        Transactions <span className="fs-4"> - {fileName}</span>
      </div>
      <TransactionTable filePath={filePath} />

      {/* 
                <div className="container">
                    <div className="row">
                        <div className="col border">
                            1 of 2
                        </div>
                        <div className="col border">
                            2 of 2
                        </div>
                    </div>
                </div> */}
    </div>
  );
}
