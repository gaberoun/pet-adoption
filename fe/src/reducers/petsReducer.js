export const initialPets = localStorage.getItem("pets")
  ? JSON.parse(localStorage.getItem("pets"))
  : [];

export const petsReducer = (state, action) => {
  switch (action.type) {
    case "PETS_LIST":
      return action.payload;
    case "PETS_ADD":
      return [action.payload, ...state];
    case "PETS_REMOVE":
      const filtered = state.filter(pet => pet._id != action.payload);
      return filtered;
    default:
      return state;
  }
};
