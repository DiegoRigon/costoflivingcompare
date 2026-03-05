import { useState, useEffect, useRef } from "react";
import { CITIES_DATA, FLAGS, CATEGORIES, SORTED_CITY_NAMES } from "./data.js";

/* ─── Helpers ─── */
function groupCities(exclude) {
  const groups = {};
  SORTED_CITY_NAMES.filter((c) => c !== exclude).forEach((name) => {
    const g = CITIES_DATA[name].country === "IT" ? "🇮🇹 Italia" : "🌍 World";
    if (!groups[g]) groups[g] = [];
    groups[g].push(name);
  });
  return groups;
}

/* ─── Styles ─── */
const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg,#0d0d1a 0%,#1a1a2e 40%,#16213e 100%)",
    color: "#fff",
    fontFamily: "'DM Sans',sans-serif",
    padding: "0 16px",
  },
  wrap: { maxWidth: 720, margin: "0 auto", paddingTop: 48 },
  label: {
    display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 2,
    textTransform: "uppercase", color: "#8a8a8a", marginBottom: 6,
  },
  selectorBtn: {
    width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, color: "#fff",
    fontSize: 17, fontWeight: 600, cursor: "pointer", display: "flex",
    alignItems: "center", gap: 10, fontFamily: "'DM Sans',sans-serif",
    transition: "all 0.2s", outline: "none",
  },
  dropdown: {
    position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4,
    background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 12, zIndex: 50, maxHeight: 340, overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  searchInput: {
    width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff",
    fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box",
  },
  card: {
    padding: "14px 18px", background: "rgba(255,255,255,0.03)", borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  mono: { fontFamily: "'Space Mono',monospace" },
  gold: { color: "#ffc857" },
  green: { color: "#6bff99" },
  red: { color: "#ff6b6b" },
};

/* ─── Ad Placeholder ─── */
function AdSlot({ id, style }) {
  return (
    <div
      id={id}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px dashed rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "20px",
        textAlign: "center",
        color: "#333",
        fontSize: 11,
        marginBottom: 24,
        ...style,
      }}
    >
      {/* Google AdSense code will go here */}
    </div>
  );
}

/* ───  Selector ─── */
function Selector({ value, onChange, label, exclude }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const groups = groupCities(exclude);
  const filtered = {};
  Object.entries(groups).forEach(([g, cities]) => {
    const f = cities.filter(
      (c) =>
        c.toLowerCase().includes(search.toLowerCase()) ||
        CITIES_DATA[c].region.toLowerCase().includes(search.toLowerCase()) ||
        CITIES_DATA[c].country.toLowerCase().includes(search.toLowerCase())
    );
    if (f.length) filtered[g] = f;
  });

  const  = CITIES_DATA[value];

  return (
    <div ref={ref} style={{ position: "relative", flex: 1, minWidth: 180 }}>
      <label style={S.label}>{label}</label>
      <button onClick={() => setOpen(!open)} style={S.selectorBtn}>
        { && <span style={{ fontSize: 22 }}>{FLAGS[.country]}</span>}
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value || "Select..."}
        </span>
        <span style={{ marginLeft: "auto", opa: 0.4, fontSize: 13 }}>▼</span>
      </button>
      {open && (
        <div style={S.dropdown}>
          <div style={{ padding: 8 }}>
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search , region..."
              style={S.searchInput}
            />
          </div>
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            {Object.entries(filtered).map(([g, cities]) => (
              <div key={g}>
                <div
                  style={{
                    padding: "8px 16px 4px", fontSize: 11, fontWeight: 700,
                    color: "#ffc857", letterSpacing: 1.5, textTransform: "uppercase",
                  }}
                >
                  {g}
                </div>
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
                    style={{
                      width: "100%", padding: "9px 16px",
                      background: c === value ? "rgba(255,200,87,0.15)" : "transparent",
                      border: "none", color: "#fff", fontSize: 14, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 10,
                      fontFamily: "'DM Sans',sans-serif", textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      if (c !== value) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      if (c !== value) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <span>{FLAGS[CITIES_DATA[c].country]}</span>
                    <span style={{ flex: 1 }}>{c}</span>
                    <span style={{ opa: 0.35, fontSize: 11 }}>{CITIES_DATA[c].region}</span>
                  </button>
                ))}
              </div>
            ))}
            {Object.keys(filtered).length === 0 && (
              <div style={{ padding: "20px 16px", color: "#666", textAlign: "center", fontSize: 14 }}>
                No cities found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Comparison Bar ─── */
function ComparisonBar({ category, valueA, valueB, cityA, cityB }) {
  const max = Math.max(valueA, valueB);
  const pctA = max > 0 ? (valueA / max) * 100 : 0;
  const pctB = max > 0 ? (valueB / max) * 100 : 0;
  const diff = valueB > 0 ? ((valueA - valueB) / valueB * 100).toFixed(0) : 0;

  const bars = [
    { city: cityA, val: valueA, pct: pctA, cheaper: valueA <= valueB },
    { city: cityB, val: valueB, pct: pctB, cheaper: valueB <= valueA },
  ];

  return (
    <div style={{ ...S.card, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 17 }}>{category.icon}</span>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{category.label}</span>
          <span style={{ color: "#555", fontSize: 11 }}>{category.desc}</span>
        </div>
        <span
          style={{
            fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
            background: diff > 0 ? "rgba(255,107,107,0.15)" : diff < 0 ? "rgba(107,255,153,0.15)" : "rgba(255,255,255,0.08)",
            color: diff > 0 ? "#ff6b6b" : diff < 0 ? "#6bff99" : "#888",
          }}
        >
          {diff > 0 ? `+${diff}%` : `${diff}%`}
        </span>
      </div>
      {bars.map((b, i) => (
        <div key={i} style={{ marginBottom: i === 0 ? 6 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 11, color: "#aaa" }}>{b.city}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: b.cheaper ? "#6bff99" : "#fff", fontVariantNumeric: "tabular-nums" }}>
              €{b.val.toLocaleString()}
            </span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
            <div
              style={{
                height: "100%", borderRadius: 3, width: `${b.pct}%`,
                background: b.cheaper
                  ? "linear-gradient(90deg,#6bff99,#4ecdc4)"
                  : "linear-gradient(90deg,#ffc857,#ff6b6b)",
                transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [cityA, setCityA] = useState("Milano");
  const [cityB, setCityB] = useState("London");
  const [salary, setSalary] = useState(2000);
  const [showAll, setShowAll] = useState(false);

  const dataA = CITIES_DATA[cityA];
  const dataB = CITIES_DATA[cityB];
  const equivalentSalary =
    dataA && dataB && dataB.index > 0
      ? Math.round((salary / dataA.index) * dataB.index)
      : salary;
  const monthlyA = dataA ? dataA.rent1br + dataA.groceries + dataA.transport + dataA.utilities + dataA.internet : 0;
  const monthlyB = dataB ? dataB.rent1br + dataB.groceries + dataB.transport + dataB.utilities + dataB.internet : 0;
  const displayCategories = showAll ? CATEGORIES : CATEGORIES.slice(0, 6);
  const totalCities = Object.keys(CITIES_DATA).length;
  const italianCities = Object.values(CITIES_DATA).filter((c) => c.country === "IT").length;
  const salaryDiffPct = salary > 0 ? ((equivalentSalary - salary) / salary * 100).toFixed(0) : 0;

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* ─── Header ─── */}
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", ...S.gold, marginBottom: 12 }}>
            💰 Cost of Living Calculator
          </div>
          <h1
            style={{
              ...S.mono, fontSize: "clamp(26px,5vw,42px)", fontWeight: 700,
              margin: 0, lineHeight: 1.15,
              background: "linear-gradient(135deg,#fff 0%,#ffc857 50%,#ff6b6b 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}
          >
            Compare Your Cost of Living
          </h1>
          <p style={{ color: "#666", fontSize: 14, marginTop: 12 }}>
            {totalCities} cities · {italianCities} Italian regions · Real cost data
          </p>
        </header>

        {/* ─── City Selectors ─── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap", alignItems: "flex-end" }}>
          <CitySelector label="I live in" value={cityA} onChange={setCityA} excludeCity={cityB} />
          <div style={{ display: "flex", alignItems: "center", paddingBottom: 10 }}>
            <button
              onClick={() => { const t = cityA; setCityA(cityB); setCityB(t); }}
              style={{
                background: "rgba(255,200,87,0.1)", border: "1px solid rgba(255,200,87,0.25)",
                borderRadius: 10, color: "#ffc857", fontSize: 18, cursor: "pointer",
                padding: "10px 12px", lineHeight: 1, fontFamily: "'DM Sans',sans-serif",
              }}
              title="Swap cities"
            >
              ⇄
            </button>
          </div>
          <CitySelector label="Moving to" value={cityB} onChange={setCityB} excludeCity={cityA} />
        </div>

        {/* ─── Salary Calculator ─── */}
        <div
          style={{
            padding: "24px 28px", background: "rgba(255,200,87,0.06)", borderRadius: 16,
            border: "1px solid rgba(255,200,87,0.15)", marginBottom: 32,
          }}
        >
          <label style={{ ...S.label, ...S.gold }}>Your monthly salary in {cityA}</label>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24, fontWeight: 700, ...S.gold }}>€</span>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value) || 0)}
              style={{
                flex: 1, padding: "12px 0", background: "transparent", border: "none",
                borderBottom: "2px solid rgba(255,200,87,0.3)", color: "#fff",
                fontSize: 28, fontWeight: 700, outline: "none", ...S.mono,
                fontVariantNumeric: "tabular-nums",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 20, padding: "20px 24px", background: "rgba(255,255,255,0.04)",
              borderRadius: 12, display: "flex", justifyContent: "space-between",
              alignItems: "center", flexWrap: "wrap", gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                To maintain the same lifestyle in <strong style={{ color: "#ccc" }}>{cityB}</strong>
              </div>
              <div style={{ ...S.mono, fontSize: 32, fontWeight: 700, ...S.gold }}>
                €{equivalentSalary.toLocaleString()}
                <span style={{ fontSize: 14, fontWeight: 400, color: "#888" }}>/mo</span>
              </div>
            </div>
            <div
              style={{
                padding: "8px 16px", borderRadius: 24, fontWeight: 700, fontSize: 15,
                background: equivalentSalary > salary ? "rgba(255,107,107,0.15)" : "rgba(107,255,153,0.15)",
                color: equivalentSalary > salary ? "#ff6b6b" : "#6bff99",
              }}
            >
              {salaryDiffPct > 0 ? "+" : ""}{salaryDiffPct}%
            </div>
          </div>
        </div>

        {/* ─── Monthly Essentials ─── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
          {[[cityA, monthlyA], [cityB, monthlyB]].map(([city, total], i) => (
            <div key={i} style={{ ...S.card, padding: 20 }}>
              <div style={{ fontSize: 11, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                Monthly essentials
              </div>
              <div style={{ fontSize: 12, color: "#aaa", marginBottom: 2, display: "flex", alignItems: "center", gap: 6 }}>
                <span>{FLAGS[CITIES_DATA[city]?.country]}</span> {city}
              </div>
              <div style={{ ...S.mono, fontSize: 22, fontWeight: 700 }}>€{total.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* ─── Ad Slot 1 (after summary, before details) ─── */}
        <AdSlot id="ad-slot-1" />

        {/* ─── Detailed Comparison ─── */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 16 }}>
            Detailed Comparison
          </h2>
          {dataA &&
            dataB &&
            displayCategories.map((cat) => (
              <ComparisonBar
                key={cat.key}
                category={cat}
                valueA={dataA[cat.key]}
                valueB={dataB[cat.key]}
                cityA={cityA}
                cityB={cityB}
              />
            ))}
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                width: "100%", padding: "14px", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                color: "#ffc857", fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              Show all {CATEGORIES.length} categories ↓
            </button>
          )}
        </div>

        {/* ─── Insight ─── */}
        {dataA && dataB && (
          <div
            style={{
              padding: "24px 28px", background: "rgba(78,205,196,0.06)", borderRadius: 16,
              border: "1px solid rgba(78,205,196,0.15)", marginBottom: 32,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4ecdc4", marginBottom: 8 }}>
              💡 Quick Insight
            </div>
            <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {monthlyB > monthlyA
                ? `Living in ${cityB} costs about €${(monthlyB - monthlyA).toLocaleString()} more per month for essentials (rent, groceries, transport, utilities, internet). That's roughly €${((monthlyB - monthlyA) * 12).toLocaleString()} extra per year.${equivalentSalary > salary ? ` You'd need a ${salaryDiffPct}% salary increase to maintain your lifestyle.` : ""}`
                : monthlyA > monthlyB
                  ? `Great news! ${cityB} saves you about €${(monthlyA - monthlyB).toLocaleString()}/month on essentials — roughly €${((monthlyA - monthlyB) * 12).toLocaleString()} saved per year.`
                  : `${cityA} and ${cityB} have very similar costs for monthly essentials.`}
            </p>
          </div>
        )}

        {/* ─── Ad Slot 2 (after insight, before SEO content) ─── */}
        <AdSlot id="ad-slot-2" />

        {/* ─── SEO Content Section ─── */}
        <section style={{ marginBottom: 48, lineHeight: 1.8, color: "#999", fontSize: 14 }}>
          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
            How to Use the Cost of Living Calculator
          </h2>
          <p style={{ marginBottom: 12 }}>
            Moving to a new city? Our free cost of living calculator helps you understand exactly how much you'll need
            to earn to maintain your current lifestyle. Select your current city and your destination, enter your
            monthly salary, and instantly see a detailed breakdown of expenses — from rent and groceries to coffee
            and entertainment.
          </p>
          <p style={{ marginBottom: 12 }}>
            We compare {totalCities} cities across {Object.keys(FLAGS).length} countries, with special coverage of
            all {italianCities} Italian regions. Whether you're an expat planning a move, a digital nomad choosing
            your next base, or simply curious about how far your money goes in different cities, this tool gives
            you the data you need.
          </p>
          <h3 style={{ color: "#aaa", fontSize: 15, fontWeight: 600, marginBottom: 8, marginTop: 20 }}>
            What We Compare
          </h3>
          <p style={{ marginBottom: 12 }}>
            Our comparison covers 11 key categories: apartment rent (1-bedroom and 3-bedroom in city center),
            monthly groceries, public transport passes, restaurant meals, coffee, utilities (electricity, water, gas),
            internet, gym memberships, cinema tickets, and local beer prices. All values are converted to EUR
            for easy comparison.
          </p>
          <h3 style={{ color: "#aaa", fontSize: 15, fontWeight: 600, marginBottom: 8, marginTop: 20 }}>
            Salary Equivalent Calculator
          </h3>
          <p>
            The salary equivalent feature uses a composite cost-of-living index to calculate how much you'd
            need to earn in your destination city to enjoy the same quality of life. This factors in the
            relative costs across all categories, giving you a realistic picture beyond just rent prices.
          </p>
        </section>

        {/* ─── Footer ─── */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24,
            paddingBottom: 48, textAlign: "center", color: "#444", fontSize: 12,
          }}
        >
          <p>Data is approximate, based on 2024–2025 averages. All values in EUR equivalent.</p>
          <p style={{ marginTop: 8 }}>
            <a href="/privacy" style={{ color: "#555", textDecoration: "none", marginRight: 16 }}>Privacy Policy</a>
            <a href="/terms" style={{ color: "#555", textDecoration: "none" }}>Terms of Use</a>
          </p>
          <p style={{ marginTop: 12, color: "#333" }}>
            © {new Date().getFullYear()} costoflivingcompare.com — Compare, decide, move.
          </p>
        </footer>
      </div>
    </div>
  );
}
