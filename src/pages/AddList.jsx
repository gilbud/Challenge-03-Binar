import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import data from "../data/data.json";

function AddList() {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();

    const datalength = data.length;
    data.push({
      id: datalength + 1,
      task,
    });
    return navigate("/");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="text-center">
            <h1>Add Student</h1>
          </div>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="task">
              <Form.Label>List Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add New Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              {task.length < 1 && (
                <Form.Text className="text-muted">
                  Enter the student name.
                </Form.Text>
              )}
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddList;
