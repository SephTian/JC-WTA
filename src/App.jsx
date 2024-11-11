import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { asyncPreloadProcess } from './states/slices/isPreloadSlice';
import ThreadPage from './pages/ThreadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailThreadPage from './pages/DetailThreadPage';
import AddThreadPage from './pages/AddThreadPage';
import NotFoundPage from './pages/NotFoundPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Layout from './components/layouts/Layout';

function App() {
  const isPreload = useSelector((state) => state.isPreload);
  const { authUser } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ThreadPage />} />
          <Route path="/threads/new" element={<AddThreadPage />} />
          <Route path="/threads/:threadId" element={<DetailThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/register" element={authUser ? <Navigate to="/" /> : <RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
