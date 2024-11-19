package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.SerieTV;
import marcozagaria.ZagaPass.services.SerieTVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/serietv")
public class SerieTVController {
    @Autowired
    private SerieTVService serieTVService;

    @GetMapping
    public List<SerieTV> getSerieTv() {
        return serieTVService.getSerieTv();
    }
}
