import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legal-page">
      <div class="legal-content">
        <h1>Nutzungsbedingungen</h1>

        <section>
          <h2>1. Geltungsbereich</h2>
          <p>Diese Nutzungsbedingungen gelten für die Nutzung der YouTube Video Tracker App (nachfolgend „App" genannt). Mit der Nutzung der App akzeptieren Sie diese Bedingungen in vollem Umfang. Wenn Sie mit diesen Bedingungen nicht einverstanden sind, dürfen Sie die App nicht nutzen.</p>
        </section>

        <section>
          <h2>2. Dienste und Funktionen</h2>
          <p>Die App bietet folgende Hauptfunktionen:</p>
          <ul>
            <li>Verwaltung und Tracking von YouTube-Videos</li>
            <li>Anzeige von Video-Statistiken</li>
            <li>Dashboard zur Übersicht über YouTube-Kanäle</li>
            <li>Widget-Funktionalität für Schnellzugriff</li>
          </ul>
          <p>Die Nutzung der App erfordert einen gültigen YouTube Data API v3 Schlüssel, den der Nutzer selbst bereitstellen muss.</p>
        </section>

        <section>
          <h2>3. YouTube API Services</h2>
          <p>Diese App nutzt die YouTube API Services. Durch die Nutzung der App stimmen Sie zu, an die <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener">YouTube Terms of Service</a> gebunden zu sein.</p>
          <p>Zusätzlich gilt:</p>
          <ul>
            <li>Die Nutzung der YouTube API Services unterliegt den <a href="https://developers.google.com/terms" target="_blank" rel="noopener">Google APIs Terms of Service</a></li>
            <li>Die Datenverarbeitung erfolgt gemäß der <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a></li>
          </ul>
        </section>

        <section>
          <h2>4. API-Schlüssel und Sicherheit</h2>
          <p>Der Nutzer ist allein verantwortlich für:</p>
          <ul>
            <li>Die sichere Aufbewahrung seines YouTube API-Schlüssels</li>
            <li>Die Einhaltung der Nutzungslimits der YouTube API</li>
            <li>Alle Aktivitäten, die unter Verwendung seines API-Schlüssels durchgeführt werden</li>
          </ul>
          <p>Die App speichert den API-Schlüssel lokal auf dem Gerät des Nutzers. Wir haben keinen Zugriff auf diesen Schlüssel.</p>
        </section>

        <section>
          <h2>5. Haftungsausschluss</h2>
          <p>Die App wird „wie besehen" und „wie verfügbar" bereitgestellt. Wir übernehmen keine Gewährleistung für:</p>
          <ul>
            <li>Die ständige Verfügbarkeit der App</li>
            <li>Die Richtigkeit und Vollständigkeit der angezeigten Daten</li>
            <li>Die Eignung der App für einen bestimmten Zweck</li>
            <li>Die Verfügbarkeit der YouTube API Services</li>
          </ul>
          <p>Die Nutzung der App erfolgt auf eigenes Risiko des Nutzers.</p>
        </section>

        <section>
          <h2>6. Datenschutz</h2>
          <p>Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß unserer <a routerLink="/privacy">Datenschutzerklärung</a>. Durch die Nutzung der App stimmen Sie der Datenverarbeitung zu.</p>
          <p>Beachten Sie, dass YouTube und Google gemäß Ihren eigenen Datenschutzrichtlinien Daten erheben können, wenn Sie die App nutzen.</p>
        </section>

        <section>
          <h2>7. Verbotene Nutzung</h2>
          <p>Es ist untersagt, die App für folgende Zwecke zu nutzen:</p>
          <ul>
            <li>Illegale Aktivitäten</li>
            <li>Verletzung von Rechten Dritter</li>
            <li>Verbreitung von Malware oder Viren</li>
            <li>Störung oder Überlastung der Infrastruktur</li>
            <li>Automatisierte Datenerfassung (Scraping) ohne Erlaubnis</li>
            <li>Umgehung von Sicherheitsvorkehrungen</li>
          </ul>
        </section>

        <section>
          <h2>8. Änderungen der Nutzungsbedingungen</h2>
          <p>Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Änderungen werden mit Veröffentlichung auf der App wirksam. Bei wesentlichen Änderungen werden wir Sie durch ein Banner oder eine Benachrichtigung in der App informieren. Die weitere Nutzung der App nach Änderungen gilt als Zustimmung zu den neuen Bedingungen.</p>
        </section>

        <section>
          <h2>9. Kündigung</h2>
          <p>Wir können den Zugang zur App jederzeit aus beliebigem Grund und ohne Vorankündigung sperren oder beenden. Dies gilt insbesondere bei Verstößen gegen diese Nutzungsbedingungen.</p>
          <p>Sie können die Nutzung der App jederzeit beenden, indem Sie die App deinstallieren und alle lokal gespeicherten Daten löschen.</p>
        </section>

        <section>
          <h2>10. Anwendbares Recht und Gerichtsstand</h2>
          <p>Diese Nutzungsbedingungen unterliegen dem Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.</p>
          <p>Sofern Sie Verbraucher sind, gilt zwingendes Verbraucherschutzrecht des Staates, in dem Sie Ihren gewöhnlichen Aufenthalt haben.</p>
          <p>Gerichtsstand für Streitigkeiten mit Unternehmern ist der Sitz des Betreibers.</p>
        </section>

        <section>
          <h2>11. Salvatorische Klausel</h2>
          <p>Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.</p>
        </section>

        <section>
          <h2>12. Kontakt</h2>
          <p>Bei Fragen zu diesen Nutzungsbedingungen können Sie uns über die im <a routerLink="/impressum">Impressum</a> angegebenen Kontaktdaten erreichen.</p>
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
    ul {
      color: #555;
      line-height: 1.6;
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }
    li {
      margin-bottom: 0.5rem;
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
export class TermsComponent {
  currentDate = new Date().toLocaleDateString('de-DE');
}
