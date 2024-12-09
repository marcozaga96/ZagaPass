package marcozagaria.ZagaPass.entities.serietvpackage;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class SerieTVDetailResponse {
    @JsonProperty("adult")
    private boolean adult;
    @JsonProperty("backdrop_path")
    private String backdropPath;
    private List<CreatedBy> createdBy;
    @JsonProperty("episode_run_time")
    private List<Integer> episodeRunTime;
    @JsonProperty("first_air_date")
    private String firstAirDate;
    private List<Genre> genres;
    private String homepage;
    private long id;
    @JsonProperty("in_production")
    private boolean inProduction;
    private List<String> languages;
    @JsonProperty("last_air_date")
    private String lastAirDate;
    @JsonProperty("last_episode_to_air")
    private LastEpisodeToAir lastEpisodeToAir;
    private String name;
    @JsonProperty("next_episode_to_air")
    private Object nextEpisodeToAir;  // Può essere null, quindi usiamo Object
    private List<Network> networks;
    @JsonProperty("number_of_episodes")
    private int numberOfEpisodes;
    @JsonProperty("number_of_seasons")
    private int numberOfSeasons;
    @JsonProperty("origin_country")
    private List<String> originCountry;
    @JsonProperty("original_language")
    private String originalLanguage;
    @JsonProperty("original_name")
    private String originalName;
    private String overview;
    private double popularity;
    @JsonProperty("poster_path")
    private String posterPath;
    private List<ProductionCompany> productionCompanies;
    private List<ProductionCountry> productionCountries;
    private List<Season> seasons;
    @JsonProperty("spoken_languages")
    private List<SpokenLanguage> spokenLanguages;
    private String status;
    private String tagline;
    private String type;
    @JsonProperty("vote_average")
    private double voteAverage;
    @JsonProperty("vote_count")
    private int voteCount;

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CreatedBy {
        private long id;
        @JsonProperty("credit_id")
        private String creditId;
        private String name;
        @JsonProperty("original_name")
        private String originalName;
        private int gender;
        @JsonProperty("profile_path")
        private String profilePath;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Genre {
        private long id;
        private String name;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class LastEpisodeToAir {
        private long id;
        private String name;
        private String overview;
        @JsonProperty("vote_average")
        private double voteAverage;
        @JsonProperty("vote_count")
        private int voteCount;
        @JsonProperty("air_date")
        private String airDate;
        @JsonProperty("episode_number")
        private int episodeNumber;
        @JsonProperty("episode_type")
        private String episodeType;
        @JsonProperty("production_code")
        private String productionCode;
        private int runtime;
        @JsonProperty("season_number")
        private int seasonNumber;
        @JsonProperty("show_id")
        private long showId;
        @JsonProperty("still_path")
        private String stillPath;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Network {
        private long id;
        @JsonProperty("logo_path")
        private String logoPath;
        private String name;
        @JsonProperty("origin_country")
        private String originCountry;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ProductionCompany {
        private long id;
        @JsonProperty("logo_path")
        private String logoPath;
        private String name;
        @JsonProperty("origin_country")
        private String originCountry;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ProductionCountry {
        @JsonProperty("iso_3166_1")
        private String iso31661;
        private String name;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Season {
        @JsonProperty("air_date")
        private String airDate;
        @JsonProperty("episode_count")
        private int episodeCount;
        private long id;
        private String name;
        private String overview;
        @JsonProperty("poster_path")
        private String posterPath;
        @JsonProperty("season_number")
        private int seasonNumber;
        @JsonProperty("vote_average")
        private double voteAverage;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SpokenLanguage {
        @JsonProperty("english_name")
        private String englishName;
        @JsonProperty("iso_639_1")
        private String iso6391;
        private String name;
    }
}


