import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useCallback, useEffect, useState } from "react";
import { Transaction } from "../types/Transaction";
import { getStoredAppData } from "../functions/localStorage";
import TransactionTable from "../components/transactions/transactionTable";
import { Button } from "react-bootstrap";

const CATEGORIES = ["Income", "Interest", "Shopping", "Food", "Car", "Entertainment", "Personal"]

export default function DataPage() {

  const [unorganisedData, setUnorganisedData] = useState<Transaction[] | undefined>();
  // const [organisedData, setOrganisedData] = useState<Transaction[] | undefined>();
  const loading = unorganisedData === undefined // || organisedData === undefined;

  useEffect(() => {

    if (!unorganisedData){      
      console.log("hi")
      setUnorganisedData(getStoredAppData().filter(v => !v.category))
      return;
    }

    // Save data whenever changed
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unorganisedData));
  }, [unorganisedData]);

  // useEffect(() => {

  //   if (!organisedData){      
  //     console.log("hi2")
  //     setOrganisedData(getStoredAppData())
  //     return;
  //   }

  //   // Save data whenever changed
  //   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unorganisedData));
  // }, [organisedData]);

  const generateCategoryButtons = () => CATEGORIES.map(v => <Col><Button>{v + "       "}</Button></Col>)

  // Exit early if loading data
  if (loading) {
    return (
      <Layout page="organise">
        <div className="text-start fs-1 mb-3 border-bottom border-2">
          To categorise:
        </div>
        <div>Loading ...</div>
      </Layout>
    )
  }

  return (
    <Layout page="organise">
      <div className="text-start fs-1 mb-3 border-bottom border-2">
        To categorise:
      </div>
      <TransactionTable transactions={[unorganisedData[0]]} includeTotals={false}></TransactionTable>

      <Row>
        {generateCategoryButtons()}
      </Row>
    </Layout>
  )
}