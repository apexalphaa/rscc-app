export function formatOvers(legalBalls) {

  const overs = Math.floor(legalBalls / 6);

  const balls = legalBalls % 6;

  return `${overs}.${balls}`;

}
