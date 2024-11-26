package marcozagaria.ZagaPass.entities.animepcckage;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Anime extends RepresentationModel<Anime> {
    @Id
    @Setter(AccessLevel.NONE)
    @JsonProperty("mal_id")
    private int malId;
    @JsonProperty("url")
    private String url;
    @JsonProperty("title")
    private String title;
    @JsonProperty("title_english")
    private String titleEnglish;
    @JsonProperty("title_japanese")
    private String titleJapanese;
    @Column(length = 100000)
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
    @Embedded
    @JsonProperty("images")
    private ImageData imageData;
    @Embedded
    @JsonProperty("trailer")
    private Trailer trailer;

    public Anime(String url, Trailer trailer, ImageData imageData, String title, String titleEnglish, String titleJapanese, String synopsis, String background, boolean airing, String status, String duration, String rating, double score, int scoredBy, int rank, int popularity, int members, int favorites) {
        this.url = url;
        this.title = title;
        this.titleEnglish = titleEnglish;
        this.titleJapanese = titleJapanese;
        this.synopsis = synopsis;
        this.background = background;
        this.airing = airing;
        this.status = status;
        this.duration = duration;
        this.rating = rating;
        this.score = score;
        this.scoredBy = scoredBy;
        this.rank = rank;
        this.popularity = popularity;
        this.members = members;
        this.favorites = favorites;
        this.trailer = trailer;
        this.imageData = imageData;
    }

//    public static class ImageData {
//
//        private Image jpg;
//        private Image webp;
//
//        public static class Image {
//            private String imageUrl;
//            private String smallImageUrl;
//            private String largeImageUrl;
//        }
//    }
//
//    public static class Trailer {
//
//        private String youtubeId;
//        private TrailerImages trailerImages;
//
//        public static class TrailerImages {
//            private String imageUrl;
//            private String smallImageUrl;
//            private String mediumImageUrl;
//            private String largeImageUrl;
//            private String maximumImageUrl;
//        }
//    }
}
