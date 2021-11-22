const initialState = [];

const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updatedContact = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updatedContact;
      return state;
    case "DELETE_CONTACT":
      const deleteContact = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      state = deleteContact;
      return state;
    default:
      return state;
  }
};

export default ContactReducer;
