import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useCallback, useEffect, useState } from "react";
import { Transaction } from "../types/Transaction";
import { getStoredAppData, updateStoredItem } from "../functions/localStorage";
import TransactionTable from "../components/transactions/transactionTable";
import { Button } from "react-bootstrap";

const CATEGORIES = ["Income", "Interest", "Shopping", "Food", "Car", "Entertainment", "Personal"]

interface IndexTransaction {
  index: number,
  transaction: Transaction
}

export default function DataPage() {

  const [unorganisedData, setUnorganisedData] = useState<IndexTransaction[] | undefined>();
  // const [organisedData, setOrganisedData] = useState<Transaction[] | undefined>();
  const loading = unorganisedData === undefined // || organisedData === undefined;
  // const [appState, setAppState] = useState<Transaction[] | undefined>();
  // const loading = appState === undefined;

  useEffect(() => {

    if (!unorganisedData){      
      console.log("hi")
      setUnorganisedData(getStoredAppData()
        .map((v, i) => ({index: i, transaction: v}))
        .filter(v => v.transaction.category === undefined)
      )
      return;
    }

    // Save data whenever changed
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unorganisedData));
  }, [unorganisedData]);


  const handleCategoryButton = (category: string) => () => {
    const {index: i, transaction: t} = unorganisedData[0]
    updateStoredItem(i, {...t, category: category})
    setUnorganisedData(unorganisedData.slice(1))
  }

  const generateCategoryButtons = (isActive: boolean) => CATEGORIES
    .map(v => <Col className="d-grid">
        <Button onClick={handleCategoryButton(v)} variant="dark" className={isActive ? "" : "disabled"}>{v}</Button>
      </Col>
    )


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
      {unorganisedData.length > 0 && <TransactionTable transactions={[unorganisedData[0].transaction]} includeTotals={false}></TransactionTable>}

      <div className="my-4">
        Please pick a category:
      </div>

      <Row className="my-4">
        {generateCategoryButtons(unorganisedData.length > 0)}
      </Row>
    </Layout>
  )
}