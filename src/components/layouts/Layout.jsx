import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNavbar from './BottomNavbar';
function Layout() {
  return (
    <>
      <Navbar />
      <main className="w-full flex justify-center min-h-screen py-12">
        <Outlet />
      </main>
      <footer>
        <BottomNavbar />
      </footer>
    </>
  );
}

export default Layout;
