package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Abbonamento;
import marcozagaria.ZagaPass.entities.Pagamento;
import marcozagaria.ZagaPass.entities.User;
import marcozagaria.ZagaPass.services.PagamentoService;
import marcozagaria.ZagaPass.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pagamenti")
public class PagamentoController {
    @Autowired
    PagamentoService pagamentoService;
    @Autowired
    UsersService usersService;


    @PostMapping("/create")
    public ResponseEntity<Pagamento> createSubscription(@RequestParam UUID userId, @RequestParam Abbonamento type) {
        User user = usersService.findById(userId);
        Pagamento pagamento = pagamentoService.createPagamento(user, type);
        return ResponseEntity.ok(pagamento);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Pagamento>> getUserSubscriptions(@PathVariable UUID userId) {
        User user = usersService.findById(userId);
        List<Pagamento> pagamento = pagamentoService.findByUser(user);
        return ResponseEntity.ok(pagamento);
    }
}
