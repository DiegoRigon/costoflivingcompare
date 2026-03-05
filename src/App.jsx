import { useState, useEffect, useRef } from "react";
import { CITIES_DATA, FLAGS, CATEGORIES, SORTED_CITY_NAMES } from "./data.js";
import { toSlug, fromSlug, POPULAR_COMPARISONS, getComparisonsForCity, generateComparisonText, generateCityText } from "./seo.js";

function groupCities(exclude) {
  const groups = {};
  SORTED_CITY_NAMES.filter((c) => c !== exclude).forEach((name) => {
    const g = CITIES_DATA[name].country === "IT" ? "\u{1f1ee}\u{1f1f9} Italia" : "\u{1f30d} World";
    if (!groups[g]) groups[g] = [];
    groups[g].push(name);
  });
  return groups;
}
function navigate(path) { window.location.hash = path; }
function useRoute() {
  const [hash, setHash] = useState(window.location.hash.slice(1) || "/");
  useEffect(() => { const h = () => setHash(window.location.hash.slice(1) || "/"); window.addEventListener("hashchange", h); return () => window.removeEventListener("hashchange", h); }, []);
  return hash;
}

const S = {
  page: { minHeight: "100vh", background: "linear-gradient(160deg,#0d0d1a 0%,#1a1a2e 40%,#16213e 100%)", color: "#fff", fontFamily: "'DM Sans',sans-serif", padding: "0 16px" },
  wrap: { maxWidth: 720, margin: "0 auto", paddingTop: 48 },
  label: { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#8a8a8a", marginBottom: 6 },
  selectorBtn: { width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s", outline: "none" },
  dropdown: { position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4, background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, zIndex: 50, maxHeight: 340, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" },
  searchInput: { width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box" },
  card: { padding: "14px 18px", background: "rgba(255,255,255,0.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)" },
  mono: { fontFamily: "'Space Mono',monospace" },
  gold: { color: "#ffc857" },
  link: { color: "#ffc857", textDecoration: "none", cursor: "pointer", transition: "opacity 0.2s" },
  linkGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 },
};

function AdSlot({ id }) {
  return <div id={id} style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px", textAlign: "center", color: "#333", fontSize: 11, marginBottom: 24 }}></div>;
}
function NavBar() {
  return <nav style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" }}>
    <a onClick={() => navigate("/")} style={{ ...S.link, fontSize: 13, fontWeight: 600 }}>{"\u{1f3e0}"} Home</a>
    <a onClick={() => navigate("/cities")} style={{ ...S.link, fontSize: 13, fontWeight: 600 }}>{"\u{1f30d}"} All Cities</a>
    <a onClick={() => navigate("/comparisons")} style={{ ...S.link, fontSize: 13, fontWeight: 600 }}>{"\u2696\ufe0f"} Popular Comparisons</a>
  </nav>;
}
function Footer() {
  const totalCities = Object.keys(CITIES_DATA).length;
  return <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, paddingBottom: 48, textAlign: "center", color: "#444", fontSize: 12, marginTop: 32 }}>
    <p>Data approximate, based on 2024-2025 averages. All values in EUR equivalent.</p>
    <div style={{ marginTop: 12, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
      <a onClick={() => navigate("/")} style={{ ...S.link, fontSize: 12 }}>Home</a>
      <a onClick={() => navigate("/cities")} style={{ ...S.link, fontSize: 12 }}>All {totalCities} Cities</a>
      <a onClick={() => navigate("/comparisons")} style={{ ...S.link, fontSize: 12 }}>Popular Comparisons</a>
    </div>
    <p style={{ marginTop: 12, color: "#333" }}>&copy; {new Date().getFullYear()} costoflivingcompare.com</p>
  </footer>;
}

function CitySelector({ value, onChange, label, excludeCity }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  const groups = groupCities(excludeCity);
  const filtered = {};
  Object.entries(groups).forEach(([g, cities]) => { const f = cities.filter((c) => c.toLowerCase().includes(search.toLowerCase()) || CITIES_DATA[c].region.toLowerCase().includes(search.toLowerCase()) || CITIES_DATA[c].country.toLowerCase().includes(search.toLowerCase())); if (f.length) filtered[g] = f; });
  const city = CITIES_DATA[value];
  return (
    <div ref={ref} style={{ position: "relative", flex: 1, minWidth: 180 }}>
      <label style={S.label}>{label}</label>
      <button onClick={() => setOpen(!open)} style={S.selectorBtn}>
        {city && <span style={{ fontSize: 22 }}>{FLAGS[city.country]}</span>}
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value || "Select..."}</span>
        <span style={{ marginLeft: "auto", opacity: 0.4, fontSize: 13 }}>{"\u25bc"}</span>
      </button>
      {open && <div style={S.dropdown}>
        <div style={{ padding: 8 }}><input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search city, region..." style={S.searchInput} /></div>
        <div style={{ maxHeight: 280, overflowY: "auto" }}>
          {Object.entries(filtered).map(([g, cities]) => <div key={g}>
            <div style={{ padding: "8px 16px 4px", fontSize: 11, fontWeight: 700, color: "#ffc857", letterSpacing: 1.5, textTransform: "uppercase" }}>{g}</div>
            {cities.map((c) => <button key={c} onClick={() => { onChange(c); setOpen(false); setSearch(""); }} style={{ width: "100%", padding: "9px 16px", background: c === value ? "rgba(255,200,87,0.15)" : "transparent", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans',sans-serif", textAlign: "left" }} onMouseEnter={(e) => { if (c !== value) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }} onMouseLeave={(e) => { if (c !== value) e.currentTarget.style.background = "transparent"; }}>
              <span>{FLAGS[CITIES_DATA[c].country]}</span><span style={{ flex: 1 }}>{c}</span><span style={{ opacity: 0.35, fontSize: 11 }}>{CITIES_DATA[c].region}</span>
            </button>)}
          </div>)}
          {Object.keys(filtered).length === 0 && <div style={{ padding: "20px 16px", color: "#666", textAlign: "center" }}>No cities found</div>}
        </div>
      </div>}
    </div>
  );
}

function ComparisonBar({ category, valueA, valueB, cityA, cityB }) {
  const max = Math.max(valueA, valueB);
  const pctA = max > 0 ? (valueA / max) * 100 : 0;
  const pctB = max > 0 ? (valueB / max) * 100 : 0;
  const diff = valueB > 0 ? ((valueA - valueB) / valueB * 100).toFixed(0) : 0;
  const bars = [{ city: cityA, val: valueA, pct: pctA, cheaper: valueA <= valueB }, { city: cityB, val: valueB, pct: pctB, cheaper: valueB <= valueA }];
  return (
    <div style={{ ...S.card, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 17 }}>{category.icon}</span>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{category.label}</span>
          <span style={{ color: "#555", fontSize: 11 }}>{category.desc}</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: diff > 0 ? "rgba(255,107,107,0.15)" : diff < 0 ? "rgba(107,255,153,0.15)" : "rgba(255,255,255,0.08)", color: diff > 0 ? "#ff6b6b" : diff < 0 ? "#6bff99" : "#888" }}>{diff > 0 ? `+${diff}%` : `${diff}%`}</span>
      </div>
      {bars.map((b, i) => <div key={i} style={{ marginBottom: i === 0 ? 6 : 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
          <span style={{ fontSize: 11, color: "#aaa" }}>{b.city}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: b.cheaper ? "#6bff99" : "#fff", fontVariantNumeric: "tabular-nums" }}>{"\u20ac"}{b.val.toLocaleString()}</span>
        </div>
        <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, width: `${b.pct}%`, background: b.cheaper ? "linear-gradient(90deg,#6bff99,#4ecdc4)" : "linear-gradient(90deg,#ffc857,#ff6b6b)", transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
        </div>
      </div>)}
    </div>
  );
}

function Calculator({ initialA, initialB }) {
  const [cityA, setCityA] = useState(initialA || "Milano");
  const [cityB, setCityB] = useState(initialB || "London");
  const [salary, setSalary] = useState(2000);
  const [showAll, setShowAll] = useState(false);
  const dataA = CITIES_DATA[cityA], dataB = CITIES_DATA[cityB];
  const equivalentSalary = dataA && dataB && dataB.index > 0 ? Math.round((salary / dataA.index) * dataB.index) : salary;
  const monthlyA = dataA ? dataA.rent1br + dataA.groceries + dataA.transport + dataA.utilities + dataA.internet : 0;
  const monthlyB = dataB ? dataB.rent1br + dataB.groceries + dataB.transport + dataB.utilities + dataB.internet : 0;
  const displayCategories = showAll ? CATEGORIES : CATEGORIES.slice(0, 6);
  const salaryDiffPct = salary > 0 ? ((equivalentSalary - salary) / salary * 100).toFixed(0) : 0;
  return <>
    <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap", alignItems: "flex-end" }}>
      <CitySelector label="I live in" value={cityA} onChange={setCityA} excludeCity={cityB} />
      <div style={{ display: "flex", alignItems: "center", paddingBottom: 10 }}>
        <button onClick={() => { const t = cityA; setCityA(cityB); setCityB(t); }} style={{ background: "rgba(255,200,87,0.1)", border: "1px solid rgba(255,200,87,0.25)", borderRadius: 10, color: "#ffc857", fontSize: 18, cursor: "pointer", padding: "10px 12px", lineHeight: 1 }} title="Swap">{"\u21c4"}</button>
      </div>
      <CitySelector label="Moving to" value={cityB} onChange={setCityB} excludeCity={cityA} />
    </div>
    <div style={{ padding: "24px 28px", background: "rgba(255,200,87,0.06)", borderRadius: 16, border: "1px solid rgba(255,200,87,0.15)", marginBottom: 32 }}>
      <label style={{ ...S.label, ...S.gold }}>Your monthly salary in {cityA}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24, fontWeight: 700, ...S.gold }}>{"\u20ac"}</span>
        <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value) || 0)} style={{ flex: 1, padding: "12px 0", background: "transparent", border: "none", borderBottom: "2px solid rgba(255,200,87,0.3)", color: "#fff", fontSize: 28, fontWeight: 700, outline: "none", ...S.mono, fontVariantNumeric: "tabular-nums" }} />
      </div>
      <div style={{ marginTop: 20, padding: "20px 24px", background: "rgba(255,255,255,0.04)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>To maintain the same lifestyle in <strong style={{ color: "#ccc" }}>{cityB}</strong></div>
          <div style={{ ...S.mono, fontSize: 32, fontWeight: 700, ...S.gold }}>{"\u20ac"}{equivalentSalary.toLocaleString()}<span style={{ fontSize: 14, fontWeight: 400, color: "#888" }}>/mo</span></div>
        </div>
        <div style={{ padding: "8px 16px", borderRadius: 24, fontWeight: 700, fontSize: 15, background: equivalentSalary > salary ? "rgba(255,107,107,0.15)" : "rgba(107,255,153,0.15)", color: equivalentSalary > salary ? "#ff6b6b" : "#6bff99" }}>{salaryDiffPct > 0 ? "+" : ""}{salaryDiffPct}%</div>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
      {[[cityA, monthlyA], [cityB, monthlyB]].map(([city, total], i) => <div key={i} style={{ ...S.card, padding: 20 }}>
        <div style={{ fontSize: 11, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Monthly essentials</div>
        <div style={{ fontSize: 12, color: "#aaa", marginBottom: 2, display: "flex", alignItems: "center", gap: 6 }}><span>{FLAGS[CITIES_DATA[city]?.country]}</span> {city}</div>
        <div style={{ ...S.mono, fontSize: 22, fontWeight: 700 }}>{"\u20ac"}{total.toLocaleString()}</div>
      </div>)}
    </div>
    <AdSlot id="ad-slot-1" />
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Detailed Comparison</h2>
      {dataA && dataB && displayCategories.map((cat) => <ComparisonBar key={cat.key} category={cat} valueA={dataA[cat.key]} valueB={dataB[cat.key]} cityA={cityA} cityB={cityB} />)}
      {!showAll && <button onClick={() => setShowAll(true)} style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#ffc857", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Show all {CATEGORIES.length} categories {"\u2193"}</button>}
    </div>
    {dataA && dataB && <div style={{ padding: "24px 28px", background: "rgba(78,205,196,0.06)", borderRadius: 16, border: "1px solid rgba(78,205,196,0.15)", marginBottom: 32 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#4ecdc4", marginBottom: 8 }}>{"\u{1f4a1}"} Quick Insight</div>
      <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
        {monthlyB > monthlyA ? `Living in ${cityB} costs about \u20ac${(monthlyB - monthlyA).toLocaleString()} more per month for essentials. That's roughly \u20ac${((monthlyB - monthlyA) * 12).toLocaleString()} extra per year.${equivalentSalary > salary ? ` You'd need a ${salaryDiffPct}% salary increase to maintain your lifestyle.` : ""}` : monthlyA > monthlyB ? `Great news! ${cityB} saves you about \u20ac${(monthlyA - monthlyB).toLocaleString()}/month on essentials \u2014 roughly \u20ac${((monthlyA - monthlyB) * 12).toLocaleString()} saved per year.` : `${cityA} and ${cityB} have very similar costs for monthly essentials.`}
      </p>
    </div>}
    <AdSlot id="ad-slot-2" />
  </>;
}

function HomePage() {
  const totalCities = Object.keys(CITIES_DATA).length;
  const italianCities = Object.values(CITIES_DATA).filter((c) => c.country === "IT").length;
  const featured = [["Milano","London"],["Roma","Paris"],["New York","London"],["Berlin","Amsterdam"],["Milano","Roma"],["Barcelona","Lisbon"],["Dubai","Singapore"],["Tokyo","Seoul"]];
  useEffect(() => { document.title = "Cost of Living Compare \u2014 Compare Your Cost of Living | costoflivingcompare.com"; window.scrollTo(0, 0); }, []);
  return <>
    <header style={{ textAlign: "center", marginBottom: 48 }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", ...S.gold, marginBottom: 12 }}>{"\u{1f4b0}"} Cost of Living Calculator</div>
      <h1 style={{ ...S.mono, fontSize: "clamp(26px,5vw,42px)", fontWeight: 700, margin: 0, lineHeight: 1.15, background: "linear-gradient(135deg,#fff 0%,#ffc857 50%,#ff6b6b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Compare Your Cost of Living</h1>
      <p style={{ color: "#666", fontSize: 14, marginTop: 12 }}>{totalCities} cities {"\u00b7"} {italianCities} Italian regions {"\u00b7"} Real cost data</p>
    </header>
    <Calculator initialA="Milano" initialB="London" />
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 16 }}>{"\u{1f525}"} Popular Comparisons</h2>
      <div style={S.linkGrid}>
        {featured.map(([a, b]) => <a key={`${a}-${b}`} onClick={() => navigate(`/compare/${toSlug(a)}-vs-${toSlug(b)}`)} style={{ ...S.link, ...S.card, padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <span>{FLAGS[CITIES_DATA[a].country]}</span><span>{a}</span><span style={{ color: "#555" }}>vs</span><span>{FLAGS[CITIES_DATA[b].country]}</span><span>{b}</span>
        </a>)}
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}><a onClick={() => navigate("/comparisons")} style={{ ...S.link, fontSize: 13 }}>View all comparisons {"\u2192"}</a></div>
    </section>
    <section style={{ marginBottom: 32, lineHeight: 1.8, color: "#999", fontSize: 14 }}>
      <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 600, marginBottom: 12 }}>How to Use the Cost of Living Calculator</h2>
      <p style={{ marginBottom: 12 }}>Moving to a new city? Our free cost of living calculator helps you understand exactly how much you'll need to earn to maintain your current lifestyle. Select your current city and your destination, enter your monthly salary, and instantly see a detailed breakdown of expenses.</p>
      <p style={{ marginBottom: 12 }}>We compare {totalCities} cities across {Object.keys(FLAGS).length} countries, with special coverage of all {italianCities} Italian regions. Whether you're an expat planning a move, a digital nomad choosing your next base, or simply curious, this tool gives you the data you need.</p>
      <h3 style={{ color: "#aaa", fontSize: 15, fontWeight: 600, marginBottom: 8, marginTop: 20 }}>What We Compare</h3>
      <p>Our comparison covers 11 key categories: apartment rent (1-bedroom and 3-bedroom in city center), monthly groceries, public transport passes, restaurant meals, coffee, utilities, internet, gym memberships, cinema tickets, and local beer prices.</p>
    </section>
  </>;
}

function ComparisonPage({ slugA, slugB }) {
  const cityA = fromSlug(slugA), cityB = fromSlug(slugB);
  if (!cityA || !cityB) return <div style={{ textAlign: "center", padding: 60 }}><h2 style={{ color: "#fff" }}>Cities not found</h2><a onClick={() => navigate("/")} style={S.link}>{"\u2190"} Back to calculator</a></div>;
  const seoText = generateComparisonText(cityA, cityB);
  const relatedA = getComparisonsForCity(cityA).filter((c) => c !== cityB).slice(0, 4);
  const relatedB = getComparisonsForCity(cityB).filter((c) => c !== cityA).slice(0, 4);
  useEffect(() => { document.title = `${cityA} vs ${cityB} \u2014 Cost of Living Comparison | costoflivingcompare.com`; window.scrollTo(0, 0); }, [cityA, cityB]);
  return <>
    <header style={{ textAlign: "center", marginBottom: 32 }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", ...S.gold, marginBottom: 12 }}>{"\u2696\ufe0f"} Cost of Living Comparison</div>
      <h1 style={{ ...S.mono, fontSize: "clamp(24px,4.5vw,38px)", fontWeight: 700, margin: 0, lineHeight: 1.2, background: "linear-gradient(135deg,#fff 0%,#ffc857 50%,#ff6b6b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{FLAGS[CITIES_DATA[cityA].country]} {cityA} vs {FLAGS[CITIES_DATA[cityB].country]} {cityB}</h1>
    </header>
    <Calculator initialA={cityA} initialB={cityB} />
    <section style={{ marginBottom: 32, lineHeight: 1.8, color: "#999", fontSize: 14 }}>
      <h2 style={{ color: "#ccc", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Cost of Living in {cityA} vs {cityB}</h2>
      <p>{seoText}</p>
    </section>
    {(relatedA.length > 0 || relatedB.length > 0) && <section style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Related Comparisons</h3>
      <div style={S.linkGrid}>
        {relatedA.map((c) => <a key={`${cityA}-${c}`} onClick={() => navigate(`/compare/${toSlug(cityA)}-vs-${toSlug(c)}`)} style={{ ...S.link, ...S.card, padding: "10px 14px", fontSize: 13 }}>{cityA} vs {c}</a>)}
        {relatedB.map((c) => <a key={`${cityB}-${c}`} onClick={() => navigate(`/compare/${toSlug(cityB)}-vs-${toSlug(c)}`)} style={{ ...S.link, ...S.card, padding: "10px 14px", fontSize: 13 }}>{cityB} vs {c}</a>)}
      </div>
    </section>}
    <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
      <a onClick={() => navigate(`/city/${toSlug(cityA)}`)} style={{ ...S.link, fontSize: 13 }}>{"\u{1f4cd}"} More about {cityA} {"\u2192"}</a>
      <a onClick={() => navigate(`/city/${toSlug(cityB)}`)} style={{ ...S.link, fontSize: 13 }}>{"\u{1f4cd}"} More about {cityB} {"\u2192"}</a>
    </div>
  </>;
}

function CityPage({ slug }) {
  const cityName = fromSlug(slug);
  if (!cityName) return <div style={{ textAlign: "center", padding: 60 }}><h2 style={{ color: "#fff" }}>City not found</h2><a onClick={() => navigate("/")} style={S.link}>{"\u2190"} Back</a></div>;
  const city = CITIES_DATA[cityName];
  const seoText = generateCityText(cityName);
  const comparisons = getComparisonsForCity(cityName);
  const monthly = city.rent1br + city.groceries + city.transport + city.utilities + city.internet;
  useEffect(() => { document.title = `Cost of Living in ${cityName} (${city.region}) | costoflivingcompare.com`; window.scrollTo(0, 0); }, [cityName]);
  return <>
    <header style={{ textAlign: "center", marginBottom: 32 }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", ...S.gold, marginBottom: 12 }}>{"\u{1f4cd}"} City Profile</div>
      <h1 style={{ ...S.mono, fontSize: "clamp(26px,5vw,42px)", fontWeight: 700, margin: 0, lineHeight: 1.2, background: "linear-gradient(135deg,#fff 0%,#ffc857 50%,#ff6b6b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{FLAGS[city.country]} {cityName}</h1>
      <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>{city.region} {"\u00b7"} Index: {city.index}/100</p>
    </header>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12, marginBottom: 32 }}>
      {[{ label: "Monthly essentials", value: `\u20ac${monthly.toLocaleString()}` }, { label: "Rent (1BR)", value: `\u20ac${city.rent1br}` }, { label: "Groceries", value: `\u20ac${city.groceries}` }, { label: "Transport", value: `\u20ac${city.transport}` }, { label: "Coffee", value: `\u20ac${city.coffee}` }, { label: "Meal out", value: `\u20ac${city.dining}` }].map((s, i) => <div key={i} style={{ ...S.card, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
        <div style={{ ...S.mono, fontSize: 20, fontWeight: 700 }}>{s.value}</div>
      </div>)}
    </div>
    <AdSlot id="ad-city-1" />
    <section style={{ marginBottom: 32, lineHeight: 1.8, color: "#999", fontSize: 14 }}>
      <h2 style={{ color: "#ccc", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Cost of Living in {cityName}</h2>
      <p>{seoText}</p>
    </section>
    {comparisons.length > 0 && <section style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Compare {cityName} with</h3>
      <div style={S.linkGrid}>
        {comparisons.map((c) => <a key={c} onClick={() => navigate(`/compare/${toSlug(cityName)}-vs-${toSlug(c)}`)} style={{ ...S.link, ...S.card, padding: "10px 14px", fontSize: 13 }}>{FLAGS[CITIES_DATA[c].country]} {cityName} vs {c}</a>)}
      </div>
    </section>}
    <div style={{ textAlign: "center", marginBottom: 32 }}><a onClick={() => navigate("/")} style={{ ...S.link, fontSize: 14, fontWeight: 600 }}>{"\u{1f504}"} Open full calculator {"\u2192"}</a></div>
  </>;
}

function AllCitiesPage() {
  useEffect(() => { document.title = "All Cities \u2014 Cost of Living Compare | costoflivingcompare.com"; window.scrollTo(0, 0); }, []);
  const italian = SORTED_CITY_NAMES.filter((c) => CITIES_DATA[c].country === "IT");
  const world = SORTED_CITY_NAMES.filter((c) => CITIES_DATA[c].country !== "IT");
  return <>
    <header style={{ textAlign: "center", marginBottom: 32 }}>
      <h1 style={{ ...S.mono, fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, margin: 0, background: "linear-gradient(135deg,#fff 0%,#ffc857 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>All Cities</h1>
      <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>{SORTED_CITY_NAMES.length} cities worldwide</p>
    </header>
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#ffc857", marginBottom: 12 }}>{"\u{1f1ee}\u{1f1f9}"} Italy ({italian.length} cities)</h2>
      <div style={S.linkGrid}>{italian.map((c) => <a key={c} onClick={() => navigate(`/city/${toSlug(c)}`)} style={{ ...S.link, ...S.card, padding: "10px 14px", fontSize: 13, display: "flex", justifyContent: "space-between" }}><span>{c}</span><span style={{ color: "#555", fontSize: 11 }}>{CITIES_DATA[c].region}</span></a>)}</div>
    </section>
    <AdSlot id="ad-cities-1" />
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#ffc857", marginBottom: 12 }}>{"\u{1f30d}"} World ({world.length} cities)</h2>
      <div style={S.linkGrid}>{world.map((c) => <a key={c} onClick={() => navigate(`/city/${toSlug(c)}`)} style={{ ...S.link, ...S.card, padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><span>{FLAGS[CITIES_DATA[c].country]}</span><span>{c}</span></a>)}</div>
    </section>
  </>;
}

function AllComparisonsPage() {
  useEffect(() => { document.title = "Popular City Comparisons \u2014 Cost of Living Compare | costoflivingcompare.com"; window.scrollTo(0, 0); }, []);
  const italyVsWorld = POPULAR_COMPARISONS.filter(([a, b]) => CITIES_DATA[a].country === "IT" && CITIES_DATA[b].country !== "IT");
  const italyVsItaly = POPULAR_COMPARISONS.filter(([a, b]) => CITIES_DATA[a].country === "IT" && CITIES_DATA[b].country === "IT");
  const worldVsWorld = POPULAR_COMPARISONS.filter(([a, b]) => CITIES_DATA[a].country !== "IT" && CITIES_DATA[b].country !== "IT");
  const renderGroup = (pairs) => <div style={S.linkGrid}>{pairs.map(([a, b]) => <a key={`${a}-${b}`} onClick={() => navigate(`/compare/${toSlug(a)}-vs-${toSlug(b)}`)} style={{ ...S.link, ...S.card, padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><span>{FLAGS[CITIES_DATA[a].country]}</span> {a} <span style={{ color: "#555" }}>vs</span> <span>{FLAGS[CITIES_DATA[b].country]}</span> {b}</a>)}</div>;
  return <>
    <header style={{ textAlign: "center", marginBottom: 32 }}>
      <h1 style={{ ...S.mono, fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, margin: 0, background: "linear-gradient(135deg,#fff 0%,#ffc857 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Popular Comparisons</h1>
      <p style={{ color: "#666", fontSize: 14, marginTop: 8 }}>{POPULAR_COMPARISONS.length} city-to-city comparisons</p>
    </header>
    <section style={{ marginBottom: 32 }}><h2 style={{ fontSize: 15, fontWeight: 600, color: "#ffc857", marginBottom: 12 }}>{"\u{1f1ee}\u{1f1f9}"} Italy vs World ({italyVsWorld.length})</h2>{renderGroup(italyVsWorld)}</section>
    <AdSlot id="ad-comp-1" />
    <section style={{ marginBottom: 32 }}><h2 style={{ fontSize: 15, fontWeight: 600, color: "#ffc857", marginBottom: 12 }}>{"\u{1f1ee}\u{1f1f9}"} Italy vs Italy ({italyVsItaly.length})</h2>{renderGroup(italyVsItaly)}</section>
    <section style={{ marginBottom: 32 }}><h2 style={{ fontSize: 15, fontWeight: 600, color: "#ffc857", marginBottom: 12 }}>{"\u{1f30d}"} World vs World ({worldVsWorld.length})</h2>{renderGroup(worldVsWorld)}</section>
  </>;
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { if (!document.cookie.includes("cookie_consent=")) setVisible(true); } catch(e) { setVisible(true); }
  }, []);
  const accept = () => {
    try { document.cookie = "cookie_consent=accepted;max-age=31536000;path=/;SameSite=Lax"; } catch(e) {}
    setVisible(false);
    // Activate Google Analytics after consent
    if (window.gtag) { window.gtag("consent", "update", { analytics_storage: "granted" }); }
  };
  const decline = () => {
    try { document.cookie = "cookie_consent=declined;max-age=31536000;path=/;SameSite=Lax"; } catch(e) {}
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999, background: "rgba(13,13,26,0.97)", borderTop: "1px solid rgba(255,200,87,0.2)", padding: "16px 20px", backdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "space-between" }}>
        <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.6, flex: 1, minWidth: 250, margin: 0 }}>
          We use cookies to analyze site traffic and improve your experience. By clicking "Accept", you consent to our use of analytics cookies.
          <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" style={{ color: "#ffc857", marginLeft: 4 }}>Learn more</a>
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={decline} style={{ padding: "8px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#888", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Decline</button>
          <button onClick={accept} style={{ padding: "8px 20px", background: "#ffc857", border: "none", borderRadius: 8, color: "#0d0d1a", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Accept</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  let page;
  if (route === "/" || route === "") page = <HomePage />;
  else if (route === "/cities") page = <AllCitiesPage />;
  else if (route === "/comparisons") page = <AllComparisonsPage />;
  else if (route.startsWith("/compare/")) {
    const slug = route.replace("/compare/", "");
    const parts = slug.split("-vs-");
    page = parts.length === 2 ? <ComparisonPage slugA={parts[0]} slugB={parts[1]} /> : <HomePage />;
  } else if (route.startsWith("/city/")) page = <CityPage slug={route.replace("/city/", "")} />;
  else page = <HomePage />;
  return <div style={S.page}><div style={S.wrap}><NavBar />{page}<Footer /></div><CookieBanner /></div>;
}
