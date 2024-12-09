package marcozagaria.ZagaPass.entities.animepcckage;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AnimeFullResponse {
    @JsonProperty("data")
    private AnimeData data;

    public AnimeFullResponse() {
    }

    public AnimeFullResponse(AnimeData data) {
        this.data = data;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AnimeData {
        @JsonProperty("mal_id")
        private int malId;

        @JsonProperty("url")
        private String url;

        @JsonProperty("images")
        private AnimeImages images;

        @JsonProperty("trailer")
        private AnimeTrailer trailer;

        @JsonProperty("approved")
        private boolean approved;

        @JsonProperty("titles")
        private List<AnimeTitle> titles;

        @JsonProperty("title")
        private String title;

        @JsonProperty("title_english")
        private String titleEnglish;

        @JsonProperty("title_japanese")
        private String titleJapanese;

        @JsonProperty("title_synonyms")
        private List<String> titleSynonyms;

        @JsonProperty("type")
        private String type;

        @JsonProperty("source")
        private String source;

        @JsonProperty("episodes")
        private Integer episodes;

        @JsonProperty("status")
        private String status;

        @JsonProperty("airing")
        private boolean airing;

        @JsonProperty("aired")
        private Aired aired;

        @JsonProperty("duration")
        private String duration;

        @JsonProperty("rating")
        private String rating;

        @JsonProperty("score")
        private Double score;

        @JsonProperty("scored_by")
        private Integer scoredBy;

        @JsonProperty("rank")
        private Integer rank;

        @JsonProperty("popularity")
        private Integer popularity;

        @JsonProperty("members")
        private Integer members;

        @JsonProperty("favorites")
        private Integer favorites;

        @JsonProperty("synopsis")
        private String synopsis;

        @JsonProperty("background")
        private String background;

        @JsonProperty("season")
        private String season;

        @JsonProperty("year")
        private Integer year;

        @JsonProperty("broadcast")
        private Broadcast broadcast;

        @JsonProperty("producers")
        private List<StudioOrProducer> producers;

        @JsonProperty("licensors")
        private List<StudioOrProducer> licensors;

        @JsonProperty("studios")
        private List<StudioOrProducer> studios;

        @JsonProperty("genres")
        private List<GenreOrTheme> genres;

        @JsonProperty("explicit_genres")
        private List<GenreOrTheme> explicitGenres;

        @JsonProperty("themes")
        private List<GenreOrTheme> themes;

        @JsonProperty("demographics")
        private List<GenreOrTheme> demographics;

        @JsonProperty("relations")
        private List<Relation> relations;

        @JsonProperty("theme")
        private Theme theme;

        @JsonProperty("external")
        private List<ExternalLink> external;

        @JsonProperty("streaming")
        private List<Streaming> streaming;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AnimeImages {
        @JsonProperty("jpg")
        private AnimeImageUrls jpg;

        @JsonProperty("webp")
        private AnimeImageUrls webp;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AnimeImageUrls {
        @JsonProperty("image_url")
        private String imageUrl;

        @JsonProperty("small_image_url")
        private String smallImageUrl;

        @JsonProperty("large_image_url")
        private String largeImageUrl;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AnimeTrailer {
        @JsonProperty("youtube_id")
        private String youtubeId;

        @JsonProperty("url")
        private String url;

        @JsonProperty("embed_url")
        private String embedUrl;

        @JsonProperty("images")
        private TrailerImages images;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class TrailerImages {
        @JsonProperty("image_url")
        private String imageUrl;

        @JsonProperty("small_image_url")
        private String smallImageUrl;

        @JsonProperty("medium_image_url")
        private String mediumImageUrl;

        @JsonProperty("large_image_url")
        private String largeImageUrl;

        @JsonProperty("maximum_image_url")
        private String maximumImageUrl;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AnimeTitle {
        @JsonProperty("type")
        private String type;

        @JsonProperty("title")
        private String title;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Aired {
        @JsonProperty("from")
        private String from;

        @JsonProperty("to")
        private String to;

        @JsonProperty("prop")
        private AiredProp prop;

        @JsonProperty("string")
        private String string;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AiredProp {
        @JsonProperty("from")
        private AiredDate from;

        @JsonProperty("to")
        private AiredDate to;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AiredDate {
        @JsonProperty("day")
        private Integer day;

        @JsonProperty("month")
        private Integer month;

        @JsonProperty("year")
        private Integer year;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Broadcast {
        @JsonProperty("day")
        private String day;

        @JsonProperty("time")
        private String time;

        @JsonProperty("timezone")
        private String timezone;

        @JsonProperty("string")
        private String string;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class StudioOrProducer {
        @JsonProperty("mal_id")
        private int malId;

        @JsonProperty("type")
        private String type;

        @JsonProperty("name")
        private String name;

        @JsonProperty("url")
        private String url;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class GenreOrTheme {
        @JsonProperty("mal_id")
        private int malId;

        @JsonProperty("type")
        private String type;

        @JsonProperty("name")
        private String name;

        @JsonProperty("url")
        private String url;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Relation {
        @JsonProperty("relation")
        private String relation;

        @JsonProperty("entry")
        private List<RelatedEntry> entry;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class RelatedEntry {
        @JsonProperty("mal_id")
        private int malId;

        @JsonProperty("type")
        private String type;

        @JsonProperty("name")
        private String name;

        @JsonProperty("url")
        private String url;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Theme {
        @JsonProperty("openings")
        private List<String> openings;

        @JsonProperty("endings")
        private List<String> endings;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ExternalLink {
        @JsonProperty("name")
        private String name;

        @JsonProperty("url")
        private String url;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Streaming {
        @JsonProperty("name")
        private String name;

        @JsonProperty("url")
        private String url;

    }
}



