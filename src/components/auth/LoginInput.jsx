import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useForm } from 'react-hook-form';

function LoginInput({ onLogin }) {
  const { errorLogin } = useSelector((state) => state.authUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    await onLogin({ email, password });
  };

  const validateEmail = {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email',
    },
  };

  const validatePassword = {
    required: 'Password is required',
  };

  return (
    <form className="bg-white w-full  px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleLogin)}>
      {errorLogin && (
        <p data-testid="error-alert" className="text-white bg-red-400 text-center rounded-sm py-2 my-2">
          {errorLogin}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          {...register('email', validateEmail)}
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Email"
        />
        <p data-testid="error-alert-email" className="text-red-500 text-sm">
          {errors.email?.message}
        </p>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          {...register('password', validatePassword)}
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password"
        />
        <p data-testid="error-alert-password" className="text-red-500 text-sm">
          {errors.password?.message}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button disabled={isSubmitting} className="flex items-center justify-center gap-2 bg-[#248277] text-white font-bold py-2 px-4 rounded-md disabled:bg-[#154e48]" type="submit">
          {isSubmitting && <LoadingSpinner size="sm" />}
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
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
