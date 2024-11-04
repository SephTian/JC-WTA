import { useDispatch } from 'react-redux';
import { asyncCreateThread } from '../states/slices/threadsSlice';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/thread/ThreadInput';
import { FaEarthAsia } from 'react-icons/fa6';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateThread = async ({ title, body, category }) => {
    try {
      await dispatch(asyncCreateThread({ title, body, category })).unwrap();
      navigate('/');
    } catch (err) {
      if (!err.error) {
        console.error(err.message);
      } else {
        console.error(err.error.message);
      }
    }
  };

  return (
    <section className="w-full max-w-[800px] bg-white flex flex-col justify-center items-center p-6">
      <header className="flex flex-col justify-center items-center gap-3">
        <FaEarthAsia className="text-[#248277]" size={90} />
        <h2 className="text-4xl text-center">
          Tambah Diskusi Di Bawah Ini <br />
          Setiap Sudut <strong>Dunia.</strong>
        </h2>
      </header>
      <article className="flex justify-center items-center w-full">
        <ThreadInput onCreateThread={handleCreateThread} />
      </article>
    </section>
  );
}

export default AddThreadPage;
