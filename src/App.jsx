import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddList from "./pages/AddList";
import ToDoList from "./pages/ToDoList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/add-list" element={<AddList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
