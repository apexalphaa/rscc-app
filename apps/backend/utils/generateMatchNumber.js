export default function generateMatchNumber() {

  const year = new Date().getFullYear();

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `RSCC-M-${year}-${random}`;

}
