export const handelPanding = (state, _) => ({
  ...state,
  isLoading: true,
});

export const handelRejected = (state, action) => ({
  ...state,
  isLoading: false,
  error: action.payload,
});
