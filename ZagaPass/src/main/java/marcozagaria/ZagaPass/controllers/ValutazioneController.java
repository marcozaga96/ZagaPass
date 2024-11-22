package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Valutazione;
import marcozagaria.ZagaPass.services.ValutazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
public class ValutazioneController {
    @Autowired
    private ValutazioneService valutazioneService;

    @PostMapping("/movie/{movieId}")
    public ResponseEntity<?> rateMovie(@PathVariable Long movieId, @RequestBody Valutazione valutazione) {
        try {
            valutazioneService.rateMovie(movieId, valutazione.getValue()); // Restituire una risposta JSON di successo
            return new ResponseEntity<>(new ResponseMessage("Valutazione inviata con successo!"), HttpStatus.OK);
        } catch (Exception e) { // Restituire una risposta JSON di errore
            return new ResponseEntity<>(new ResponseMessage("Errore durante l'invio della valutazione."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/tvshow/{tvShowId}")
    public ResponseEntity<?> rateTVShow(@PathVariable Long tvShowId, @RequestBody Valutazione valutazione) {
        try {
            valutazioneService.rateTVShow(tvShowId, valutazione.getValue());
            return new ResponseEntity<>(new ResponseMessage("Valutazione della serie TV inviata con successo!"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Errore durante l'invio della valutazione della serie TV."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private static class ResponseMessage {
        private String message;

        public ResponseMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
