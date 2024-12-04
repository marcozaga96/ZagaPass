package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.Preferiti;
import marcozagaria.ZagaPass.entities.User;
import marcozagaria.ZagaPass.exceptions.NotFoundException;
import marcozagaria.ZagaPass.payloads.PreferitiDTO;
import marcozagaria.ZagaPass.repositories.PreferitiRepository;
import marcozagaria.ZagaPass.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PreferitiService {
    @Autowired
    private PreferitiRepository preferitiRepository;
    @Autowired
    private UsersRepository usersRepository;

    public Preferiti addPreferiti(PreferitiDTO body) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        System.out.println("Utente autenticato: " + userEmail);
        Optional<User> userFound = usersRepository.findByEmail(userEmail);
        if (userFound.isEmpty()) {
            throw new NotFoundException("Utente non trovato!");
        }
        Preferiti newPreferiti = new Preferiti(userFound.get(), body.mediaId(), body.mediaType());

        return preferitiRepository.save(newPreferiti);
    }

    public void removePreferiti(Long id) {
        preferitiRepository.deleteById(id);
    }

    public List<Preferiti> getPreferiti() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        System.out.println("Utente autenticato: " + userEmail);
        Optional<User> userFound = usersRepository.findByEmail(userEmail);
        if (userFound.isEmpty()) {
            throw new NotFoundException("Utente non trovato!");
        }
        return preferitiRepository.findByUserId(userFound.get().getId());
    }

    public List<Preferiti> getPreferitiByUserId(UUID userId) {
        return preferitiRepository.findByUserId(userId);
    }
}
