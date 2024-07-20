import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";

import { Transaction } from "../types/Transaction";
import Layout from "../components/layout";
import TransactionTable from "../components/transactions/transactionTable";
import useAppState from "../functions/useAppState";

const CATEGORIES = ["Income", "Interest", "Shopping", "Food", "Car", "Entertainment", "Personal"]

interface IndexTransaction {
  index: number,
  transaction: Transaction
}

export default function CategoriseDataPage() {

  const {appState, setStoredAppData: setAppState, isLoading, error} = useAppState()

  const getFirstUnorganised = (t: Transaction[]) => {
    const unorganisedData = t
    .map((v, i) => ({index: i, transaction: v} as IndexTransaction))
    .filter(v => !v.transaction.category)
    
    if (unorganisedData) {
      return unorganisedData[0]
    }
    return null
  }

  const generateBody = (unorganisedFirst: IndexTransaction) => {
    if (!unorganisedFirst) {
      return (<div>No more transactions to organise</div>)
    }
    return (
      <div>
        <TransactionTable transactions={[unorganisedFirst.transaction]} includeTotals={false}></TransactionTable>
        <div className="my-4">
          Please pick a category:
        </div>
        <Row className="my-4">
          {generateCategoryButtons(unorganisedFirst)}
        </Row>
      </div>
    )
  }


  const handleCategoryButton = (category: string, unorganisedData: IndexTransaction) => () => {
    const {index: i, transaction: t} = unorganisedData
    setAppState([...appState.slice(0, i), {...t, category: category}, ...appState.slice(i+1)])
  }

  const generateCategoryButtons = (unorganisedFirst: IndexTransaction) => CATEGORIES
    .map(v => 
      <Col className="d-grid">
        <Button onClick={handleCategoryButton(v, unorganisedFirst)} variant="dark" className={unorganisedFirst ? "" : "disabled"}>{v}</Button>
      </Col>
    )

  return (
    <Layout page="organise">
      <div className="text-start fs-1 mb-3 border-bottom border-2">
        To categorise:
      </div>
      {isLoading && <div>Loading ...</div>}
      {!isLoading && generateBody(getFirstUnorganised(appState))}
    </Layout>
  )
}