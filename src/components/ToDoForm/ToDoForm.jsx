import React from 'react';
import './ToDoForm.css';

function ToDoForm() {
  return (
    <div className='wrapper2'>
      <div className="frame2">
        <h2 className='h2-2'>React To-Do List</h2>
        <form className="sous-frame2">
          <h3>Add a new to-do:</h3>
          <div className="form-columns">
            <div className="left-column">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="name for the task you're going to do" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" placeholder="a short description of the task - can be omitted"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" placeholder="e.g. household, school, work" />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="text" id="date" placeholder="dd/mm/yyyy - can be ommitted" />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time:</label>
                <input type="text" id="time" placeholder="hh:mm - can be ommitted" />
              </div>
            </div>
            
            <div className="right-column">
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select id="priority">
                  <option>select from dropdown</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fulfillment">Fulfillment:</label>
                <input type="range" id="fulfillment" />
              </div>
              <div className="button-group">
                <button type="button" className="btn-save"><span className='txt-save'>Save</span></button>
                <button type="button" className="btn-cancel"><span className='txt-cancel'>Cancel</span></button>
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
