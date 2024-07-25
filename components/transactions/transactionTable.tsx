import { Transaction } from '../../types/Transaction';
import TransactionRow from './transactionRow';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Component for a table of transactions
 * @returns the page containing the data logic and display
 */
export default function TransactionTable({
    transactions,
    includeTotals
}: {
    transactions: Transaction[],
    includeTotals: boolean
}) {
    const rows = transactions.map((transaction,i) => (
        <TransactionRow key={"transactionRow-" + i.toString()} transaction={transaction}/>
    ));

    return (
        <Container>
            <Row>
                <Col className="border py-1">Date</Col>
                <Col className="border py-1">Account</Col>
                <Col className="border py-1" xs={6}>Description</Col>
                <Col className="border py-1">Credit</Col>
                <Col className="border py-1">Debit</Col>
                <Col className="border py-1">Category</Col>
            </Row>
            {rows}  
            {includeTotals && (<Row>
                <Col className="py-1"></Col>
                <Col className="py-1"></Col>
                <Col className="border py-1" xs={6}>Total</Col>
                <Col className="border py-1">{transactions.reduce((ac: number, trans: Transaction) => ac + trans.credit, 0)}</Col>
                <Col className="border py-1">{transactions.reduce((ac: number, trans: Transaction) => ac + trans.debit, 0)}</Col>
                <Col className="py-1"></Col>
            </Row>)}
        </Container>
    )
}