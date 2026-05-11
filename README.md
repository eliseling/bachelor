# Beslutningsstøtteverktøy for palliativt pasientforløp

## 1. Introduksjon

Dette prosjektet er et web-basert beslutningsstøtteverktøy utviklet for helsepersonell i palliativ omsorg. Verktøyet legger til rette for strukturert informasjon om identifisering, igangsetting, hjemmetid og hjemmedød, samt samhandling mellom sentrale aktører i pasientforløpet.

## 2. Bakgrunn og problemstilling

Palliativ omsorg krever god koordinering, tydelig kommunikasjon og rask tilgang til relevant faginformasjon. Mange helsearbeidere opplever at det mangler et enkelt, digitalt hjelpemiddel som gir oversikt over:
- pasientforløpets hovedfaser
- samhandling mellom fagpersoner
- rutiner ved hjemmetid og hjemmedød
- aktuelle kontaktpunkt og støttetjenester

Dette prosjektet tar utgangspunkt i behovet for en lett tilgjengelig informasjonsbase med gode navigasjons- og søkefunksjoner.

## 3. Mål

Hovedmålet er å lage et brukervennlig, tilgjengelig og faglig relevant verktøy for helsepersonell som arbeider med palliative pasienter. Spesifikke mål er:
- synliggjøre pasientforløpets fire hovedfaser
- presentere ressurspersoner og samarbeidspartnere
- tilby søkbar informasjon på tvers av sidene
- bidra til tryggere planlegging og dokumentasjon i hjemmemiljøet

## 4. Løsning

Løsningen er et statisk nettsted basert på HTML, CSS og JavaScript. Den viktigste strukturen er:
- `index.html` — hovedsiden med oversikt over pasientforløpet
- `identifisering.html` — identifisering av palliativ pasient
- `igangsetting.html` — oppstart av palliativt forløp
- `hjemmetid.html` — behandling, planlegging og oppfølging i hjemmet
- `hjemmedod.html` — rutiner ved hjemmedød
- ressurssider for aktører som fastlege, palliativt team, kreftkoordinator med mer

## 5. Funksjonalitet

Nettstedet inneholder flere sentrale funksjoner:
- responsiv navigasjon for desktop og mobil
- søkefunksjon som indekserer tekst på tvers av sider
- fremheving av treff ved søk
- dynamisk meny og breadcrumbstøtte
- "til toppen"-knapp ved scrolling
- fokus på tilgjengelighet med `aria-*`-attributter

## 6. Teknologi

Prosjektet benytter:
- HTML5
- CSS3
- JavaScript (vanilla)
- Ikoner gjennom Lucide CDN
- `package.json` for prosjektstruktur og avhengigheter

## 7. Filstruktur

```
bachelor/
├── index.html
├── identifisering.html
├── igangsetting.html
├── hjemmetid.html
├── hjemmedod.html
├── fastlege.html
├── palliativtTeam.html
├── ressursSykepleier.html
├── kreftkoordinator.html
├── kompetanseSenter.html
├── kreftomsorg.html
├── vaketjeneste.html
├── lenker.html
├── kontakt.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── package.json
├── package-lock.json
└── pdf/
```

## 8. Hvordan kjøre lokalt

Siden er statisk, og kan åpnes direkte i nettleseren. For beste utviklingsopplevelse anbefales lokal server:

```bash
cd bachelor
python3 -m http.server 8000
```

Deretter:
```
http://localhost:8000
```

Alternativt kan du bruke VS Code Live Server.

## 9. Relevans for bacheloroppgave

README-en viser at prosjektet er:
- forankret i en faglig problemstilling
- utviklet for en konkret brukergruppe
- gjennomført med relevante teknologier
- klart dokumentert for videre arbeid og evaluering

## 10. Videre arbeid

Forslag til utvikling:
- gjøre alle innholdssider fullt responsive
- utvide søkefunksjonen med prioritering og relevans
- dokumentere metodikk, kilder og brukerbehov i selve bacheloroppgaven
- legge inn casebeskrivelser og eksempler fra klinisk praksis