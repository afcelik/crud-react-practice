import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

function Order() {

    const [orders, setorders] = useState([])

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        axios.get("https://northwind.vercel.app/api/orders")
            .then(res => {
                setorders(res.data)
            })
    }

    const remove = (id) => {
        axios.delete("https://northwind.vercel.app/api/orders/" + id)
            .then(res => {
                loadData();
            })
    }

    return (
        <>
            <Container className='mt-5'>
                <Row className='text-center mb-5'>
                    <h1>Order Page</h1>
                </Row>
                <Row>
                    <h2>Total Order Count: {orders.length}</h2>
                </Row>
                <Row className='text-center mt-5'>
                    <h2>Order Table</h2>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>ShipName</th>
                                <th>ShipVia</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders && orders.map(item => {
                                    return <tr>
                                        <td>{item.id}</td>
                                        <td>{item.shipName}</td>
                                        <td>{item.shipVia}</td>
                                        <td><Button
                                            className='btn-danger'
                                            onClick={() => remove(item.id)}
                                        >
                                            delete</Button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}

export default Order