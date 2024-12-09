package marcozagaria.ZagaPass.entities.filmpackage;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieDetailResponse {
    @JsonProperty("adult")
    private boolean adult;

    @JsonProperty("backdrop_path")
    private String backdropPath;

    @JsonProperty("belongs_to_collection")
    private MovieCollection belongsToCollection;

    @JsonProperty("budget")
    private Integer budget;

    @JsonProperty("genres")
    private List<Genre> genres;

    @JsonProperty("homepage")
    private String homepage;

    @JsonProperty("id")
    private Long id;

    @JsonProperty("imdb_id")
    private String imdbId;

    @JsonProperty("original_language")
    private String originalLanguage;

    @JsonProperty("original_title")
    private String originalTitle;

    @JsonProperty("overview")
    private String overview;

    @JsonProperty("popularity")
    private Double popularity;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("production_companies")
    private List<ProductionCompany> productionCompanies;

    @JsonProperty("production_countries")
    private List<ProductionCountry> productionCountries;

    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("revenue")
    private Double revenue;

    @JsonProperty("runtime")
    private Integer runtime;

    @JsonProperty("spoken_languages")
    private List<SpokenLanguage> spokenLanguages;

    @JsonProperty("status")
    private String status;

    @JsonProperty("tagline")
    private String tagline;

    @JsonProperty("title")
    private String title;

    @JsonProperty("video")
    private boolean video;

    @JsonProperty("vote_average")
    private Double voteAverage;

    @JsonProperty("vote_count")
    private Integer voteCount;

    public MovieDetailResponse() {
    }

    public MovieDetailResponse(
            boolean adult, String backdropPath, MovieCollection belongsToCollection, Integer budget,
            List<Genre> genres, String homepage, Long id, String imdbId, String originalLanguage,
            String originalTitle, String overview, Double popularity, String posterPath,
            List<ProductionCompany> productionCompanies, List<ProductionCountry> productionCountries,
            String releaseDate, Double revenue, Integer runtime, List<SpokenLanguage> spokenLanguages,
            String status, String tagline, String title, boolean video, Double voteAverage, Integer voteCount) {
        this.adult = adult;
        this.backdropPath = backdropPath;
        this.belongsToCollection = belongsToCollection;
        this.budget = budget;
        this.genres = genres;
        this.homepage = homepage;
        this.id = id;
        this.imdbId = imdbId;
        this.originalLanguage = originalLanguage;
        this.originalTitle = originalTitle;
        this.overview = overview;
        this.popularity = popularity;
        this.posterPath = posterPath;
        this.productionCompanies = productionCompanies;
        this.productionCountries = productionCountries;
        this.releaseDate = releaseDate;
        this.revenue = revenue;
        this.runtime = runtime;
        this.spokenLanguages = spokenLanguages;
        this.status = status;
        this.tagline = tagline;
        this.title = title;
        this.video = video;
        this.voteAverage = voteAverage;
        this.voteCount = voteCount;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class MovieCollection {
        @JsonProperty("id")
        private Integer id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("poster_path")
        private String posterPath;

        @JsonProperty("backdrop_path")
        private String backdropPath;

        public MovieCollection() {
        }

        public MovieCollection(Integer id, String name, String posterPath, String backdropPath) {
            this.id = id;
            this.name = name;
            this.posterPath = posterPath;
            this.backdropPath = backdropPath;
        }
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Genre {
        @JsonProperty("id")
        private Integer id;

        @JsonProperty("name")
        private String name;

        public Genre() {
        }

        public Genre(Integer id, String name) {
            this.id = id;
            this.name = name;
        }
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ProductionCompany {
        @JsonProperty("id")
        private Integer id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("origin_country")
        private String originCountry;

        @JsonProperty("logo_path")
        private String logoPath;

        public ProductionCompany() {
        }

        public ProductionCompany(Integer id, String name, String originCountry, String logoPath) {
            this.id = id;
            this.name = name;
            this.originCountry = originCountry;
            this.logoPath = logoPath;
        }
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ProductionCountry {
        @JsonProperty("iso_3166_1")
        private String iso3166_1;

        @JsonProperty("name")
        private String name;

        public ProductionCountry() {
        }

        public ProductionCountry(String iso3166_1, String name) {
            this.iso3166_1 = iso3166_1;
            this.name = name;
        }
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SpokenLanguage {
        @JsonProperty("english_name")
        private String englishName;

        @JsonProperty("iso_639_1")
        private String iso6391;

        @JsonProperty("name")
        private String name;

        public SpokenLanguage() {
        }

        public SpokenLanguage(String englishName, String iso6391, String name) {
            this.englishName = englishName;
            this.iso6391 = iso6391;
            this.name = name;
        }
    }
}


