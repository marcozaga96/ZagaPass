const initialState = {
  favoritesList: [],
  loading: false,
  error: null,
};

const preferitiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FAVORITES": // Nuovo caso per gestire il recupero dei preferiti
      return {
        ...state,
        favoritesList: action.payload, // Aggiungi i preferiti ricevuti
        loading: false, // Assicurati di settare il loading su false dopo il caricamento
      };
    case "ADD_FAVORITE_SUCCESS":
      return {
        ...state,
        favoritesList: [...state.favoritesList, action.payload],
      };
    case "REMOVE_FAVORITE_SUCCESS":
      return {
        ...state,
        favoritesList: state.favoritesList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "ADD_FAVORITE_FAILURE":
    case "REMOVE_FAVORITE_FAILURE":
    case "SET_FAVORITES_ERROR": // Aggiungi un'azione per gestire errori nei preferiti
      return {
        ...state,
        error: action.payload, // Salva l'errore nel state
        loading: false, // Assicurati che il loading sia disabilitato in caso di errore
      };
    case "SET_FAVORITES_LOADING": // Aggiungi un'azione di caricamento
      return {
        ...state,
        loading: true, // Imposta il loading su true quando si sta caricando i preferiti
      };

    default:
      return state;
  }
};

export default preferitiReducer;
