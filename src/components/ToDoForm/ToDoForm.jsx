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

  const handleAdd = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/todos');
    const tasks = await response.json();
    const lastId = tasks.length ? Math.max(...tasks.map((task) => parseInt(task.id))) : 0;
    const newId = lastId + 1;
    const newTask = {
      id: newId,
      task,
      description,
      category,
      when: `${date} ${time}`,
      priority,
      fulfillment: `${fulfillment}%`,
    };
    await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    navigate('/');
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const updatedTask = {
      id: parseInt(id),
      task,
      description,
      category,
      when: `${date} ${time}`,
      priority,
      fulfillment: `${fulfillment}%`,
    };
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    navigate('/');
  };

  return (
    <div className='wrapper2'>
      <div className="frame2">
        <h2 className='h2-2'>React To-Do List</h2>
        <form className="sous-frame2" onSubmit={id ? handleEdit : handleAdd} data-testid="todo-form">
          <h3>{id ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}</h3>
          <div className="form-columns">
            <div className="left-column">
              <div className="form-group">
                <label htmlFor="name">Nom :</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nom de la tâche"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description :</label>
                <textarea
                  id="description"
                  placeholder="Courte description de la tâche"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="category">Catégorie :</label>
                <input
                  type="text"
                  id="category"
                  placeholder="e.g. ménage, travail"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date :</label>
                <input
                  type="text"
                  id="date"
                  placeholder="jj/mm/aaaa"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Heure :</label>
                <input
                  type="text"
                  id="time"
                  placeholder="hh:mm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="right-column">
              <div className="form-group">
                <label htmlFor="priority">Priorité :</label>
                <select
                  id="priority"
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
                <label htmlFor="fulfillment">Avancement :</label>
                <input
                  type="range"
                  id="fulfillment"
                  value={fulfillment}
                  onChange={(e) => setFulfillment(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div className="button-group">
                <button type="submit" className="btn-save">
                  <span className='txt-save'>{id ? "Mettre à jour" : "Enregistrer"}</span>
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate('/')}
                >
                  <span className='txt-cancel'>Annuler</span>
                </button>
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
