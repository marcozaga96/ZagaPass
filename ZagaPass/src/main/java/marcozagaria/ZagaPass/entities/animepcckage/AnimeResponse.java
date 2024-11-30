package marcozagaria.ZagaPass.entities.animepcckage;

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
public class AnimeResponse {
    @JsonProperty("data")
    private List<Anime> data;
    @JsonProperty("page")
    private int page;
    @JsonProperty("total_pages")
    private int totalPages;

    public AnimeResponse(List<Anime> data, int page, int totalPages) {
        this.data = data;
        this.page = page;
        this.totalPages = totalPages;
    }
}
