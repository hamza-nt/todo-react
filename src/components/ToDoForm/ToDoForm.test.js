// Test basique pour ToDoForm
import React from 'react';
import { render } from '@testing-library/react';
import ToDoForm from './ToDoForm';

test('renders ToDoForm component', () => {
  render(<ToDoForm addTodo={() => {}} />);
});
