import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useInput } from '../../hooks/useInput';
import LoadingSpinner from '../LoadingSpinner';

function RegisterInput({ handleRegister }) {
  const [name, handleName] = useInput('');
  const [email, handleEmail] = useInput('');
  const [password, handlePassword] = useInput('');
  const { statusRegister, errorRegister } = useSelector((state) => state.authUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ name, email, password });
  };

  return (
    <form className="bg-white w-full px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <p data-testid="error-alert" className="text-red-500 text-center">
        {errorRegister && errorRegister}
      </p>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Name
        </label>
        <input
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={name}
          type="text"
          placeholder="Name"
          onChange={handleName}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          type="email"
          placeholder="Email"
          onChange={handleEmail}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={password}
          type="password"
          placeholder="Password"
          onChange={handlePassword}
        />
      </div>
      <div className="flex items-center justify-between">
        <button disabled={statusRegister === 'loading'} className="flex items-center justify-center gap-2 bg-[#248277] text-white font-bold py-2 px-4 rounded-md " type="submit">
          {statusRegister === 'loading' && <LoadingSpinner size="sm" />}
          Register
        </button>
        <h5>
          Sudah punya akun?{' '}
          <Link className="inline-block align-baseline font-bold text-sm text-blue-700 hover:underline" to="/login">
            Login disini.
          </Link>
        </h5>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  handleRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
