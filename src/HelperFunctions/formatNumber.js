export default function formatNumber(num) {
  if (num == null || isNaN(num)) return "";

  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const str = String(Math.floor(abs));
  const len = str.length;

  if (len >= 13) return sign + (abs / 1_000_000_000_000).toFixed(1) + " trillion";
  if (len >= 10) return sign + (abs / 1_000_000_000).toFixed(1) + " billion";
  if (len >= 7)  return sign + (abs / 1_000_000).toFixed(1) + " million";

  return sign + abs.toLocaleString("en-US");
}
