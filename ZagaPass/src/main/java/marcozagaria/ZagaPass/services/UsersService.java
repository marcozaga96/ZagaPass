package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.User;
import marcozagaria.ZagaPass.exceptions.BadRequestException;
import marcozagaria.ZagaPass.exceptions.NotFoundException;
import marcozagaria.ZagaPass.payloads.NewUserDTO;
import marcozagaria.ZagaPass.repositories.UsersRepository;
import marcozagaria.ZagaPass.tools.MailgunSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private PasswordEncoder bcrypt;
    @Autowired
    private MailgunSender mailgunSender;

    public User save(NewUserDTO body) {
        this.usersRepository.findByEmail(body.email()).ifPresent(
                user -> {
                    throw new BadRequestException("Email " + body.email() + " già in uso!");
                }
        );
        User newUser = new User(body.name(), body.surname(), body.email(), bcrypt.encode(body.password()),
                "https://ui-avatars.com/api/?name=" + body.name() + "+" + body.surname());
        User savedUser = this.usersRepository.save(newUser);
        mailgunSender.sendRegistrationEmail(savedUser);
        return savedUser;
    }

    public Page<User> findAll(int page, int size, String sortBy) {
        if (size > 100)
            size = 100;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return this.usersRepository.findAll(pageable);
    }

    public User getUserProfile(User user) {
        return this.usersRepository.findById(user.getId())
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }

    public User findById(UUID userId) {
        return this.usersRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId));
    }


    public User findByIdAndUpdate(UUID userId, NewUserDTO body) {
        User found = this.findById(userId);
        if (!found.getEmail().equals(body.email())) {
            this.usersRepository.findByEmail(body.email()).ifPresent(
                    user -> {
                        throw new BadRequestException("Email " + body.email() + " già in uso!");
                    }
            );
        }

        found.setName(body.name());
        found.setSurname(body.surname());
        found.setEmail(body.email());
        if (body.password() != null && !body.password().isEmpty()) {
            found.setPassword(body.password());
        }
        found.setAvatarURL("https://ui-avatars.com/api/?name=" + body.name() + "+" + body.surname());

        return this.usersRepository.save(found);
    }

    public void findByIdAndDelete(UUID userId) {
        User found = this.findById(userId);
        this.usersRepository.delete(found);
    }

    public User findByEmail(String email) {
        return this.usersRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("L'utente con email " + email + " non è stato trovato"));
    }


}
