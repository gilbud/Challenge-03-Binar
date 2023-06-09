import React, { useState } from "react";
import dataTodo from "../data/data.json";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import EditIcon from "../assets/img/edit.png";
import DeleteIcon from "../assets/img/delete.png";
import { Link } from "react-router-dom";

function ToDoList() {
  const [data, setData] = useState(dataTodo);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const removeTodo = (remove) => {
    const removedTodo = data.filter((list) => {
      return list.id !== remove;
    });
    setData(removedTodo);
  };

  const deleteDoneTask = () => {
    const newTodos = data.filter((todo) => {
      return todo.complete === false;
    });
    setData(newTodos);
  };

  const deleteAll = () => {
    setData([]);
  };

  const checkTodo = (check) => {
    const checkedTodo = data.map((todo) => {
      if (todo.id === check) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });
    setData(checkedTodo);
  };

  const toDoDone = () => {
    const newTodos = data.filter((todo) => {
      return todo.complete === true;
    });
    setData(newTodos);
  };

  const openModal = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditId(null);
    setShowModal(false);
    setEditTask("");
  };

  const editTodo = () => {
    const updatedTodos = data.map((todo) =>
      todo.id === editId ? { ...todo, task: editTask } : todo
    );
    setData(updatedTodos);
  };

  return (
    <Container>
      <div className="tdsearch">
        <h2 className="text-center">ToDoSearch</h2>

        <div>
          <Form>
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          <div className="text-center mt-4">
            <Button as={Link} variant="primary" to="/add-list">
              Add New Task
            </Button>
          </div>
        </div>
      </div>

      <h2 className="text-center my-4">ToDoList</h2>
      <div className="d-flex justify-content-between mt- mb-4">
        <div>
          <Button
            variant="primary px-5"
            onClick={() => {
              setData(dataTodo);
            }}
          >
            All
          </Button>
        </div>
        <div>
          <Button
            variant="primary px-5"
            onClick={() => {
              const newTodos = data.filter((todo) => {
                return todo.complete === true;
              });
              setData(newTodos);
            }}
          >
            Done
          </Button>
        </div>
        <div>
          <Button
            variant="primary px-5"
            onClick={() => {
              const newTodos = data.filter((todo) => {
                return todo.complete === false;
              });
              setData(newTodos);
            }}
          >
            Todo
          </Button>
        </div>
      </div>

      <Row>
        <Col>
          <ListGroup>
            {data &&
              data.length > 0 &&
              data
                .filter((dataItems) =>
                  dataItems.task.toLowerCase().includes(search)
                )

                .map((data, index) => (
                  <ListGroup.Item key={data.id}>
                    <div className="d-flex justify-content-between">
                      <span
                        style={
                          data.complete
                            ? { textDecoration: "line-through" }
                            : { textDecoration: "none" }
                        }
                      >
                        {data.task}
                      </span>
                      <div>
                        <input
                          className="mt-1 mx-3 "
                          type="checkbox"
                          checked={data.complete}
                          onChange={() => checkTodo(data.id)}
                        ></input>
                        <img
                          src={EditIcon}
                          style={{ width: "16px" }}
                          alt=""
                          onClick={() => openModal(data.id)}
                        />
                        <img
                          src={DeleteIcon}
                          style={{ width: "16px", marginLeft: "8px" }}
                          alt=""
                          onClick={() => {
                            removeTodo(data.id);
                          }}
                        />
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Col>
      </Row>

      <div className="row my-4">
        <div className="col-6">
          <div className="d-grid gap-2">
            <Button variant="danger px-5" onClick={deleteDoneTask}>
              Delete Done Task
            </Button>
          </div>
        </div>
        <div className="col-6">
          <div className="d-grid gap-2">
            <Button variant="danger px-5" onClick={deleteAll}>
              Delete All Task
            </Button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data &&
            data.length > 0 &&
            data
              .filter((dataItem) => dataItem.id === editId)
              .map((data) => (
                <Form key={data.id}>
                  <Form.Group controlId="formTask">
                    <Form.Label>Task</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={data.task}
                      onChange={(e) => setEditTask(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={editTodo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ToDoList;
