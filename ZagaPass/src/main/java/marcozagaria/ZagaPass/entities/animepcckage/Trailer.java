package marcozagaria.ZagaPass.entities.animepcckage;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Embeddable


public class Trailer {

    @JsonProperty("youtube_id")
    private String youtubeId;
    @Column(insertable = false, updatable = false)
    @JsonProperty("url")
    private String url;
    @JsonProperty("embed_url")
    private String embedUrl;
    @Embedded
    @JsonProperty("images")
    private Image image;


    public Trailer(String youtubeId, String url, String embedUrl, Image image) {
        this.youtubeId = youtubeId;
        this.url = url;
        this.embedUrl = embedUrl;
        this.image = image;
    }
}
