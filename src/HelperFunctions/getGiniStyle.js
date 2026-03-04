export default function getGiniStyle(value) {
  if (value > 50) return {borderradius: "8px", background: "black", color: "white" };
  if (value >= 40) return { background: "#2f2f2f", color: "#d9534f" }; // red
  if (value >= 30) return { background: "#2f2f2f", color: "#f0ad4e" }; // yellow
  if (value >= 20) return { background: "#2f2f2f", color: "#5cb85c" }; // green
  return { background: "#5bc0de", color: "black" }; // light blue
}