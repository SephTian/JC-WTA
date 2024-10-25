import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser, asyncSetDefaultRegisterStatus } from '../states/authUser/action';
import RegisterInput from '../components/auth/RegisterInput';
import { FaEarthAsia } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { statusRegister } = useSelector((state) => state.authUser);
  const [isReset, setIsReset] = useState(false);

  const handleRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  useEffect(() => {
    dispatch(asyncSetDefaultRegisterStatus());
    setIsReset(true);
  }, [dispatch]);

  useEffect(() => {
    if (isReset && statusRegister === 'success') {
      navigate('/login');
    }
  }, [isReset, statusRegister, navigate]);

  return (
    <section className="w-full max-w-[800px] bg-white flex flex-col justify-center items-center p-6">
      <header className="flex flex-col justify-center items-center gap-3">
        <FaEarthAsia className="text-[#248277]" size={90} />
        <h2 className="text-4xl text-center">
          Jelajahi Diskusi Baru Dari <br />
          Setiap Sudut <strong>Dunia.</strong>
        </h2>
      </header>
      <article className="flex justify-center items-center w-full">
        <RegisterInput handleRegister={handleRegister} />
      </article>
    </section>
  );
}

export default RegisterPage;
