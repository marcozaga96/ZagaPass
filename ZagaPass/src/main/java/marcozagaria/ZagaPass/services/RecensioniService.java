package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.Film;
import marcozagaria.ZagaPass.entities.Recensioni;
import marcozagaria.ZagaPass.entities.SerieTV;
import marcozagaria.ZagaPass.entities.User;
import marcozagaria.ZagaPass.exceptions.NotFoundException;
import marcozagaria.ZagaPass.payloads.RecensioniDTO;
import marcozagaria.ZagaPass.repositories.FilmRepository;
import marcozagaria.ZagaPass.repositories.RecensioniRepository;
import marcozagaria.ZagaPass.repositories.SerieTVRepository;
import marcozagaria.ZagaPass.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecensioniService {
    @Autowired
    FilmRepository filmRepository;
    @Autowired
    UsersRepository usersRepository;
    @Autowired
    private RecensioniRepository recensioniRepository;
    @Autowired
    private SerieTVRepository serieTVRepository;

    public Recensioni saveRecensione(RecensioniDTO body) {
        Optional<Film> filmFound = filmRepository.findById(body.filmID());
        if (filmFound.isEmpty()) {
            throw new NotFoundException("Film non trovato!");
        }
        Optional<SerieTV> serieTVFound = serieTVRepository.findById(body.serieTVID());
        if (serieTVFound.isEmpty()) {
            throw new NotFoundException("SerieTV non trovata!");
        }
        Optional<User> userFound = usersRepository.findById(body.userId());
        if (userFound.isEmpty()) {
            throw new NotFoundException("Utente non trovato!");
        }

        Recensioni newRecensione = new Recensioni(body.commento(),
                body.voto(),
                userFound.get(),
                filmFound.get());
        Recensioni recensioneSaved = this.recensioniRepository.save(newRecensione);
        return recensioniRepository.save(recensioneSaved);
    }

    public List<Recensioni> findByFilm(Film film) {
        return recensioniRepository.findByFilm(film);
    }

    public List<Recensioni> findBySerieTV(SerieTV serieTV) {
        return recensioniRepository.findBySerieTV(serieTV);
    }
}
