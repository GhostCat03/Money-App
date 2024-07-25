import { Transaction } from "../../types/Transaction"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * A row of the Transaction Table 
 * @returns the page containing the data logic and display
 */
export default function TransactionRow({
    transaction
}: {
    transaction: Transaction
}) {

    return (
        <Row>
            <Col className="border py-1">{transaction.date.toDateString().slice(4, 15)}</Col>
            <Col className="border py-1">{transaction.account}</Col>
            <Col className="border py-1 text-truncate" xs={6}>{transaction.description}</Col>
            <Col className="border py-1">{transaction.credit ? transaction.credit.toFixed(2).toString() : ""}</Col>
            <Col className="border py-1">{transaction.debit ? transaction.debit.toFixed(2).toString() : ""}</Col>
            <Col className="border py-1">{transaction.category}</Col>
        </Row>
    )
}