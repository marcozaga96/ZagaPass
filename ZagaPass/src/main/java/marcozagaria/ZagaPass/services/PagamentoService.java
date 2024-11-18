package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.Abbonamento;
import marcozagaria.ZagaPass.entities.Pagamento;
import marcozagaria.ZagaPass.entities.User;
import marcozagaria.ZagaPass.repositories.PagamentoRespository;
import marcozagaria.ZagaPass.tools.MailgunSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PagamentoService {
    @Autowired
    PagamentoRespository pagamentoRespository;
    @Autowired
    MailgunSender mailgunSender;

    public Pagamento savePagamento(Pagamento pagamento) {
        return pagamentoRespository.save(pagamento);
    }

    public Optional<Pagamento> findById(UUID id) {
        return pagamentoRespository.findById(id);
    }

    public List<Pagamento> findByUser(User user) {
        return pagamentoRespository.findByUser(user);
    }

    public Pagamento createPagamento(User user, Abbonamento type) {
        Pagamento subscription = new Pagamento();
        subscription.setUser(user);
        subscription.setAbbonamento(type);
        subscription.setDataInizioAbbonamento(LocalDate.now());
        subscription.setDataFineAbbonamento(calcolaFineAbbonamento(type));
        mailgunSender.sendPagamentoEmail(subscription);
        return savePagamento(subscription);
    }

    private LocalDate calcolaFineAbbonamento(Abbonamento type) {
        switch (type) {
            case SETTIMANALE:
                return LocalDate.now().plusWeeks(1);
            case MENSILE:
                return LocalDate.now().plusMonths(1);
            case ANNUALE:
                return LocalDate.now().plusYears(1);
            default:
                throw new IllegalArgumentException("Tipo abbonamento non valido");
        }
    }
}
