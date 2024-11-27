package marcozagaria.ZagaPass.entities.serietvpackage;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
@Entity

public class SerieTV extends RepresentationModel<SerieTV> {
    @Id
    @Setter(AccessLevel.NONE)
    @JsonProperty("id")
    private long id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("overview")
    private String overview;
    @JsonProperty("first_air_date")
    private LocalDate firstAirDate;
    @JsonProperty("popularity")
    private double popularity;
    @JsonProperty("vote_average")
    private double voteAverage;
    @JsonProperty("vote_count")
    private int voteCount;
    @JsonProperty("original_language")
    private String originalLanguage;
    @JsonProperty("original_name")
    private String originalName;
    @JsonProperty("poster_path")
    private String posterPath;
    @JsonProperty("backdrop_path")
    private String backdropPath;
    @JsonProperty("genre_ids")
    private List<Integer> genreIds;
//    @OneToMany(mappedBy = "serieTV")
//    @JsonManagedReference
//    private List<Recensioni> recensioni;

    public SerieTV(String name, String overview, LocalDate firstAirDate, double popularity, double voteAverage, int voteCount, String originalLanguage, String originalName, String posterPath, String backdropPath, List<Integer> genreIds) {
        this.name = name;
        this.overview = overview;
        this.firstAirDate = firstAirDate;
        this.popularity = popularity;
        this.voteAverage = voteAverage;
        this.voteCount = voteCount;
        this.originalLanguage = originalLanguage;
        this.originalName = originalName;
        this.posterPath = posterPath;
        this.backdropPath = backdropPath;
        this.genreIds = genreIds;
    }
}
