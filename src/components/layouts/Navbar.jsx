import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { asyncUnsetAuthUser } from '../../states/authUser/action';
import { IoIosLogOut } from 'react-icons/io';
import { useState } from 'react';

function Navbar() {
  const { authUser } = useSelector((state) => state.authUser);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };

  const handleProfileOpen = () => {
    setIsProfileOpen((prev) => (prev ? false : true));
  };

  return (
    <nav className="h-14 z-50 fixed top-0 right-0 left-0 w-full ">
      <div className="w-full h-full flex items-center px-4 py-1 bg-[#248277] text-white">
        <Link className="" to="/">
          <h1 className="text-2xl font-bold">WorldThreadCenter</h1>
        </Link>
        <div className="flex flex-grow justify-end items-center gap-4">
          {authUser && (
            <div className="relative">
              <div data-testid="profile-image" className="h-9 w-9 rounded-full overflow-hidden hover:cursor-pointer" onClick={handleProfileOpen}>
                <img className="w-full h-full bg-cover " src={authUser.avatar} alt="profile image" />
              </div>
              <div
                className={`absolute ${
                  isProfileOpen ? 'opacity-100' : 'opacity-0'
                } transition-all duration-150 top-14 right-0 bg-white shadow-md w-fit p-4 rounded-md flex flex-col items-center gap-1`}
              >
                <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-900">
                  <img className="w-full h-full bg-cover" src={authUser.avatar} alt="profile image" />
                </div>
                <p className="text-black text-nowrap font-medium text-md">{authUser.name}</p>
                <p className="text-gray-400 text-sm">{authUser.email}</p>
                <button data-testid="logout-button" className="mt-2 flex gap-2 items-center justify-center px-4 py-2 text-white bg-red-700 rounded-md" onClick={handleLogout}>
                  <IoIosLogOut size={20} />
                  <div className="text-sm">Logout</div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <LoadingBar />
    </nav>
  );
}

export default Navbar;
