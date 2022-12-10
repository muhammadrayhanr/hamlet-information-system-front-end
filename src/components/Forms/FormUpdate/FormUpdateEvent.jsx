import React, { useState, useEffect } from 'react';
import { Container, Card, Col, Form, Button, FormLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINT from '../../../globals/ApiEndpoint';

const FormUpdateEvent = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [poster, setPoster] = useState('');
  const [preview, setPreview] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const getEventById = async () => {
    const response = await axios.get(API_ENDPOINT.GET_EVENT_BY_ID(id));
    setName(response.data.name);
    setDesc(response.data.desc);
    setPoster(response.data.poster);
    // setStartDate(response.data.date);
    setPreview(response.data.url);
  };

  useEffect(() => {
    getEventById();
  }, []);

  const loadImage = (e) => {
    const img = e.target.files[0];
    setPoster(img);
    setPreview(URL.createObjectURL(img));
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('date', startDate);
    formData.append('poster', poster);
    try {
      await axios.patch(API_ENDPOINT.UPDATE_EVENT_BY_ID(id), formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      navigate('/events');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Container>
      <Col lg={12} className="grid-margin stretch-card pt-5 my-5">
        <Card className="shadow">
          <Card.Body>
            <Card.Title>Events</Card.Title>
            <Card.Subtitle className="mb-4 text-muted">
              Update Event
            </Card.Subtitle>
            <Form onSubmit={updateEvent}>
              <p className="text-center">{msg}</p>
              <Form.Group className="mb-3">
                <Form.Label>Nama Event</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukan Nama Event"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi Event</Form.Label>
                <Form.Control
                  as="textarea"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Masukan Deskripsi Event"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <FormLabel>Tanggal Event</FormLabel>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-date"
                />
              </Form.Group>
              <Form.Group className="mb-3 image">
                <Form.Label>Unggah Poster</Form.Label>
                <Form.Control type="file" onChange={loadImage} />
              </Form.Group>

              {preview ? (
                <figure style={{ width: '200px' }}>
                  <img src={preview} alt="preview" />
                </figure>
              ) : (
                ''
              )}

              <Button
                type="submit"
                className="me-2"
                variant="success"
                size="md"
              >
                Update
              </Button>
              {/* <Button type="submit" variant="secondary" size="md">
                Batal
              </Button> */}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default FormUpdateEvent;
