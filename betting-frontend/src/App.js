import { useEffect, useState } from "react";

function App() {
  const [tips, setTips] = useState([]);

  // Input states
  const [match, setMatch] = useState("");
  const [tip, setTip] = useState("");
  const [odds, setOdds] = useState("");

  // Fetch data (GET)
  useEffect(() => {
    fetch("http://localhost:5000/tips")
      .then((res) => res.json())
      .then((data) => setTips(data))
      .catch(() => console.log("Error fetching data"));
  }, []);

  // Add new ticket (POST)
  const addTicket = () => {
    const newTicket = {
      type: "Custom",
      games: [
        { match, tip, odds: parseFloat(odds) }
      ],
      totalOdds: parseFloat(odds),
      result: "PENDING"
    };

    fetch("http://localhost:5000/tips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTicket)
    })
      .then(() => window.location.reload())
      .catch(() => console.log("Error adding ticket"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🔥 Betting Tips System</h1>

      {/* Input Form */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          placeholder="Match"
          value={match}
          onChange={(e) => setMatch(e.target.value)}
        />
        <input
          placeholder="Tip"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
        />
        <input
          placeholder="Odds"
          value={odds}
          onChange={(e) => setOdds(e.target.value)}
        />

        <button onClick={addTicket}>Add Ticket</button>
      </div>

      {/* Tickets Display */}
      {tips.map((ticket, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            margin: "20px auto",
            padding: "15px",
            width: "80%",
            borderRadius: "10px"
          }}
        >
          <h3>{ticket.type} Ticket</h3>

          {ticket.games.map((game, i) => (
            <p key={i}>
              {game.match} — {game.tip} — {game.odds}
            </p>
          ))}

          <hr />

          <p><strong>Total Odds:</strong> {ticket.totalOdds}</p>

          <p>
            <strong>Result:</strong>{" "}
            <span
              style={{
                backgroundColor: ticket.result === "WIN" ? "green" : "#ccc",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px"
              }}
            >
              {ticket.result}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;




