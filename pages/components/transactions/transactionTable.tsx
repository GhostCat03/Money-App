import { Transaction } from '../../types/Transaction';
import TransactionRow from './transactionRow';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * 
 * @returns the page containing the data logic and display
 */
export default function TransactionTable({
    transactions
}: {
    transactions: Transaction[]
}) {
    console.log(transactions)
    console.log("trying to create transaction rows")

    var rows = []

    transactions.forEach(
        (transaction, i) => {   
            rows.push(<TransactionRow key={"transactionRow-" + i.toString()} transaction={transaction}/>)
        }
    )

    // var rows = transactions.map((transaction,i) => (
    //     <TransactionRow key={"transactionRow-" + i.toString()} transaction={transaction}/>
    // ))
    
    console.log(rows)

    return (
        <Container>
            <Row>
                <Col className="border py-1">Date</Col>
                <Col className="border py-1">Account</Col>
                <Col className="border py-1" xs={6}>Description</Col>
                <Col className="border py-1">Credit</Col>
                <Col className="border py-1">Debit</Col>
            </Row>
            {rows}  
        </Container>

    )
}