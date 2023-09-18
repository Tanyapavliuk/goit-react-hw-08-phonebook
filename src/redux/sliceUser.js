const { createSlice } = require('@reduxjs/toolkit');

const userToken = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userEmail: '',
    name: '',
  },
  reducers: {
    setToken: (state, action) => ({ ...state, token: action.payload }),
    resetToken: state => ({ ...state, token: null }),
    setUserInfo: (state, { payload }) => ({
      ...state,
      userEmail: payload.email,
      name: payload.name,
    }),
    resetUserInfos: state => ({ ...state, userEmail: '', name: '' }),
  },
});

export const { setToken, resetToken, setUserInfo, resetUserInfos } =
  userToken.actions;
export default userToken.reducer;
