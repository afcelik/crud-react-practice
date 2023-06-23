import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

function Category() {

    const [id, setid] = useState('')
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')

    const [categories, setcategories] = useState([])

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        axios.get("https://northwind.vercel.app/api/categories")
            .then(res => {
                setcategories(res.data)
            })
    }

    const AddNewCategory = () => {
        let newCategory = {
            name: name,
            description: description
        }

        axios.post("https://northwind.vercel.app/api/categories", newCategory)
            .then(res => {
                loadData();
            })

    }

    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <h1>Add Category</h1>
                </Row>
                <Row className='mt-3'>
                    <Col className="col-md-6">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setname(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col className='col-md-6'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setdescription(e.target.value)}
                        />
                        <Button
                            className='btn-primary mt-3'
                            onClick={() => AddNewCategory()}
                            >
                            Add</Button>
                    </Col>
                </Row>
                <Row className='mt-5'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories && categories.map(item => {
                                    return <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
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

export default Category