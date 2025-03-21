// pages/api/wars.js
let wars = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { warData } = req.body;
    const newWar = { id: Date.now(), ...warData, createdAt: new Date().toISOString() };
    wars.push(newWar);
    res.status(200).json(newWar);
  } else if (req.method === "GET") {
    res.status(200).json(wars);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
