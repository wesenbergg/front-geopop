export const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_USER":
      return {
        ...state,
        user: { ...action.payload }
      };
    case "SET_USER":      
      return {
        ...state,
        user: { ...action.payload }
      };
    case "SET_POS":
      return {
        ...state,
        user: { ...state.user, pos: action.payload }
      }
    case "REFETCH":      
      return {
        ...state,
        fetchData: !state.fetchData
      };
    default:
      return state;
  }
};

export const initUser = () => {
  const userFromStorage = localStorage.getItem("geopopUser")
  // console.log('uFromStorage', userFromStorage);
  if (!userFromStorage || userFromStorage === 'undefined') return { type: "NO_USER" };
  return { type: "INIT_USER", payload: JSON.parse(userFromStorage) };
};

export const setUser = (newUser) => {
  console.log(newUser);
  localStorage.setItem("geopopUser", JSON.stringify(newUser))
  return { type: "SET_USER", payload: newUser };
};

export const setPos = (newPosition) => {
  return { type: "SET_POS", payload: newPosition };
};

export const reFetch = () => {
  return { type: "REFETCH" };
};