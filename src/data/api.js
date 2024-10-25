import axios from 'axios';
const api = (() => {
  axios.defaults.baseURL = 'https://forum-api.dicoding.dev/v1';
  const putToken = (token) => {
    localStorage.setItem('accessToken', token);
  };
  const getToken = () => {
    return localStorage.getItem('accessToken');
  };

  const header = (needToken = false) => {
    const header = {
      'Content-Type': 'application/json',
    };
    const headerWithToken = {
      ...header,
      Authorization: getToken() ? `Bearer ${getToken()}` : null,
    };

    return {
      headers: needToken ? headerWithToken : header,
    };
  };

  async function getOwnProfile() {
    const PARAMS = {};

    const {
      data: { data, status, message },
    } = await axios.get('/users/me', {
      params: PARAMS,
      ...header(true),
    });

    if (status !== 'success') {
      throw new Error(message);
    }

    const { user } = data;
    return user;
  }

  async function login({ email = '', password = '' }) {
    const API_DATA = {
      email: email,
      password: password,
    };
    const {
      data: { data, status, message },
    } = await axios.post('/login', API_DATA, header(false));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { token } = data;
    return token;
  }

  async function register({ name, email, password }) {
    const API_DATA = {
      name: name,
      email: email,
      password: password,
    };

    //axios slalu langsung mengirim ke catch jika error jadi dont worry about status fail kcuali emg disengajakan sma backend
    const {
      data: { data, status, message },
    } = await axios.post('/register', API_DATA, header(false));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { user } = data;
    return user;
  }

  async function getAllUsers() {
    const PARAMS = {};
    const {
      data: { data, status, message },
    } = await axios.get('/users', {
      params: PARAMS,
      ...header(false),
    });

    if (status !== 'success') {
      throw new Error(message);
    }

    const { users } = data;
    return users;
  }

  async function getAllThreads() {
    const PARAMS = {};
    const {
      data: { data, status, message },
    } = await axios.get('/threads', {
      params: PARAMS,
      ...header(false),
    });

    if (status !== 'success') {
      throw new Error(message);
    }

    const { threads } = data;
    return threads;
  }

  async function createThread({ title, body, category }) {
    const API_DATA = {
      title: title,
      body: body,
      category: category,
    };
    const {
      data: { data, status, message },
    } = await axios.post('/threads', API_DATA, header(true));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { thread } = data;
    return thread;
  }

  async function getDetailThread(threadId) {
    const PARAMS = {};
    const {
      data: { data, status, message },
    } = await axios.get(`/threads/${threadId}`, {
      params: PARAMS,
      ...header(false),
    });

    if (status !== 'success') {
      throw new Error(message);
    }

    const { detailThread } = data;
    return detailThread;
  }

  async function createComment({ threadId, content }) {
    const API_DATA = {
      content: content,
    };
    const {
      data: { data, status, message },
    } = await axios.post(`/threads/${threadId}/comments`, API_DATA, header(true));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { comment } = data;
    return comment;
  }

  async function upVoteThread(threadId) {
    const API_DATA = {};
    const {
      data: { data, status, message },
    } = await axios.post(`/threads/${threadId}/up-vote`, API_DATA, header(true));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { vote } = data;
    return vote;
  }

  async function downVoteThread(threadId) {
    const API_DATA = {};
    const {
      data: { data, status, message },
    } = await axios.post(`/threads/${threadId}/down-vote`, API_DATA, header(true));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { vote } = data;
    return vote;
  }

  async function neutralVoteThread(threadId) {
    const API_DATA = {};
    const {
      data: { data, status, message },
    } = await axios.post(`/threads/${threadId}/neutral-vote`, API_DATA, header(true));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { vote } = data;
    return vote;
  }

  async function upVoteComment({ threadId, commentId }) {
    const API_DATA = {};

    const {
      data: { data, status, message },
    } = await axios.post(`/threads/${threadId}/comments/${commentId}/up-vote`, API_DATA, header(true));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { vote } = data;
    return vote;
  }

  async function downVoteComment({ threadId, commentId }) {
    const API_DATA = {};
    const {
      data: { data, status, message },
    } = await axios.post(`/threads/${threadId}/comments/${commentId}/down-vote`, API_DATA, header(true));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { vote } = data;
    return vote;
  }

  async function neutralVoteComment({ threadId, commentId }) {
    const API_DATA = {};
    const {
      data: { data, status, message },
    } = await axios.post(`/threads/${threadId}/comments/${commentId}/neutral-vote`, API_DATA, header(true));

    if (status !== 'success') {
      throw new Error(message);
    }

    const { vote } = data;
    return vote;
  }

  async function getLeaderboards() {
    const PARAMS = {};
    const {
      data: { data, status, message },
    } = await axios.get(`/leaderboards`, {
      params: PARAMS,
      ...header(false),
    });

    if (status !== 'success') {
      throw new Error(message);
    }

    const { leaderboards } = data;
    return leaderboards;
  }

  return {
    putToken,
    getToken,
    getOwnProfile,
    login,
    register,
    getAllUsers,
    getAllThreads,
    createThread,
    getDetailThread,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    createComment,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboards,
  };
})();

export default api;
