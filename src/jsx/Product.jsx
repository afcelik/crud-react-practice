import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

function Product() {

    const [id, setid] = useState()
    const [name, setname] = useState()
    const [unitPrice, setunitPrice] = useState()

    const [products, setproducts] = useState([])

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        axios.get("https://northwind.vercel.app/api/products")
            .then(res => {
                setproducts(res.data)
            })
    }

    const fill = (item) => {
        setid(item.id)
        setname(item.name)
        setunitPrice(item.unitPrice)
    }

    const update = () => {
        axios.put(`https://northwind.vercel.app/api/products/${id}`, {
            name: name,
            unitPrice: unitPrice,
          })
          .then((res) => {
            console.log('Başarılı!');
          });
      };

    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col className='col-md-6'>
                        <h2 className='text-center'>Products</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products && products.map(item => {
                                        return <tr onClick={() => fill(item)}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.unitPrice}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col className='col-md-6 mt-3 px-5'>
                        <Container>
                            <Row>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                />
                            </Row>
                            <Row className='mt-3'>
                                <Form.Label>Unit Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={unitPrice}
                                    onChange={(e) => setunitPrice(e.target.value)}
                                />
                            </Row>
                            <Row className='mt-3'>
                                <Button className='btn-warning'
                                    onClick={() => update()}
                                >
                                    Update</Button>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Product