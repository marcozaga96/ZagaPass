package marcozagaria.ZagaPass.entities.animepcckage;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Embeddable
public class ImageData {
    @JsonProperty("jpg")
    private Image jpg;
    @JsonProperty("webp")
    private Image webp;

    public ImageData(Image jpg, Image webp) {
        this.jpg = jpg;
        this.webp = webp;
    }
}
