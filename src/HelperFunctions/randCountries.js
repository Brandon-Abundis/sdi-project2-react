
export default function randCountries(countries) {
  if (!countries || countries.length === 0) return;

    let num1, num2, num3;

    do {
      num1 = Math.floor(Math.random() * countries.length);
      num2 = Math.floor(Math.random() * countries.length);
      num3 = Math.floor(Math.random() * countries.length);
    } while (num1 === num2 || num1 === num3 || num2 === num3);

    const entries = [
      countries[num1],
      countries[num2],
      countries[num3],
    ];

    return entries;
}