import { useState } from "react";
import axios from "axios";

export default function WarForm() {
  const [warName, setWarName] = useState("");
  const [rules, setRules] = useState("");
  const [banList, setBanList] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/wars", { warName, rules, banList });
      setMessage("War created successfully!");
      setWarName("");
      setRules("");
      setBanList("");
    } catch (error) {
      console.error(error);
      setMessage("Error creating war.");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Create New War</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>War Name:</label>
          <br />
          <input
            type="text"
            value={warName}
            onChange={(e) => setWarName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rules (JSON or text):</label>
          <br />
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            required
            rows="5"
          />
        </div>
        <div>
          <label>Ban List (Comma separated):</label>
          <br />
          <textarea
            value={banList}
            onChange={(e) => setBanList(e.target.value)}
            required
            rows="3"
          />
        </div>
        <button type="submit">Create War</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
