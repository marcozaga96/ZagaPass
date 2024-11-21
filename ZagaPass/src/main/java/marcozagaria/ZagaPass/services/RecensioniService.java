package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.repositories.FilmRepository;
import marcozagaria.ZagaPass.repositories.RecensioniRepository;
import marcozagaria.ZagaPass.repositories.SerieTVRepository;
import marcozagaria.ZagaPass.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

//    public Recensioni saveRecensione(RecensioniDTO body) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userEmail = authentication.getName();
//        System.out.println("Utente autenticato: " + userEmail);
//
//
//        Optional<Film> filmFound = Optional.empty();
//        if (body.filmID() != null) {
//            filmFound = filmRepository.findById(body.filmID());
//            if (filmFound.isEmpty()) {
//                throw new NotFoundException("Film non trovato!");
//            }
//        }
//
//        Optional<SerieTV> serieTVFound = Optional.empty();
//        if (body.serieTVId() != null) {
//            serieTVFound = serieTVRepository.findById(body.serieTVId());
//            if (serieTVFound.isEmpty()) {
//                throw new NotFoundException("SerieTV non trovata!");
//            }
//        }
//
//        Optional<User> userFound = usersRepository.findByEmail(userEmail);
//        if (userFound.isEmpty()) {
//            throw new NotFoundException("Utente non trovato!");
//        }
//        Recensioni newRecensione = new Recensioni(
//                body.commento(),
//                body.voto(),
//                userFound.get()
//        );
//        filmFound.ifPresent(newRecensione::setFilm);
//        serieTVFound.ifPresent(newRecensione::setSerieTV);
//
//        return recensioniRepository.save(newRecensione);
//    }

//    public List<Recensioni> findByFilmId(Film film) {
//        return recensioniRepository.findByFilmId(film);
//    }
//
//    public List<Recensioni> findBySerieTVId(SerieTV serieTV) {
//        return recensioniRepository.findBySerieTVId(serieTV);
//    }
}
