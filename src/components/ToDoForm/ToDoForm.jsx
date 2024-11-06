import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ToDoForm.css';

function ToDoForm() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('select from dropdown');
  const [fulfillment, setFulfillment] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const response = await fetch(`http://localhost:5000/todos/${id}`);
        const data = await response.json();
        setTask(data.task);
        setDescription(data.description);
        setCategory(data.category);
        const [taskDate, taskTime] = data.when.split(' ');
        setDate(taskDate);
        setTime(taskTime);
        setPriority(data.priority);
        setFulfillment(parseInt(data.fulfillment));
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // // Récupère les tâches actuelles pour obtenir le dernier ID
    // const response = await fetch('http://localhost:5000/todos');
    // const tasks = await response.json();
    // // Détermine le dernier ID ou commence à 1 si aucun élément
    //c onst lastId = tasks.length ? Math.max(...tasks.map(task => task.id)) : 0;
    // const newId = lastId + 1; // ID incrémenté
    const newTask = {
      // id: newId, // Ajoute un ID incrémenté
      task,
      description,
      category,
      when: `${date} ${time}`,
      priority,
      fulfillment: `${fulfillment}%`,
    };
    if (id) {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
    } else {
      await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
    }
    navigate('/');
  };

  return (
    <div className='wrapper2'>
      <div className="frame2">
        <h2 className='h2-2'>React To-Do List</h2>
        <form className="sous-frame2" onSubmit={handleSubmit} data-testid="todo-form">
          <h3>Add a new to-do:</h3>
          <div className="form-columns">
            <div className="left-column">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="name for the task you're going to do" value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" placeholder="a short description of the task - can be omitted"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" placeholder="e.g. household, school, work"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="text" id="date" placeholder="dd/mm/yyyy - can be ommitted"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time:</label>
                <input type="text" id="time" placeholder="hh:mm - can be ommitted"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="right-column">
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>select from dropdown</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fulfillment">Fulfillment:</label>
                <input type="range" id="fulfillment"
                  value={fulfillment}
                  onChange={(e) => setFulfillment(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div className="button-group">
                <button type="submit" className="btn-save"><span className='txt-save'>Save</span></button>
                <button type="button" className="btn-cancel" onClick={() => navigate('/')}><span className='txt-cancel'>Cancel</span></button>
              </div>
            </div>
          </div>
        </form>
        <footer>
          <p className='copyright2'>Patryk Kielian © 2023 all rights reserved</p>
        </footer>

      </div>
    </div>
  );
}

export default ToDoForm;
