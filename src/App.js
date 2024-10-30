import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDoList from './components/ToDoList/ToDoList';
import ToDoForm from './components/ToDoForm/ToDoForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/add" element={<ToDoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;