package marcozagaria.ZagaPass.entities.animepcckage;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@Embeddable

public class Image {
    @Column(insertable = false, updatable = false)
    @JsonProperty("image_url")
    private String imageUrl;
    @Column(insertable = false, updatable = false)
    @JsonProperty("small_image_url")
    private String smallImageUrl;
    @Column(insertable = false, updatable = false)
    @JsonProperty("large_image_url")
    private String largeImageUrl;


    public Image(String imageUrl, String smallImageUrl, String largeImageUrl) {
        this.imageUrl = imageUrl;
        this.smallImageUrl = smallImageUrl;
        this.largeImageUrl = largeImageUrl;

    }
}
