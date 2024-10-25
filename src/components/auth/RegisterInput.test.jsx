/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call handleRegister function when register button is clicked
 */
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';
import { Provider } from 'react-redux';
import { store } from '../../states';
import { MemoryRouter } from 'react-router-dom';
expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterInput handleRegister={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const nameInput = await screen.getByPlaceholderText('Name');

    // Action
    await userEvent.type(nameInput, 'Joko Yo');

    // Assert
    expect(nameInput).toHaveValue('Joko Yo');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterInput handleRegister={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'testemail@gmail.net');

    // Assert
    expect(emailInput).toHaveValue('testemail@gmail.net');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterInput handleRegister={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'wungapatuman');

    // Assert
    expect(passwordInput).toHaveValue('wungapatuman');
  });

  it('should call handleRegister function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterInput handleRegister={mockRegister} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'Joko Yo');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'testemail@gmail.net');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'wungapatuman');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'Joko Yo',
      email: 'testemail@gmail.net',
      password: 'wungapatuman',
    });
  });
});
