import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsClipboardPlusFill } from 'react-icons/bs';
import LoadingBar from 'react-redux-loading-bar';

function Navbar() {
  const { authUser } = useSelector((state) => state.authUser);
  return (
    <nav className="h-14 z-50 fixed top-0 right-0 left-0 w-full ">
      <div className="w-full h-full flex items-center px-4 py-1 bg-[#248277] text-white">
        <Link className="" to="/">
          <h1 className="text-2xl font-bold">WorldThreadCenter</h1>
        </Link>
        <div className="flex flex-grow justify-end items-center gap-4">
          {authUser && (
            <Link className="bg-white rounded-md py-2 px-3 text-[#248277] font-bold flex gap-2 items-center" to="/threads/new">
              <BsClipboardPlusFill size={24} /> <span className="text-base">Dikusi Baru</span>
            </Link>
          )}
        </div>
      </div>
      <LoadingBar />
    </nav>
  );
}

export default Navbar;
