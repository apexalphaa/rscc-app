export default function generateTeamCode(category, name) {

    const prefix = "RSCC";

    const year = new Date().getFullYear();

    const short = name
        .replace(/\s+/g, "")
        .substring(0, 3)
        .toUpperCase();

    return `${prefix}-${category}-${short}-${year}`;

}
