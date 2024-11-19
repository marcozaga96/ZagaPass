package marcozagaria.ZagaPass.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "film")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;
    @JsonProperty("title")
    private String title;
    @JsonProperty("overview")
    @Column(length = 100000)
    private String overview;
    @JsonProperty("release_date")
    private LocalDate releaseDate;
    @JsonProperty("popularity")
    private double popularity;
    @JsonProperty("vote_average")
    private double voteAverage;
    @JsonProperty("vote_count")
    private int voteCount;
    @JsonProperty("original_language")
    private String originalLanguage;
    @JsonProperty("original_title")
    private String originalTitle;
    @JsonProperty("poster_path")
    private String posterPath;
    @JsonProperty("backdrop_path")
    private String backdropPath;
    @JsonProperty("adult")
    private boolean adult;
    @JsonProperty("video")
    private boolean video;
    @ElementCollection
    @JsonProperty("genre_ids")
    private List<Integer> genreIds;

    public Film(String title, String overview, LocalDate releaseDate, double popularity, double voteAverage, int voteCount, String originalLanguage, String originalTitle, String posterPath, String backdropPath, boolean adult, boolean video, List<Integer> genreIds) {
        this.title = title;
        this.overview = overview;
        this.releaseDate = releaseDate;
        this.popularity = popularity;
        this.voteAverage = voteAverage;
        this.voteCount = voteCount;
        this.originalLanguage = originalLanguage;
        this.originalTitle = originalTitle;
        this.posterPath = posterPath;
        this.backdropPath = backdropPath;
        this.adult = adult;
        this.video = video;
        this.genreIds = genreIds;
    }
}
