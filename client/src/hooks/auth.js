import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      localStorage.clear();
      state.user = others;
      state.token = action?.payload?.token;
      console.log('Logged in user:', state.user);
      console.log('Token:', state.token);
    },
    register(state, action) {
      localStorage.clear();
      state.user = action?.payload?.others;
      state.token = action?.payload?.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
      console.log('Logged out');
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export default authSlice.reducer;
