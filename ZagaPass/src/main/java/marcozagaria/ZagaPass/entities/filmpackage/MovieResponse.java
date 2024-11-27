package marcozagaria.ZagaPass.entities.filmpackage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MovieResponse {
    @JsonProperty("results")
    private List<Film> results;
    @JsonProperty("page")
    private int page;
    @JsonProperty("total_pages")
    private int totalPages;

    public MovieResponse(List<Film> results, int page, int totalPages) {
        this.results = results;
        this.page = page;
        this.totalPages = totalPages;
    }
}
