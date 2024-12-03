import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecensione,
  fetchRecensioniPerMedia,
} from "../action/recensioniActions";

const CommentSection = ({ mediaId, mediaType }) => {
  const [text, setText] = useState("");
  const [voto, setVoto] = useState(0);
  const recensioni = useSelector((state) => state.recensioni.recensioniList);
  const email = useSelector((state) => state.auth.email); // Recupera l'email dallo stato di autenticazione
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecensioniPerMedia(mediaId, mediaType));
  }, [dispatch, mediaId, mediaType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecensione = { mediaId, mediaType, commento: text, voto };
    console.log("Invio nuova recensione: ", newRecensione); // Log del nuovo commento
    dispatch(addRecensione(newRecensione));
    setText("");
    setVoto(0);
  };

  return (
    <div>
      <h3>Recensioni</h3>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Commento"
            required
          ></textarea>
          <input
            type="number"
            value={voto}
            onChange={(e) => setVoto(Number(e.target.value))}
            placeholder="Voto"
            required
            min="0"
            max="10"
          />
          <button type="submit">Aggiungi Recensione</button>
        </form>
      ) : (
        <p>Effettua il login per aggiungere una recensione.</p>
      )}
      <ul>
        {recensioni.map((recensione) => (
          <li key={recensione.id}>
            <strong>{email || "Anonimo"}</strong>: {recensione.commento}{" "}
            <em>{new Date(recensione.data).toLocaleDateString()}</em>{" "}
            <span>Voto: {recensione.voto}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
