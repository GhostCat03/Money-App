import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


/**
 * 
 * @returns the page containing the data logic and display
 */
export default function TransactionTable({
    filePath
}: {
    filePath: string
}) {
    console.log(filePath)

    return (
        <Container>
            <Row>
                <Col className="border">
                    1 of 2
                </Col>
                <Col className="border">
                    2 of 2
                </Col>
            </Row>
        </Container>

    )
}