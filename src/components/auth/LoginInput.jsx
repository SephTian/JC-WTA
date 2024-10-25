import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useInput } from '../../hooks/useInput';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';

function LoginInput({ handleLogin }) {
  const [email, handleEmail] = useInput('', { isHTML: false });
  const [password, handlePassword] = useInput('', { isHTML: false });
  const { statusLogin, errorLogin } = useSelector((state) => state.authUser);

  //const password = 'sadssd';
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <form className="bg-white w-full  px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <p data-testid="error-alert" className="text-red-500 text-center">
        {errorLogin && errorLogin}
      </p>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          type="email"
          placeholder="Emailsss"
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
        <button disabled={statusLogin === 'loading'} className="flex items-center justify-center gap-2 bg-[#248277] text-white font-bold py-2 px-4 rounded-md" type="submit">
          {statusLogin === 'loading' && <LoadingSpinner size="sm" />}
          Login
        </button>
        <h5>
          Belum punya akun?{' '}
          <Link className="inline-block align-baseline font-bold text-sm text-blue-700 hover:underline" to="/register">
            Daftar sekarang
          </Link>
        </h5>
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginInput;
