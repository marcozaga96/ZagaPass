package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.Recensioni;
import marcozagaria.ZagaPass.entities.User;
import marcozagaria.ZagaPass.exceptions.NotFoundException;
import marcozagaria.ZagaPass.payloads.RecensioniDTO;
import marcozagaria.ZagaPass.repositories.AnimeRepository;
import marcozagaria.ZagaPass.repositories.FilmRepository;
import marcozagaria.ZagaPass.repositories.RecensioniRepository;
import marcozagaria.ZagaPass.repositories.SerieTVRepository;
import marcozagaria.ZagaPass.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecensioniService {
    @Autowired
    private FilmRepository filmRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private RecensioniRepository recensioniRepository;
    @Autowired
    private SerieTVRepository serieTVRepository;
    @Autowired
    private AnimeRepository animeRepository;

    public Recensioni saveRecensione(RecensioniDTO body) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        System.out.println("Utente autenticato: " + userEmail);

        Optional<User> userFound = usersRepository.findByEmail(userEmail);
        if (userFound.isEmpty()) {
            throw new NotFoundException("Utente non trovato!");
        }
        Recensioni newRecensione = new Recensioni(
                body.commento(),
                body.voto(),
                userFound.get()
        );

        if ("film".equals(body.mediaType())) {
            newRecensione.setFilmId(body.mediaId());
            System.out.println("Impostato filmId: " + body.mediaId());
        } else if ("anime".equals(body.mediaType())) {
            newRecensione.setAnimeMalId(body.mediaId());
            System.out.println("Impostato animeId: " + body.mediaId());
        } else if ("serieTV".equals(body.mediaType())) {
            newRecensione.setSerieTVId(body.mediaId());
            System.out.println("Impostato serietvId: " + body.mediaId());
        }

        return recensioniRepository.save(newRecensione);
    }

    public List<RecensioniDTO> findByMediaIdAndType(Long mediaId, String mediaType) {
        List<Recensioni> recensioni;

        switch (mediaType) {
            case "film":
                recensioni = recensioniRepository.findByFilmId(mediaId);
                break;
            case "serieTV":
                recensioni = recensioniRepository.findBySerieTVId(mediaId);
                break;
            case "anime":
                recensioni = recensioniRepository.findByAnimeMalId(mediaId);
                break;
            default:
                throw new IllegalArgumentException("Tipo di media non valido: " + mediaType);
        }

        return recensioni.stream()
                .map(recensione -> new RecensioniDTO(
                        switch (mediaType) {
                            case "film" -> recensione.getFilmId();
                            case "serieTV" -> recensione.getSerieTVId();
                            case "anime" -> recensione.getAnimeMalId();
                            default -> throw new IllegalArgumentException("Tipo di media non valido: " + mediaType);
                        },
                        mediaType,
                        recensione.getCommento(),
                        recensione.getVoto(),
                        recensione.getUser().getUsername()
                ))
                .toList();
    }


//    public List<Recensioni> findByFilmId(Long film) {
//        return recensioniRepository.findByFilmId(film);
//    }
//
//    public List<Recensioni> findBySerieTVId(Long serieTV) {
//        return recensioniRepository.findBySerieTVId(serieTV);
//    }
//
//    public List<Recensioni> findByAnimeMalId(Long anime) {
//        return recensioniRepository.findByAnimeMalId(anime);
//    }
}
