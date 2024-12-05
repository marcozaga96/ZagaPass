package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Preferiti;
import marcozagaria.ZagaPass.payloads.PreferitiDTO;
import marcozagaria.ZagaPass.services.PreferitiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/preferiti")
public class PreferitiController {
    @Autowired
    private PreferitiService preferitiService;

    @PostMapping("/add")
    public ResponseEntity<Preferiti> addPreferiti(@RequestBody PreferitiDTO body) {
        return ResponseEntity.ok(preferitiService.addPreferiti(body));
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> removePreferiti(@PathVariable Long id) {
        preferitiService.removePreferiti(id);
        return ResponseEntity.ok("Preferito eliminato con successo!");
    }

    @GetMapping("/list")
    public ResponseEntity<List<PreferitiDTO>> getPreferiti() {
        List<PreferitiDTO> preferiti = preferitiService.getPreferiti()
                .stream()
                .map(preferito -> new PreferitiDTO(preferito.getMediaId(), preferito.getMediaType()))
                .toList();
        return ResponseEntity.ok(preferiti);
    }

    
}
