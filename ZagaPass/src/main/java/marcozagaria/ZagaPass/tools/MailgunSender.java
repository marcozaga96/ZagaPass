package marcozagaria.ZagaPass.tools;

import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import marcozagaria.ZagaPass.entities.Pagamento;
import marcozagaria.ZagaPass.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MailgunSender {
    private String apiKey;
    private String domain;

    public MailgunSender(@Value("${mailgun.apikey}") String apiKey,
                         @Value("${mailgun.domain}") String domain) {
        this.apiKey = apiKey;
        this.domain = domain;
    }

    public void sendRegistrationEmail(User recipient) {
        HttpResponse<JsonNode> response = Unirest.post("https://api.mailgun.net/v3/" + this.domain + "/messages")
                .basicAuth("api", this.apiKey)
                .queryString("from", "marcozagaria@live.com")
                .queryString("to", recipient.getEmail())
                .queryString("subject", "Registrazione completata!")
                .queryString("text", "Benvenuto " + recipient.getName() + " sulla nostra piattaforma!")
                .asJson();
    }

    public void sendPagamentoEmail(Pagamento recipient) {
        HttpResponse<JsonNode> response = Unirest.post("https://api.mailgun.net/v3/" + this.domain + "/messages")
                .basicAuth("api", this.apiKey)
                .queryString("from", "marcozagaria@live.com")
                .queryString("to", recipient.getAbbonamento())
                .queryString("subject", "Abbonamento completato!")
                .queryString("text", "Abbonamento " + recipient.getAbbonamento() + " effettuato con successo!")
                .asJson();
    }
}
