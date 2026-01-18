import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [wins, setWins] = useState([]);
  const [streak, setStreak] = useState(
    Number(localStorage.getItem("streak")) || 0
  );

  // Load wins from localStorage on start
  useEffect(() => {
    const storedWins = JSON.parse(localStorage.getItem("wins")) || [];
    setWins(storedWins);
  }, []);

  // Save wins to localStorage whenever wins change
  useEffect(() => {
    localStorage.setItem("wins", JSON.stringify(wins));
  }, [wins]);

  // Add win
  function addWin() {
    if (!text.trim()) return;

    setWins([...wins, { text: text.trim(), done: false }]);
    setText("");
  }

  // Delete win
  function deleteWin(index) {
    const newWins = wins.filter((_, i) => i !== index);
    setWins(newWins);
  }

  // Checkbox change
  function toggleDone(index) {
    const newWins = wins.map((win, i) => {
      if (i === index) {
        return { ...win, done: !win.done };
      }
      return win;
    });
    setWins(newWins);

    // Streak logic (only when checked)
    const today = new Date().toLocaleDateString();
    const lastDate = localStorage.getItem("lastDate");

    if (lastDate !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem("streak", newStreak);
      localStorage.setItem("lastDate", today);
    }
  }

  return (
    <div className="container">
      <h1>Daily Small Wins Tracker</h1>

      <div className="input-group">
        <input
          placeholder="enter your win"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addWin}>Add</button>
      </div>

      <ul>
        {wins.map((win, index) => (
          <li key={index}>
            <div>
              <input
                type="checkbox"
                checked={win.done}
                onChange={() => toggleDone(index)}
              />
              <span className={win.done ? "done" : ""}>{win.text}</span>
            </div>

            <button className="delete-btn" onClick={() => deleteWin(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p>
        Streak🔥 : <span>{streak}</span>
      </p>
    </div>
  );
}

export default App;
