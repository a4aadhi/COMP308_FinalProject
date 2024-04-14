import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ONE_TIP, UPDATE_TIP } from '../mutations/tipMutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const tipsClient = new ApolloClient({
  uri: "http://localhost:2003/tips",
  cache: new InMemoryCache(),
});

export default function EditTip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tip, setTip] = useState({
    patientId: '',
    title: '',
    description: '',
  });

  const { loading, error, data, refetch } = useQuery(GET_ONE_TIP, {
    client: tipsClient,
    variables: { _id: id },
    onCompleted: (data) => {
      if (data && data.tip) {
        setTip({
          patientId: data.tip.patientId,
          title: data.tip.title,
          description: data.tip.description
        });
      }
    }
  });

  const [updateTip] = useMutation(UPDATE_TIP, {
    client: tipsClient,
    onCompleted: (data) => {
      setTip({
        patientId: data.updateTip.patientId,
        title: data.updateTip.title,
        description: data.updateTip.description,
      });
      navigate('/patients');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTip({
      variables: {
        id: id,
        patientId: tip.patientId,
        title: tip.title,
        description: tip.description,
      },
    });

    refetch();
  };

  useEffect(() => {
    if (data && data.tip) {
      setTip({
        patientId: data.tip.patientId,
        title: data.tip.title,
        description: data.tip.description
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Edit Tip</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Patient ID</Form.Label>
          <Form.Control
            type="text"
            name="patientId"
            id="patientId"
            placeholder="Enter patient ID"
            value={tip.patientId}
            onChange={(e) => setTip({ ...tip, patientId: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            id="title"
            placeholder="Enter title"
            value={tip.title}
            onChange={(e) => setTip({ ...tip, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            id="description"
            placeholder="Enter description"
            value={tip.description}
            onChange={(e) => setTip({ ...tip, description: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Tip
        </Button>
      </Form>
    </div>
  );
}