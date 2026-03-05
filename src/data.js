// All values in EUR equivalent (monthly unless noted).
// Sources: Numbeo, Expatistan, ISTAT averages 2024-2025.
// rent1br/rent3br = city center, groceries = monthly basket, transport = monthly pass,
// dining = inexpensive restaurant meal, coffee = cappuccino, utilities = basic (elec/water/gas),
// internet = broadband, gym = monthly membership, cinema = 1 ticket, beer = domestic 0.5L draft
// index = composite cost-of-living index (London=100)

export const CITIES_DATA = {
  // ══════ ITALIA — tutte le 20 regioni ══════
  "Milano":     { country:"IT", region:"Lombardia",            currency:"EUR", rent1br:950,  rent3br:1800, groceries:350, transport:39,  dining:15, coffee:1.5, utilities:180, internet:30, gym:45, cinema:10,  beer:6,   index:78 },
  "Roma":       { country:"IT", region:"Lazio",                currency:"EUR", rent1br:750,  rent3br:1500, groceries:320, transport:35,  dining:13, coffee:1.2, utilities:170, internet:28, gym:40, cinema:9,   beer:5,   index:68 },
  "Napoli":     { country:"IT", region:"Campania",             currency:"EUR", rent1br:550,  rent3br:1050, groceries:280, transport:30,  dining:10, coffee:1.0, utilities:150, internet:27, gym:35, cinema:8,   beer:4,   index:55 },
  "Torino":     { country:"IT", region:"Piemonte",             currency:"EUR", rent1br:600,  rent3br:1200, groceries:300, transport:35,  dining:12, coffee:1.2, utilities:165, internet:28, gym:38, cinema:9,   beer:5,   index:62 },
  "Firenze":    { country:"IT", region:"Toscana",              currency:"EUR", rent1br:800,  rent3br:1600, groceries:330, transport:35,  dining:14, coffee:1.3, utilities:175, internet:29, gym:42, cinema:10,  beer:5.5, index:72 },
  "Bologna":    { country:"IT", region:"Emilia-Romagna",       currency:"EUR", rent1br:700,  rent3br:1400, groceries:310, transport:33,  dining:13, coffee:1.2, utilities:160, internet:28, gym:40, cinema:9,   beer:5,   index:66 },
  "Padova":     { country:"IT", region:"Veneto",               currency:"EUR", rent1br:580,  rent3br:1150, groceries:290, transport:32,  dining:11, coffee:1.1, utilities:155, internet:27, gym:35, cinema:8.5, beer:4.5, index:59 },
  "Venezia":    { country:"IT", region:"Veneto",               currency:"EUR", rent1br:850,  rent3br:1700, groceries:340, transport:40,  dining:15, coffee:1.4, utilities:180, internet:29, gym:45, cinema:10,  beer:6,   index:75 },
  "Palermo":    { country:"IT", region:"Sicilia",              currency:"EUR", rent1br:450,  rent3br:850,  groceries:260, transport:28,  dining:9,  coffee:1.0, utilities:140, internet:26, gym:30, cinema:7.5, beer:3.5, index:48 },
  "Genova":     { country:"IT", region:"Liguria",              currency:"EUR", rent1br:550,  rent3br:1100, groceries:290, transport:35,  dining:11, coffee:1.1, utilities:155, internet:27, gym:35, cinema:8.5, beer:4.5, index:57 },
  "Bari":       { country:"IT", region:"Puglia",               currency:"EUR", rent1br:480,  rent3br:900,  groceries:270, transport:27,  dining:10, coffee:0.9, utilities:140, internet:26, gym:30, cinema:7.5, beer:3.5, index:50 },
  "Cagliari":   { country:"IT", region:"Sardegna",             currency:"EUR", rent1br:500,  rent3br:950,  groceries:280, transport:30,  dining:10, coffee:1.0, utilities:145, internet:27, gym:32, cinema:8,   beer:4,   index:52 },
  "Catanzaro":  { country:"IT", region:"Calabria",             currency:"EUR", rent1br:350,  rent3br:650,  groceries:250, transport:25,  dining:8,  coffee:0.9, utilities:130, internet:25, gym:25, cinema:7,   beer:3,   index:42 },
  "Perugia":    { country:"IT", region:"Umbria",               currency:"EUR", rent1br:420,  rent3br:800,  groceries:270, transport:28,  dining:10, coffee:1.0, utilities:145, internet:26, gym:30, cinema:7.5, beer:4,   index:48 },
  "Ancona":     { country:"IT", region:"Marche",               currency:"EUR", rent1br:430,  rent3br:820,  groceries:275, transport:28,  dining:10, coffee:1.0, utilities:148, internet:26, gym:30, cinema:7.5, beer:4,   index:49 },
  "Trento":     { country:"IT", region:"Trentino-Alto Adige",  currency:"EUR", rent1br:620,  rent3br:1250, groceries:310, transport:32,  dining:12, coffee:1.3, utilities:170, internet:28, gym:38, cinema:9,   beer:5,   index:63 },
  "Aosta":      { country:"IT", region:"Valle d'Aosta",        currency:"EUR", rent1br:530,  rent3br:1000, groceries:305, transport:30,  dining:12, coffee:1.2, utilities:175, internet:28, gym:35, cinema:9,   beer:5,   index:58 },
  "Trieste":    { country:"IT", region:"Friuli Venezia Giulia", currency:"EUR", rent1br:480, rent3br:950,  groceries:285, transport:30,  dining:11, coffee:1.1, utilities:155, internet:27, gym:33, cinema:8,   beer:4.5, index:54 },
  "Potenza":    { country:"IT", region:"Basilicata",           currency:"EUR", rent1br:330,  rent3br:600,  groceries:245, transport:25,  dining:8,  coffee:0.9, utilities:130, internet:25, gym:25, cinema:7,   beer:3,   index:40 },
  "Campobasso": { country:"IT", region:"Molise",               currency:"EUR", rent1br:320,  rent3br:580,  groceries:240, transport:24,  dining:8,  coffee:0.9, utilities:125, internet:25, gym:25, cinema:6.5, beer:3,   index:39 },
  "L'Aquila":   { country:"IT", region:"Abruzzo",              currency:"EUR", rent1br:380,  rent3br:720,  groceries:260, transport:26,  dining:9,  coffee:1.0, utilities:140, internet:26, gym:28, cinema:7,   beer:3.5, index:45 },

  // ══════ EUROPA ══════
  "London":     { country:"GB", region:"England",       currency:"GBP", rent1br:1800, rent3br:3200, groceries:400, transport:160, dining:18, coffee:3.5, utilities:220, internet:35, gym:55, cinema:14, beer:7,   index:100 },
  "Paris":      { country:"FR", region:"Île-de-France", currency:"EUR", rent1br:1200, rent3br:2500, groceries:380, transport:84,  dining:16, coffee:3.0, utilities:200, internet:32, gym:45, cinema:12, beer:7,   index:87 },
  "Berlin":     { country:"DE", region:"Berlin",        currency:"EUR", rent1br:850,  rent3br:1700, groceries:300, transport:49,  dining:12, coffee:3.0, utilities:250, internet:30, gym:35, cinema:12, beer:4,   index:70 },
  "Munich":     { country:"DE", region:"Bavaria",       currency:"EUR", rent1br:1100, rent3br:2200, groceries:330, transport:57,  dining:14, coffee:3.5, utilities:260, internet:32, gym:40, cinema:13, beer:4.5, index:82 },
  "Madrid":     { country:"ES", region:"Madrid",        currency:"EUR", rent1br:900,  rent3br:1800, groceries:300, transport:55,  dining:12, coffee:1.8, utilities:150, internet:35, gym:40, cinema:9,  beer:4,   index:65 },
  "Barcelona":  { country:"ES", region:"Cataluña",      currency:"EUR", rent1br:950,  rent3br:1900, groceries:310, transport:55,  dining:13, coffee:2.0, utilities:155, internet:35, gym:42, cinema:10, beer:4.5, index:69 },
  "Amsterdam":  { country:"NL", region:"Noord-Holland", currency:"EUR", rent1br:1400, rent3br:2600, groceries:350, transport:100, dining:18, coffee:3.5, utilities:220, internet:45, gym:40, cinema:13, beer:6,   index:88 },
  "Lisbon":     { country:"PT", region:"Lisboa",        currency:"EUR", rent1br:900,  rent3br:1700, groceries:280, transport:40,  dining:10, coffee:1.2, utilities:140, internet:35, gym:35, cinema:7,  beer:3,   index:60 },
  "Vienna":     { country:"AT", region:"Wien",          currency:"EUR", rent1br:850,  rent3br:1650, groceries:320, transport:51,  dining:14, coffee:3.5, utilities:230, internet:30, gym:35, cinema:12, beer:4.5, index:72 },
  "Dublin":     { country:"IE", region:"Leinster",      currency:"EUR", rent1br:1600, rent3br:2900, groceries:380, transport:120, dining:18, coffee:4.0, utilities:220, internet:50, gym:50, cinema:13, beer:7,   index:95 },
  "Zürich":     { country:"CH", region:"Zürich",        currency:"CHF", rent1br:2200, rent3br:4000, groceries:500, transport:80,  dining:30, coffee:5.5, utilities:250, internet:55, gym:80, cinema:20, beer:8,   index:130 },
  "Prague":     { country:"CZ", region:"Bohemia",       currency:"CZK", rent1br:750,  rent3br:1400, groceries:270, transport:25,  dining:8,  coffee:2.5, utilities:200, internet:20, gym:30, cinema:8,  beer:2.5, index:52 },
  "Warsaw":     { country:"PL", region:"Mazovia",       currency:"PLN", rent1br:650,  rent3br:1300, groceries:250, transport:25,  dining:8,  coffee:2.5, utilities:200, internet:15, gym:30, cinema:7,  beer:3,   index:48 },
  "Athens":     { country:"GR", region:"Attica",        currency:"EUR", rent1br:500,  rent3br:950,  groceries:280, transport:30,  dining:10, coffee:2.0, utilities:160, internet:30, gym:35, cinema:8,  beer:4,   index:52 },
  "Brussels":   { country:"BE", region:"Brussels",      currency:"EUR", rent1br:950,  rent3br:1800, groceries:340, transport:49,  dining:16, coffee:3.0, utilities:200, internet:40, gym:40, cinema:12, beer:5,   index:74 },
  "Copenhagen": { country:"DK", region:"Hovedstaden",   currency:"DKK", rent1br:1300, rent3br:2400, groceries:380, transport:55,  dining:20, coffee:5.0, utilities:200, internet:35, gym:40, cinema:15, beer:7,   index:92 },
  "Stockholm":  { country:"SE", region:"Stockholm",     currency:"SEK", rent1br:1100, rent3br:2100, groceries:350, transport:60,  dining:15, coffee:4.5, utilities:80,  internet:30, gym:40, cinema:14, beer:7,   index:85 },
  "Helsinki":   { country:"FI", region:"Uusimaa",       currency:"EUR", rent1br:1000, rent3br:1900, groceries:340, transport:60,  dining:14, coffee:4.0, utilities:120, internet:25, gym:40, cinema:14, beer:7,   index:80 },
  "Oslo":       { country:"NO", region:"Oslo",          currency:"NOK", rent1br:1350, rent3br:2500, groceries:420, transport:70,  dining:22, coffee:5.0, utilities:180, internet:50, gym:45, cinema:16, beer:9,   index:98 },
  "Bucharest":  { country:"RO", region:"Muntenia",      currency:"RON", rent1br:500,  rent3br:900,  groceries:230, transport:15,  dining:7,  coffee:2.0, utilities:150, internet:10, gym:25, cinema:6,  beer:2.5, index:42 },
  "Budapest":   { country:"HU", region:"Central Hungary", currency:"HUF", rent1br:550, rent3br:1050, groceries:240, transport:25, dining:7, coffee:2.0, utilities:170, internet:15, gym:28, cinema:7, beer:2.5, index:45 },

  // ══════ AMERICAS ══════
  "New York":      { country:"US", region:"New York",     currency:"USD", rent1br:3000, rent3br:5500, groceries:450, transport:127, dining:25, coffee:5.0, utilities:200, internet:65, gym:80, cinema:17, beer:9, index:120 },
  "San Francisco": { country:"US", region:"California",   currency:"USD", rent1br:2800, rent3br:5000, groceries:430, transport:98,  dining:22, coffee:5.5, utilities:180, internet:60, gym:70, cinema:16, beer:9, index:115 },
  "Los Angeles":   { country:"US", region:"California",   currency:"USD", rent1br:2200, rent3br:4000, groceries:400, transport:100, dining:20, coffee:5.0, utilities:170, internet:60, gym:55, cinema:16, beer:8, index:105 },
  "Chicago":       { country:"US", region:"Illinois",     currency:"USD", rent1br:1800, rent3br:3200, groceries:370, transport:105, dining:18, coffee:4.5, utilities:160, internet:55, gym:50, cinema:15, beer:7, index:92 },
  "Miami":         { country:"US", region:"Florida",      currency:"USD", rent1br:2100, rent3br:3800, groceries:390, transport:70,  dining:18, coffee:4.5, utilities:180, internet:55, gym:50, cinema:15, beer:7, index:98 },
  "Toronto":       { country:"CA", region:"Ontario",      currency:"CAD", rent1br:1800, rent3br:3200, groceries:350, transport:115, dining:16, coffee:4.0, utilities:160, internet:60, gym:45, cinema:13, beer:7, index:88 },
  "Mexico City":   { country:"MX", region:"CDMX",        currency:"MXN", rent1br:550,  rent3br:1100, groceries:200, transport:18,  dining:5,  coffee:2.5, utilities:60,  internet:25, gym:30, cinema:4,  beer:2.5, index:35 },
  "São Paulo":     { country:"BR", region:"São Paulo",    currency:"BRL", rent1br:500,  rent3br:1000, groceries:200, transport:30,  dining:6,  coffee:2.0, utilities:80,  internet:25, gym:30, cinema:6,  beer:2.5, index:38 },
  "Buenos Aires":  { country:"AR", region:"Buenos Aires", currency:"ARS", rent1br:350,  rent3br:700,  groceries:180, transport:10,  dining:5,  coffee:2.0, utilities:40,  internet:20, gym:20, cinema:5,  beer:2,   index:30 },

  // ══════ ASIA & OCEANIA ══════
  "Tokyo":     { country:"JP", region:"Kantō",          currency:"JPY", rent1br:1100, rent3br:2200, groceries:350, transport:80,  dining:10, coffee:4.0, utilities:180, internet:45, gym:70, cinema:15, beer:5,   index:82 },
  "Singapore": { country:"SG", region:"Singapore",      currency:"SGD", rent1br:2200, rent3br:4000, groceries:400, transport:80,  dining:8,  coffee:5.0, utilities:160, internet:40, gym:90, cinema:12, beer:10,  index:95 },
  "Dubai":     { country:"AE", region:"Dubai",          currency:"AED", rent1br:1500, rent3br:2800, groceries:380, transport:90,  dining:12, coffee:5.0, utilities:180, internet:90, gym:65, cinema:12, beer:10,  index:80 },
  "Bangkok":   { country:"TH", region:"Central",        currency:"THB", rent1br:500,  rent3br:1000, groceries:200, transport:30,  dining:4,  coffee:3.0, utilities:100, internet:20, gym:35, cinema:6,  beer:3,   index:38 },
  "Seoul":     { country:"KR", region:"Seoul",          currency:"KRW", rent1br:800,  rent3br:1700, groceries:350, transport:45,  dining:8,  coffee:4.0, utilities:150, internet:25, gym:45, cinema:10, beer:5,   index:72 },
  "Sydney":    { country:"AU", region:"New South Wales", currency:"AUD", rent1br:2000, rent3br:3500, groceries:400, transport:130, dining:20, coffee:4.5, utilities:200, internet:55, gym:55, cinema:16, beer:9,  index:100 },
  "Melbourne": { country:"AU", region:"Victoria",       currency:"AUD", rent1br:1600, rent3br:2800, groceries:370, transport:110, dining:18, coffee:4.5, utilities:180, internet:50, gym:50, cinema:15, beer:8,   index:90 },

  // ══════ AFRICA ══════
  "Cape Town": { country:"ZA", region:"Western Cape",    currency:"ZAR", rent1br:500,  rent3br:1000, groceries:200, transport:40,  dining:7,  coffee:2.5, utilities:80,  internet:35, gym:30, cinema:6,  beer:2.5, index:35 },
};

export const FLAGS = {
  IT:"🇮🇹", GB:"🇬🇧", FR:"🇫🇷", DE:"🇩🇪", ES:"🇪🇸", NL:"🇳🇱", PT:"🇵🇹", AT:"🇦🇹",
  IE:"🇮🇪", CH:"🇨🇭", US:"🇺🇸", JP:"🇯🇵", AU:"🇦🇺", AE:"🇦🇪", SG:"🇸🇬", TH:"🇹🇭",
  CZ:"🇨🇿", PL:"🇵🇱", GR:"🇬🇷", BE:"🇧🇪", DK:"🇩🇰", SE:"🇸🇪", FI:"🇫🇮", NO:"🇳🇴",
  RO:"🇷🇴", HU:"🇭🇺", CA:"🇨🇦", MX:"🇲🇽", BR:"🇧🇷", AR:"🇦🇷", KR:"🇰🇷", ZA:"🇿🇦",
};

export const CATEGORIES = [
  { key:"rent1br",   label:"Rent (1BR)",   icon:"🏠", desc:"1 bedroom, city center" },
  { key:"rent3br",   label:"Rent (3BR)",   icon:"🏡", desc:"3 bedrooms, city center" },
  { key:"groceries", label:"Groceries",    icon:"🛒", desc:"Monthly average" },
  { key:"transport", label:"Transport",    icon:"🚇", desc:"Monthly pass" },
  { key:"dining",    label:"Meal out",     icon:"🍽️", desc:"Inexpensive restaurant" },
  { key:"coffee",    label:"Coffee",       icon:"☕", desc:"Cappuccino" },
  { key:"utilities", label:"Utilities",    icon:"💡", desc:"Electricity, water, gas" },
  { key:"internet",  label:"Internet",     icon:"📶", desc:"Monthly broadband" },
  { key:"gym",       label:"Gym",          icon:"💪", desc:"Monthly membership" },
  { key:"cinema",    label:"Cinema",       icon:"🎬", desc:"1 ticket" },
  { key:"beer",      label:"Beer",         icon:"🍺", desc:"Domestic, 0.5L" },
];

export const SORTED_CITY_NAMES = Object.keys(CITIES_DATA).sort((a, b) => {
  const ca = CITIES_DATA[a].country, cb = CITIES_DATA[b].country;
  if (ca === "IT" && cb !== "IT") return -1;
  if (ca !== "IT" && cb === "IT") return 1;
  if (ca !== cb) return ca.localeCompare(cb);
  return a.localeCompare(b);
});
