import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaRankingStar, FaSquareThreads } from 'react-icons/fa6';
import { BiSolidLogIn, BiSolidLogOut } from 'react-icons/bi';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function BottomNavbar() {
  const { authUser } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };

  return (
    <footer className="z-50 fixed bottom-0 right-0 left-0 w-full h-14 bg-[#248277]">
      <nav className="w-full h-full flex justify-center gap-2">
        <Link className="flex flex-col items-center justify-center px-4 py-2 text-white" to="/">
          <FaSquareThreads size={24} />
          <div className="text-sm">Threads</div>
        </Link>
        <Link className="flex flex-col items-center justify-center px-4 py-2 text-white" to="/leaderboards">
          <FaRankingStar size={24} />
          <div className="text-sm">Leaderboards</div>
        </Link>
        {authUser ? (
          <button data-testid="logout-button" className="flex flex-col items-center justify-center px-4 py-2 text-white" onClick={handleLogout}>
            <BiSolidLogOut size={24} />
            <div className="text-sm">Logout</div>
          </button>
        ) : (
          <Link data-testid="login-button" className="flex flex-col items-center justify-center px-4 py-2 text-white" to="/login">
            <BiSolidLogIn size={24} />
            <div className="text-sm">Login</div>
          </Link>
        )}
      </nav>
    </footer>
  );
}

export default BottomNavbar;
