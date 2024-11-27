package marcozagaria.ZagaPass.entities.animepcckage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@Getter
@Setter
public class AnimeModel extends RepresentationModel<AnimeModel> {
    @JsonProperty("mal_id")
    private long malId;
    @JsonProperty("url")
    private String url;
    @JsonProperty("title")
    private String title;
    @JsonProperty("title_english")
    private String titleEnglish;
    @JsonProperty("title_japanese")
    private String titleJapanese;
    @JsonProperty("synopsis")
    private String synopsis;
    @JsonProperty("background")
    private String background;
    @JsonProperty("airing")
    private boolean airing;
    @JsonProperty("status")
    private String status;
    @JsonProperty("duration")
    private String duration;
    @JsonProperty("rating")
    private String rating;
    @JsonProperty("score")
    private double score;
    @JsonProperty("scored_by")
    private int scoredBy;
    @JsonProperty("rank")
    private int rank;
    @JsonProperty("popularity")
    private int popularity;
    @JsonProperty("members")
    private int members;
    @JsonProperty("favorites")
    private int favorites;
    @JsonProperty("images")
    private ImageData imageData;
    @JsonProperty("trailer")
    private Trailer trailer;
}
