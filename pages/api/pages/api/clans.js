// pages/api/clans.js
let clans = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { clan } = req.body;
    clans.push(clan);
    res.status(200).json(clan);
  } else if (req.method === "GET") {
    res.status(200).json(clans);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
