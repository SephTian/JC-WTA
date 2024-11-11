import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllThreads, asyncToggleVoteThread } from '../states/slices/threadsSlice';
import LoadingThreadItem from '../components/UI/thread/LoadingThreadItem';
import ThreadsList from '../components/UI/thread/ThreadsList';
import { Link, useSearchParams } from 'react-router-dom';
import ThreadsSearchInput from '../components/UI/thread/ThreadSearchInput';
import CategoriesList from '../components/UI/category/CategoriesList';
import { BsClipboardPlusFill } from 'react-icons/bs';

function ThreadPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { authUser } = useSelector((state) => state.authUser);
  const { threads, status, threadError } = useSelector((state) => state.threads);
  const [category, setCategory] = useState(() => searchParams.get('category') || '');
  const [keyword, setKeyword] = useState(() => searchParams.get('keyword') || '');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetAllThreads());
  }, [dispatch]);

  const handleSetCategory = (newCategory) => {
    setCategory(newCategory);
    setSearchParams({ category: newCategory, keyword: keyword });
  };

  const handleSearchKeyword = ({ target }) => {
    setSearchParams({ category: category, keyword: target.value });
    setKeyword(target.value);
  };

  const handleToggleVote = ({ userId, targetId, type }) => {
    dispatch(asyncToggleVoteThread({ userId, threadId: targetId, type }));
  };
  const ThreadCategories = threads?.reduce((categories, thread) => {
    if (!categories.includes(thread.category)) {
      categories.push(thread.category);
    }
    return categories;
  }, []);
  const filteredThreads = threads?.filter((thread) => {
    return thread.category.toLowerCase().includes(category.toLowerCase()) && thread.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="w-full max-w-[800px] bg-white p-8">
      <header>
        <h4 className="mb-2 text-gray-600">Kategori popular</h4>
        <CategoriesList categories={ThreadCategories} currentCategory={category} handleSetCategory={handleSetCategory} />
        <div className="mt-3">
          <ThreadsSearchInput keyword={keyword} onChange={handleSearchKeyword} />
        </div>
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

      {authUser && (
        <Link className="z-50 fixed bottom-20 right-10 bg-white border border-[#248277] rounded-md py-3 px-3 text-[#248277] font-bold flex gap-2 items-center" to="/threads/new">
          <BsClipboardPlusFill size={24} />
        </Link>
      )}
    </section>
  );
}

export default ThreadPage;
