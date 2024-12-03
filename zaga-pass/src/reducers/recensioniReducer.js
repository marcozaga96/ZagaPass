const initialState = {
  recensioniList: [],
  loading: false,
  error: null,
};

const recensioniReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECENSIONE_SUCCESS":
      console.log(
        "Aggiunta recensione avvenuta con successo: ",
        action.payload
      ); // Log del successo
      return {
        ...state,
        recensioniList: [...state.recensioniList, action.payload],
      };
    case "ADD_RECENSIONE_FAILURE":
      console.error(
        "Errore durante l'aggiunta della recensione: ",
        action.payload
      ); // Log dell'errore
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_RECENSIONI_SUCCESS":
      console.log("Recensioni recuperate con successo: ", action.payload); // Log del successo
      return {
        ...state,
        recensioniList: action.payload,
      };
    case "FETCH_RECENSIONI_FAILURE":
      console.error(
        "Errore durante il recupero delle recensioni: ",
        action.payload
      ); // Log dell'errore
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default recensioniReducer;
