# ZagaPass

ZagaPass è una piattaforma di streaming moderna e versatile, progettata per offrire agli utenti un'esperienza coinvolgente nella fruizione di contenuti multimediali. L'applicazione consente di accedere a una vasta libreria di anime, film, serie TV e altro, integrando strumenti avanzati per interagire e personalizzare la propria esperienza.

Gli utenti possono creare un account personale per accedere a funzionalità come:
- Votare e commentare i contenuti
- Salvare i preferiti per un accesso rapido
- Personalizzare le ricerche in base alle proprie preferenze e categorie preferite

## Struttura del progetto
Il repository è organizzato come segue:

- **`.idea/`**: Configurazioni per l'IDE (ad esempio IntelliJ IDEA) utilizzato per lo sviluppo.
- **`ZagaPass/`**: Directory principale contenente i file di configurazione principali del progetto.
- **`zaga-pass/`**: Moduli secondari o funzionalità complementari del progetto.
- **`.gitattributes`**: File che gestisce impostazioni specifiche per Git.
- **`README.md`**: Documentazione del progetto (questo file).

## Requisiti
Assicurarsi di avere i seguenti strumenti installati prima di iniziare:

- **Java JDK**: Versione consigliata 11 o superiore
- **Gradle**: Per la gestione delle build
- Un IDE come IntelliJ IDEA o Eclipse
- **Git**: Per clonare e gestire il repository

## Installazione e avvio
Seguire questi passaggi per configurare e avviare il progetto:

1. **Clonare il repository:**
   ```bash
   git clone https://github.com/marcozaga96/ZagaPass.git
   ```

2. **Accedere alla directory principale del progetto:**
   ```bash
   cd ZagaPass
   ```

3. **Compilare il progetto:**
   ```bash
   ./gradlew build
   ```

4. **Avviare l'applicazione:**
   ```bash
   ./gradlew bootRun
   ```

5. **Accedere all'applicazione:**
   Aprire il browser e visitare:
   ```
   http://localhost:8080
   ```

## Funzionalità principali
ZagaPass include:

- **Streaming multimediale**: Accesso a contenuti come anime, film e serie TV
- **Account personalizzati**: Registrazione e gestione di account personali
- **Preferiti e interazione**: Aggiunta ai preferiti, commenti e voti sui contenuti
- **Ricerca avanzata**: Filtraggio dei contenuti basato su preferenze personali e categorie
- **Sicurezza dei dati**: Implementazione di misure avanzate per proteggere i dati degli utenti

## Contributi
Il contributo al progetto è ben accetto. Per partecipare:

1. **Effettuare il fork del repository:** Creare una copia personale del progetto.
2. **Creare un branch per la modifica:**
   ```bash
   git checkout -b feature/nome-feature
   ```
3. **Apportare modifiche al codice.**
4. **Committare le modifiche:**
   ```bash
   git commit -m "Descrizione della modifica"
   ```
5. **Push al repository remoto:**
   ```bash
   git push origin feature/nome-feature
   ```
6. **Aprire una Pull Request:** Richiedere l'integrazione delle modifiche nel branch principale.

## Licenza
ZagaPass è rilasciato sotto licenza MIT. Per ulteriori dettagli, consultare il file `LICENSE` presente nel repository.

## Contatti
Per segnalazioni di bug, richieste di funzionalità o ulteriori informazioni, contattare l'autore tramite il [profilo GitHub](https://github.com/marcozaga96).

---

Grazie per il tuo interesse in ZagaPass. Ogni contributo aiuta a rendere questa piattaforma migliore per tutti!
