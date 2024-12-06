package marcozagaria.ZagaPass.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record NewUserDTO(
        @NotEmpty(groups = NewUserDTO.CreateGroup.class, message = "Il nome proprio è obbligatorio!")
        @Size(min = 2, max = 40, message = "Il nome proprio deve essere compreso tra 2 e 40 caratteri!")
        String name,
        @NotEmpty(groups = NewUserDTO.CreateGroup.class, message = "Il cognome proprio è obbligatorio!")
        @Size(min = 2, max = 40, message = "Il cognome deve essere compreso tra 2 e 40 caratteri!")
        String surname,
        @NotEmpty(groups = NewUserDTO.CreateGroup.class, message = "L'email è un campo obbligatorio!")
        @Email(message = "L'email inserita non è un'email valida")
        String email,
        @NotEmpty(groups = NewUserDTO.CreateGroup.class, message = "La password è un campo obbligatorio!")
        @Size(min = 4, message = "La password deve avere almeno 4 caratteri!")
        // @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$")
        String password) {
    public interface CreateGroup {
    }

    public interface UpdateGroup {
    }
}
