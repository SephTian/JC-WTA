import { useDispatch, useSelector } from 'react-redux';
import { asyncLoginUser, asyncSetDefaultLoginStatus } from '../states/authUser/action';
import { FaEarthAsia } from 'react-icons/fa6';
import LoginInput from '../components/auth/LoginInput';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { statusLogin } = useSelector((state) => state.authUser);
  const [isReset, setIsReset] = useState(false);

  const handleLogin = async ({ email, password }) => {
    await dispatch(asyncLoginUser({ email, password }));
  };

  useEffect(() => {
    dispatch(asyncSetDefaultLoginStatus());
    setIsReset(true);
  }, [dispatch]);

  useEffect(() => {
    if (isReset && statusLogin === 'success') {
      navigate('/');
    }
  }, [isReset, statusLogin, navigate]);

  return (
    <section className="w-full max-w-[800px] bg-white flex flex-col justify-center items-center p-6">
      <header className="flex flex-col justify-center items-center gap-3">
        <FaEarthAsia className="text-[#248277]" size={90} />
        <h2 className="text-4xl text-center">
          Jelajahi Diskusi Baru Dari <br />
          Setiap Sudut <strong>Dunia.</strong>
        </h2>
      </header>
      <article className="flex justify-center items-center p-6 w-full">
        <LoginInput onLogin={handleLogin} />
      </article>
    </section>
  );
}

export default LoginPage;
