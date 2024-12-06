package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.User;
import marcozagaria.ZagaPass.exceptions.BadRequestException;
import marcozagaria.ZagaPass.payloads.NewUserDTO;
import marcozagaria.ZagaPass.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<User> findAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
                              @RequestParam(defaultValue = "id") String sortBy) {
        return this.usersService.findAll(page, size, sortBy);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getAuthenticatedUser(@AuthenticationPrincipal User authenticatedUser) {
        User user = usersService.getUserProfile(authenticatedUser);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    public User updateProfile(@AuthenticationPrincipal User currentAuthenticatedUser, @RequestBody @Validated NewUserDTO body) {
        return this.usersService.findByIdAndUpdate(currentAuthenticatedUser.getId(), body);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProfile(@AuthenticationPrincipal User currentAuthenticatedUser) {
        this.usersService.findByIdAndDelete(currentAuthenticatedUser.getId());
    }

    @GetMapping("/{userId}")
    public User findById(@PathVariable UUID userId) {
        return this.usersService.findById(userId);
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public User findByIdAndUpdate(@PathVariable UUID userId, @RequestBody @Validated NewUserDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            validationResult.getAllErrors().forEach(System.out::println);
            throw new BadRequestException("Ci sono stati errori nel payload!");
        }
        return this.usersService.findByIdAndUpdate(userId, body);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void findByIdAndDelete(@PathVariable UUID userId) {
        this.usersService.findByIdAndDelete(userId);
    }
}
