import { CITIES_DATA } from "./data.js";

// Convert city name to URL slug
export function toSlug(name) {
  return name.toLowerCase().replace(/['']/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Convert slug back to city name
export function fromSlug(slug) {
  return Object.keys(CITIES_DATA).find((c) => toSlug(c) === slug) || null;
}

// Top comparison pairs (high search volume)
export const POPULAR_COMPARISONS = [
  // Italy vs World
  ["Milano", "London"], ["Milano", "Paris"], ["Milano", "Berlin"], ["Milano", "New York"],
  ["Milano", "Barcelona"], ["Milano", "Amsterdam"], ["Milano", "Dubai"], ["Milano", "Zürich"],
  ["Roma", "London"], ["Roma", "Paris"], ["Roma", "Berlin"], ["Roma", "Barcelona"],
  ["Roma", "Madrid"], ["Roma", "New York"], ["Roma", "Amsterdam"],
  ["Napoli", "London"], ["Napoli", "Barcelona"], ["Napoli", "Berlin"],
  ["Torino", "London"], ["Torino", "Paris"], ["Torino", "Munich"],
  ["Firenze", "London"], ["Firenze", "Paris"], ["Firenze", "Barcelona"],
  ["Bologna", "London"], ["Bologna", "Berlin"], ["Bologna", "Amsterdam"],
  // Italy vs Italy
  ["Milano", "Roma"], ["Milano", "Napoli"], ["Milano", "Torino"], ["Milano", "Bologna"],
  ["Milano", "Firenze"], ["Milano", "Venezia"], ["Milano", "Padova"],
  ["Roma", "Napoli"], ["Roma", "Firenze"], ["Roma", "Bologna"], ["Roma", "Torino"],
  ["Napoli", "Palermo"], ["Napoli", "Bari"], ["Napoli", "Catanzaro"],
  ["Torino", "Genova"], ["Bologna", "Firenze"], ["Padova", "Bologna"],
  ["Venezia", "Firenze"], ["Trieste", "Padova"],
  // World vs World
  ["London", "Paris"], ["London", "New York"], ["London", "Berlin"], ["London", "Amsterdam"],
  ["London", "Dublin"], ["London", "Barcelona"], ["London", "Lisbon"],
  ["New York", "San Francisco"], ["New York", "Los Angeles"], ["New York", "Chicago"],
  ["New York", "London"], ["New York", "Tokyo"], ["New York", "Paris"],
  ["Paris", "Berlin"], ["Paris", "Amsterdam"], ["Paris", "Barcelona"], ["Paris", "Lisbon"],
  ["Berlin", "Munich"], ["Berlin", "Amsterdam"], ["Berlin", "Prague"], ["Berlin", "Warsaw"],
  ["Barcelona", "Madrid"], ["Barcelona", "Lisbon"],
  ["Amsterdam", "Brussels"], ["Amsterdam", "Copenhagen"],
  ["Zürich", "Vienna"], ["Zürich", "Munich"],
  ["Dubai", "Singapore"], ["Dubai", "London"],
  ["Tokyo", "Seoul"], ["Tokyo", "Singapore"],
  ["Sydney", "Melbourne"], ["Sydney", "London"],
  ["Bangkok", "Singapore"], ["Bangkok", "Tokyo"],
  ["Lisbon", "Madrid"], ["Lisbon", "Barcelona"],
  ["Prague", "Budapest"], ["Prague", "Warsaw"], ["Prague", "Vienna"],
  ["Copenhagen", "Stockholm"], ["Stockholm", "Oslo"], ["Oslo", "Helsinki"],
];

// Get popular comparisons for a specific city
export function getComparisonsForCity(cityName) {
  return POPULAR_COMPARISONS.filter(
    ([a, b]) => a === cityName || b === cityName
  ).map(([a, b]) => (a === cityName ? b : a));
}

// Generate SEO text for a comparison
export function generateComparisonText(cityA, cityB) {
  const a = CITIES_DATA[cityA];
  const b = CITIES_DATA[cityB];
  if (!a || !b) return "";

  const monthlyA = a.rent1br + a.groceries + a.transport + a.utilities + a.internet;
  const monthlyB = b.rent1br + b.groceries + b.transport + b.utilities + b.internet;
  const diff = monthlyB - monthlyA;
  const pct = ((diff / monthlyA) * 100).toFixed(0);
  const cheaper = diff > 0 ? cityA : cityB;
  const expensive = diff > 0 ? cityB : cityA;

  return `How does the cost of living in ${cityA} compare to ${cityB}? Our detailed analysis shows that ${cheaper} is approximately ${Math.abs(pct)}% more affordable than ${expensive} for basic monthly expenses. A single person's estimated monthly costs in ${cityA} are around €${monthlyA.toLocaleString()} (including rent, groceries, transport, utilities, and internet), compared to €${monthlyB.toLocaleString()} in ${cityB}. The biggest difference is in rent: a one-bedroom apartment in ${cityA} city center costs around €${a.rent1br.toLocaleString()}/month versus €${b.rent1br.toLocaleString()} in ${cityB}. If you earn €2,000/month in ${cityA}, you would need approximately €${Math.round((2000 / a.index) * b.index).toLocaleString()} in ${cityB} to maintain the same quality of life.`;
}

// Generate SEO text for a single city
export function generateCityText(cityName) {
  const c = CITIES_DATA[cityName];
  if (!c) return "";
  const monthly = c.rent1br + c.groceries + c.transport + c.utilities + c.internet;

  return `${cityName} (${c.region}, ${c.country}) has a cost of living index of ${c.index} (London = 100). A single person's estimated monthly costs are around €${monthly.toLocaleString()}, including rent for a one-bedroom apartment in the city center (€${c.rent1br.toLocaleString()}), groceries (€${c.groceries}), public transport (€${c.transport}), utilities (€${c.utilities}), and internet (€${c.internet}). A cappuccino costs about €${c.coffee}, a meal at an inexpensive restaurant is around €${c.dining}, and a monthly gym membership runs €${c.gym}.`;
}

// All city slugs for sitemap
export function getAllCitySlugs() {
  return Object.keys(CITIES_DATA).map(toSlug);
}

// All comparison slugs for sitemap
export function getAllComparisonSlugs() {
  return POPULAR_COMPARISONS.map(([a, b]) => `${toSlug(a)}-vs-${toSlug(b)}`);
}
