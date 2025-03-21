let wars = []; // In-memory storage; replace with a database in production.

export default function handler(req, res) {
  if (req.method === "POST") {
    const { warName, rules, banList } = req.body;
    const newWar = {
      id: Date.now(),
      warName,
      rules,
      banList: banList.split(",").map((s) => s.trim()),
      createdAt: new Date().toISOString()
    };
    wars.push(newWar);
    res.status(200).json(newWar);
  } else if (req.method === "GET") {
    res.status(200).json(wars);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
