import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legal-page">
      <div class="legal-content">
        <h1>Impressum</h1>
        
        <section>
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>[Ihr Name/Unternehmen]</strong><br>
            [Straße und Hausnummer]<br>
            [PLZ und Ort]<br>
            Deutschland
          </p>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            Telefon: [Telefonnummer]<br>
            E-Mail: [E-Mail-Adresse]
          </p>
        </section>

        <section>
          <h2>Vertreten durch</h2>
          <p>[Name des Geschäftsführers/Inhabers]</p>
        </section>

        <section>
          <h2>Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]</p>
        </section>

        <section>
          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            [Name]<br>
            [Adresse]<br>
            [Ort]
          </p>
        </section>

        <section>
          <h2>EU-Streitschlichtung</h2>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>.</p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
        </section>

        <section>
          <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>

        <section>
          <h2>Haftung für Inhalte</h2>
          <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
        </section>

        <section>
          <h2>Haftung für Links</h2>
          <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
          <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
        </section>

        <section>
          <h2>Urheberrecht</h2>
          <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
          <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
        </section>

        <p class="last-updated">Stand: {{ currentDate }}</p>
      </div>
    </div>
  `,
  styles: [`
    .legal-page {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 2rem 1rem;
    }
    .legal-content {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #FF0000;
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }
    h2 {
      color: #333;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-size: 1.2rem;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    section {
      margin-bottom: 2rem;
    }
    a {
      color: #FF0000;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .last-updated {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
      font-size: 0.9rem;
      color: #888;
    }
  `]
})
export class ImpressumComponent {
  currentDate = new Date().toLocaleDateString('de-DE');
}
