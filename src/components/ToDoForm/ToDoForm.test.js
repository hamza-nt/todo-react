import { render, screen, waitFor } from '@testing-library/react';
import ToDoForm from './ToDoForm';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Composant ToDoForm', () => {

  test('Rendu du ToDoForm', () => {
    render(
      <MemoryRouter>
        <ToDoForm />
      </MemoryRouter>
    );
    const formElement = screen.getByTestId('todo-form');
    expect(formElement).toBeInTheDocument();
  });

  test('Affichage du Formulaire', () => {
    render(
      <BrowserRouter>
        <ToDoForm />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fulfillment/i)).toBeInTheDocument();
  });

  test('Simuler envoi du Fomulaire', async () => {
    render(
      <BrowserRouter>
        <ToDoForm />
      </BrowserRouter>
    );
    userEvent.type(screen.getByLabelText(/name/i), 'Nouvelle tâche');
    userEvent.type(screen.getByLabelText(/description/i), 'Description test');
    userEvent.type(screen.getByLabelText(/category/i), 'Test');
    userEvent.type(screen.getByLabelText(/date/i), '12/12/2024');
    userEvent.type(screen.getByLabelText(/time/i), '10:00');
    userEvent.selectOptions(screen.getByLabelText(/priority/i), 'High');
    userEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});