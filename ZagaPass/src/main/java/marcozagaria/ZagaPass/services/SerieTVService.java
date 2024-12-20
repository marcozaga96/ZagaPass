package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.Video;
import marcozagaria.ZagaPass.entities.VideoResponse;
import marcozagaria.ZagaPass.entities.serietvpackage.SerieTV;
import marcozagaria.ZagaPass.entities.serietvpackage.SerieTVDetailResponse;
import marcozagaria.ZagaPass.entities.serietvpackage.SerieTVResponse;
import marcozagaria.ZagaPass.repositories.SerieTVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SerieTVService {
    private static final String API_URL = "https://api.themoviedb.org/3/discover/tv";
    private static final String SEARCH_API_URL = "https://api.themoviedb.org/3/search/tv";
    private static final String NOW_PLAYING_URL = "https://api.themoviedb.org/3/discover/tv?sort_by=vote_count.desc";
    private static final String TOP_URL = "https://api.themoviedb.org/3/tv/top_rated";
    private static final String API_KEY = "2f3bd3e37f32b5ad4602ce2b7150af6e";
    private static final String VIDEOS_URL = "https://api.themoviedb.org/3/tv/{tvShowId}/videos";
    private static final String DETAILS_URL = "https://api.themoviedb.org/3/tv/{series_id}";
    private static final int MAX_PAGES = 500;

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private SerieTVRepository serieTVRepository;

    public Page<SerieTV> getSerieTv(String sortBy, String year, String genre, String query, Pageable pageable) {
        List<SerieTV> allSerieTv = new ArrayList<>();
        int page = pageable.getPageNumber() + 1;
        int size = pageable.getPageSize();
        boolean morePages = true;
        while (morePages && page <= MAX_PAGES && allSerieTv.size() < size * pageable.getPageNumber() + size) {
            UriComponentsBuilder uriBuilder;
            if (query != null && !query.isEmpty()) {
                uriBuilder = UriComponentsBuilder.fromHttpUrl(SEARCH_API_URL).queryParam("api_key", API_KEY).
                        queryParam("language", "it-IT")
                        .queryParam("page", page)
                        .queryParam("query", query);
            } else {
                uriBuilder = UriComponentsBuilder.fromHttpUrl(API_URL).queryParam("api_key", API_KEY)
                        .queryParam("include_null_first_air_dates", false)
                        .queryParam("language", "it-IT")
                        .queryParam("page", page)
                        .queryParam("sort_by", sortBy);
                if (year != null && !year.isEmpty()) {
                    uriBuilder.queryParam("first_air_date_year", year);
                }
                if (genre != null && !genre.isEmpty()) {
                    uriBuilder.queryParam("with_genres", genre);
                }
            }

            String url = uriBuilder.toUriString();
            SerieTVResponse serieTVResponse = restTemplate.getForObject(url, SerieTVResponse.class);
            if (serieTVResponse != null && serieTVResponse.getResults() != null) {
                allSerieTv.addAll(serieTVResponse.getResults());
                if (page >= serieTVResponse.getTotalPages() || page >= MAX_PAGES) {
                    morePages = false;
                } else {
                    page++;
                }
            } else {
                morePages = false;
            }
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allSerieTv.size());
        List<SerieTV> serieTVPage = allSerieTv.subList(start, end);
        return new PageImpl<>(serieTVPage, pageable, allSerieTv.size());
    }

    public Page<SerieTV> getNowPlayingSerieTV(Pageable pageable) {
        List<SerieTV> nowPlayingSerieTV = new ArrayList<>();
        int page = pageable.getPageNumber() + 1;
        int size = pageable.getPageSize();
        boolean morePages = true;
        while (morePages && page <= MAX_PAGES && nowPlayingSerieTV.size() < size * pageable.getPageNumber() + size) {
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(NOW_PLAYING_URL)
                    .queryParam("first_air_date.gte", LocalDate.now().getMonth())
                    .queryParam("api_key", API_KEY)
                    .queryParam("language", "it-IT")
                    .queryParam("page", page);
            String url = uriBuilder.toUriString();
            SerieTVResponse serieTVResponse = restTemplate.getForObject(url, SerieTVResponse.class);
            if (serieTVResponse != null && serieTVResponse.getResults() != null) {
                nowPlayingSerieTV.addAll(serieTVResponse.getResults());
                if (page >= serieTVResponse.getTotalPages() || page >= MAX_PAGES) {
                    morePages = false;
                } else {
                    page++;
                }
            } else {
                morePages = false;
            }
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), nowPlayingSerieTV.size());
        List<SerieTV> nowPlayingPage = nowPlayingSerieTV.subList(start, end);
        return new PageImpl<>(nowPlayingPage, pageable, nowPlayingSerieTV.size());
    }

    public Page<SerieTV> getTopSerieTV(Pageable pageable) {
        List<SerieTV> nowPlayingSerieTV = new ArrayList<>();
        int page = pageable.getPageNumber() + 1;
        int size = pageable.getPageSize();
        boolean morePages = true;
        while (morePages && page <= MAX_PAGES && nowPlayingSerieTV.size() < size * pageable.getPageNumber() + size) {
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(TOP_URL)
                    .queryParam("api_key", API_KEY)
                    .queryParam("language", "it-IT")
                    .queryParam("page", page);
            String url = uriBuilder.toUriString();
            SerieTVResponse serieTVResponse = restTemplate.getForObject(url, SerieTVResponse.class);
            if (serieTVResponse != null && serieTVResponse.getResults() != null) {
                nowPlayingSerieTV.addAll(serieTVResponse.getResults());
                if (page >= serieTVResponse.getTotalPages() || page >= MAX_PAGES) {
                    morePages = false;
                } else {
                    page++;
                }
            } else {
                morePages = false;
            }
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), nowPlayingSerieTV.size());
        List<SerieTV> nowPlayingPage = nowPlayingSerieTV.subList(start, end);
        return new PageImpl<>(nowPlayingPage, pageable, nowPlayingSerieTV.size());
    }

    public List<Video> getSerieTVVideos(Long serieTVId) {
        String videosUrl = UriComponentsBuilder.fromHttpUrl(VIDEOS_URL).queryParam("api_key", API_KEY)
                .queryParam("language", "it-IT")
                .buildAndExpand(serieTVId).toUriString();
        VideoResponse videoResponse = restTemplate.getForObject(videosUrl, VideoResponse.class);
        return videoResponse != null ? videoResponse.getResults() : null;
    }

    public String getTrailerUrl(Long serieTVId) {
        List<Video> videos = getSerieTVVideos(serieTVId);
        if (videos != null) {
            for (Video video : videos) {
                if ("Trailer".equals(video.getType())) {
                    return "https://www.youtube.com/embed/" + video.getKey() + "?autoplay=1";
                }
            }
        }
        return null;
    }


    public Optional<SerieTVDetailResponse> getSerieTVDetails(Long serieTVId) {
        String url = UriComponentsBuilder.fromHttpUrl(DETAILS_URL)
                .queryParam("api_key", API_KEY)
                .queryParam("language", "it-IT")
                .buildAndExpand(serieTVId)
                .toUriString();

        SerieTVDetailResponse serieTVDetailResponse = restTemplate.getForObject(url, SerieTVDetailResponse.class);

        return serieTVDetailResponse != null ? Optional.of(serieTVDetailResponse) : Optional.empty();
    }

    public Optional<SerieTV> findById(long id) {
        return serieTVRepository.findById(id);
    }
}
