import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useForm } from 'react-hook-form';

function RegisterInput({ onRegister }) {
  const { errorRegister } = useSelector((state) => state.authUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSubmitRegister = async (data) => {
    const { name, email, password } = data;
    await onRegister({ name, email, password });
  };

  const validateName = {
    required: 'Name is required',
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
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  };

  return (
    <form className="bg-white w-full px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleSubmitRegister)}>
      {errorRegister && (
        <p data-testid="error-alert" className="text-white bg-red-400 text-center rounded-sm py-2 my-2">
          {errorRegister}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Name
        </label>
        <input
          {...register('name', validateName)}
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Name"
        />
        <p className="text-red-500 text-sm">{errors.name && errors.name.message}</p>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          {...register('email', validateEmail)}
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Email"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
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
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>
      <div className="flex items-center justify-between">
        <button disabled={isSubmitting} className="flex items-center justify-center gap-2 bg-[#248277] text-white font-bold py-2 px-4 rounded-md disabled:bg-[#154e48]" type="submit">
          {isSubmitting && <LoadingSpinner size="sm" />}
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
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
