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

    public AnimeResponse(List<Anime> data) {
        this.data = data;
    }
}
