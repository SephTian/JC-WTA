import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';

/*
  NOTE-1: Ingat kalau di reducer, value yang di return oleh reducer akan tersimpan pada variabel paling luar reducer.
  Akan tetapi, pada function di reducer ada parameter state (ada action juga) yang dapat membantu menyimpan ke dalam
  state, tetapi ini berlaku jika initial state adalah OBJEK. Karena state berusaha mengakses properti dari state itu sendiri.
  CONTOH: {
            authUser: {
                        authUser: null,
                        statusRegister: 'idle',
                        errorRegister: null,
                        statusLogin: 'idle',
                        errorLogin: null,
                      }
          }
  
  NOTE-2: Berikut ini alur error
          1. Dari API akan throw error yang berisi error.response, dan lain-lain
          2. Async Thunk catch error dari API. Selanjutnya, async thunk akan throw error 2 tipe:
              -> return berupa rejectWithValue yang bisa kita custom value nya
              -> return berupa throw error berisi message, dan lain-lain 
          3. Pada action reducer akan catch error berdasarkan 2 tipe diatas:
              -> Akan mempunyai value seperti yang ada di rejectWithValue => action.payload
              -> Akan mempunyai value error yang sama seperti error => action.error
          4. Pada UI akan catch error berdasarkan 2 tipe diatas:
              -> catch error yang berisi sesuai custom value pada rejectWithValue
              -> catch error yang sama seperti nilai error

*/

const initialState = {
  authUser: null,
  statusRegister: 'idle', // idle | loading | success | error
  errorRegister: null,
  statusLogin: 'idle', // idle | loading | success | error
  errorLogin: null,
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload.user;
    },
    unsetAuthUser: (state) => {
      state.authUser = null;
      state.statusLogin = 'idle';
      state.statusRegister = 'idle';
      api.putToken('');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLogin.pending, (state) => {
        state.statusLogin = 'loading';
        state.errorLogin = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        const payload = action.payload;
        state.authUser = payload.user;
        state.statusLogin = 'success';
        state.errorLogin = null;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        const payload = action.payload;
        state.statusLogin = 'error';
        state.errorLogin = payload ? payload.error.message : action.error.message;
      })
      .addCase(asyncRegister.pending, (state) => {
        state.statusRegister = 'loading';
        state.errorRegister = null;
      })
      .addCase(asyncRegister.fulfilled, (state) => {
        state.statusRegister = 'success';
        state.errorRegister = null;
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        const payload = action.payload;
        state.statusRegister = 'error';
        state.errorRegister = payload ? payload.error.message : action.error.message;
        /** NOTE: Disini mending buat gini daripada langsung di destructure karena kalau di destructure akan error
            CONTOH: dari async thunk karna gada return value {error}, tetapi aku mau destructure { error }.
                    Saat di if(error) akan ERROR. Karena value error ini sendiri undefined atau tidak ada.
                    Anggapannya value payload aja undefined, ini malah masuk ke childnya yang undefined juga.
        */
      });
  },
});

// Parameter func dalam creatAsyncThunk ==> ( param, thunkAPI )
const asyncLogin = createAsyncThunk('authUser/asyncLogin', async ({ email = '', password = '' }, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const token = await api.login({ email, password });
    api.putToken(token);

    const user = await api.getOwnProfile();
    return { user };
  } catch (error) {
    //ini jika ada error lain yang tidak berhubungan dengan api
    if (!error.response) {
      throw error;
    }

    return thunkAPI.rejectWithValue({ error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const asyncRegister = createAsyncThunk('users/asyncRegister', async ({ name, email, password }, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    await api.register({ name, email, password });
    return;
  } catch (error) {
    //ini jika ada error lain yang tidak berhubungan dengan api
    if (!error.response) {
      throw error;
    }

    return thunkAPI.rejectWithValue({ error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const authUserReducer = authUserSlice.reducer;
const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export default authUserReducer;
export { setAuthUser, unsetAuthUser, asyncLogin, asyncRegister };
