import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllThreads, asyncToggleVoteThread } from '../states/slices/threadsSlice';
import LoadingThreadItem from '../components/thread/LoadingThreadItem';
import ThreadsList from '../components/thread/ThreadsList';
import ThreadFilter from '../components/thread/ThreadFilter';

function ThreadPage() {
  const { threads, status, threadError } = useSelector((state) => state.threads);
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetAllThreads());
  }, [dispatch]);

  const handleSetCategory = (newCategory) => {
    setCategory(newCategory);
  };

  const handleToggleVote = ({ userId, targetId, type }) => {
    dispatch(asyncToggleVoteThread({ userId, threadId: targetId, type }));
  };

  const filteredThreads = threads.filter((thread) => thread.category.toLowerCase().includes(category.toLowerCase()));
  const filteredThreadCategories = threads.reduce((categories, thread) => {
    if (!categories.includes(thread.category)) {
      categories.push(thread.category);
    }
    return categories;
  }, []);

  return (
    <section className="w-full max-w-[800px] bg-white p-8">
      <header>
        <h4 className="mb-2 text-gray-600">Kategori popular</h4>
        <ThreadFilter categories={filteredThreadCategories} currentCategory={category} handleSetCategory={handleSetCategory} />
      </header>
      <article>
        <h1 className="font-semibold text-3xl text-blue-950 my-5">Diskusi Tersedia</h1>
        {status === 'loading' && <LoadingThreadItem repeat={3} />}
        {status === 'success' && <ThreadsList threads={filteredThreads} handleToggleVote={handleToggleVote} />}
        {status === 'error' && (
          <div className="w-full h-full flex justify-center items-center">
            <p>{threadError}</p>
          </div>
        )}
      </article>
    </section>
  );
}

export default ThreadPage;
