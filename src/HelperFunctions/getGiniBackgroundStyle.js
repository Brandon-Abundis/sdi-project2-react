export default function getGiniBackgroundStyle(value) {
  if (value > 50) {
    return {
      background: "#000000",
      color: "white",
      padding: "8px 12px",
      borderRadius: "6px"
    };
  }
  if (value >= 40) {
    return {
      background: "#8b0000", // dark red
      color: "white",
      padding: "8px 12px",
      borderRadius: "6px"
    };
  }
  if (value >= 30) {
    return {
      background: "#b8860b", // dark goldenrod
      color: "black",
      padding: "8px 12px",
      borderRadius: "6px"
    };
  }
  if (value >= 20) {
    return {
      background: "#006400", // dark green
      color: "white",
      padding: "8px 12px",
      borderRadius: "6px"
    };
  }
  return {
    background: "#5bc0de", // light blue
    color: "black",
    padding: "8px 12px",
    borderRadius: "6px"
  };
}
