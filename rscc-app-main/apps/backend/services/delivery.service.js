const postJson = async (url, headers, body) => {
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(await response.text());
};

export const deliverPasswordReset = async ({ email, phone, token }) => {
  const jobs = [];
  if (process.env.RESEND_API_KEY && process.env.MAIL_FROM) jobs.push(postJson("https://api.resend.com/emails", { Authorization: `Bearer ${process.env.RESEND_API_KEY}` }, { from: process.env.MAIL_FROM, to: [email], subject: "RSCC password reset", text: `Your RSCC reset token is ${token}. It expires in 15 minutes.` }));
  if (phone && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM) {
    const body = new URLSearchParams({ To: phone, From: process.env.TWILIO_FROM, Body: `Your RSCC reset token is ${token}. It expires in 15 minutes.` });
    jobs.push(fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" }, body }).then(r => { if (!r.ok) throw new Error("Twilio delivery failed"); }));
  }
  await Promise.all(jobs);
  return jobs.length > 0;
};
