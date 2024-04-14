import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useMutation, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ADD_TIP, GET_TIPS_FOR_USER, DELETE_TIP } from '../mutations/tipMutations';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

const tipsClient = new ApolloClient({
  uri: "http://localhost:2003/tips",
  cache: new InMemoryCache(),
});

export default function AddTip() {
  
  const { id } = useParams();
  const [dTipId, setdTipId] = useState('');
  const [newtitle, setTitle] = useState('');
  const [newdescription, setDescription] = useState('');
  const navigate = useNavigate();
  const [deleteTip] = useMutation(DELETE_TIP,
    {
      client: tipsClient
    });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setdTipId(id);
  }

  const { loading, error, data, refetch } = useQuery(GET_TIPS_FOR_USER, {
    client: tipsClient,
    variables: { patientId: id }
  });

  const [addTipMutation] = useMutation(ADD_TIP, {
    client: tipsClient,
    variables: {
      patientId: id,
      title: newtitle,
      description: newdescription
    }
  });

  useEffect(() => {
    refetch();
    console.log('data changed:', data);
  }, [data]);

 const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEditButton = (tip) => {
      navigate(`/edit-tip/${tip._id}`);
  }

  const handleDeleteButton = async (id) => {
      try {
        await deleteTip({ variables: { _id: id } });
        refetch(); // Fetch new data after delete
        console.log(`Deleted tip with ID ${id}`);
        handleClose();
      } catch (error) {
        console.error(error);
      }
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTipMutation({
        variables: {patientId: id, title: newtitle, description: newdescription},
      });
      setTitle('');
      setDescription('');
      refetch();
    } catch (errorTip) {
      console.errorTip(errorTip);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
    <h1>Add a Tip</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={newtitle}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={newdescription}
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h1>Tips for Patient</h1>
      <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.tips.map((tip) => (
                <tr key={tip._id}>
                  <td>{tip.title}</td>
                  <td>{tip.description}</td>
                  <td><Button variant="warning" onClick={() => handleEditButton(tip)}>Edit</Button></td>
                  <td><Button variant="danger" onClick={() => handleShow(tip._id)}>Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete tip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this tip?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={() => handleDeleteButton(dTipId)}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} 