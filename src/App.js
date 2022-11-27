import Instructions from "./Instructions";
import "./App.css";
import { useCallback, useState } from "react";

const Card = ({ number, del }) => {
  return (
    <div className="card">
      <button className="delBtn" onClick={del}>
        x
      </button>
      {number}
    </div>
  );
};

function App() {
  const [number, setNumber] = useState([]);

  const handleGenerateNumber = useCallback(
    (idx) => {
      let num = Math.round(Math.random() * 99 + Math.random() * 9);
      if (!number.includes(num)) {
        return num;
      }
      return handleGenerateNumber(idx);
    },
    [number]
  );

  return (
    <div className="container">
      <div className="main">
        <div className="header">
          <button
            className="addCardBtn"
            onClick={() =>
              setNumber((prev) => [...prev, handleGenerateNumber()])
            }
          >
            {" "}
            Add card
          </button>
          <button
            className="sortCardBtn"
            onClick={() =>
              setNumber((prev) => {
                const arr = [...prev];
                arr.sort((a, b) => a - b);
                return arr;
              })
            }
            disabled={number.length <= 1}
          >
            Sort cards
          </button>
        </div>
        <div className="cardContainer">
          {number.map((number, idx) => (
            <Card
              key={idx}
              {...{
                number,
                del: () =>
                  setNumber((prev) => {
                    const arr = [...prev];
                    arr.splice(idx, 1);
                    return arr;
                  }),
              }}
            />
          ))}
        </div>
        <div className="footer">Footer</div>
      </div>
      <Instructions />
    </div>
  );
}

export default App;
