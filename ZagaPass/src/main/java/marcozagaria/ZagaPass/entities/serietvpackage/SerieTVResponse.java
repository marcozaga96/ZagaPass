package marcozagaria.ZagaPass.entities.serietvpackage;

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
public class SerieTVResponse {
    @JsonProperty("page")
    private int page;
    @JsonProperty("total_pages")
    private int totalPages;
    @JsonProperty("results")
    private List<SerieTV> results;

    public SerieTVResponse(int page, int totalPages, List<SerieTV> results) {
        this.page = page;
        this.totalPages = totalPages;
        this.results = results;
    }
}
