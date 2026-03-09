export default function getGiniStyle(value) {
  const base = {
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: "bold",
    display: "inline-block"
  };

  if (value > 50) {
    return {
      ...base,
      background: "black",
      color: "white"
    };
  }
  if (value >= 40) {
    return {
      ...base,
      background: "#2f2f2f",
      color: "#d9534f" // red
    };
  }
  if (value >= 30) {
    return {
      ...base,
      background: "#2f2f2f",
      color: "#f0ad4e" // yellow
    };
  }
  if (value >= 20) {
    return {
      ...base,
      background: "#2f2f2f",
      color: "#5cb85c" // green
    };
  }

  return {
    ...base,
    background: "#5bc0de",
    color: "black" // light blue
  };
}
