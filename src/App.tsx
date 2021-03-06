import React, { useEffect } from "react";

const eratosthenes = (max: number): number[] => {
  const isPrime = [];
  for (let i = 0; i <= max; i++) {
    isPrime[i] = true;
  }
  const primes: number[] = [];
  for (let i = 2; i * i <= max; i++) {
    if (isPrime[i]) {
      for (let j = 2; i * j <= max; j++) {
        isPrime[i * j] = false;
      }
    }
  }
  isPrime.forEach((isP, i) => {
    if (isP && i >= 2) {
      primes.push(i);
    }
  });

  return primes;
};

const App = () => {
  const [nums, setNums] = React.useState<number[]>([1]);
  const [maxNum, setMaxNum] = React.useState<number>(10);
  const [pnums, setpnums] = React.useState<number[]>([]);
  const [input, setInput] = React.useState<string>("10");
  const [numToColor, setnumToColor] = React.useState<string[]>([]);

  useEffect(() => {
    const ns = Array.from(Array(maxNum + 1).keys());
    ns.shift();
    setNums(ns);
    setpnums(eratosthenes(maxNum));
  }, [maxNum]);

  const num = (props: { num: number }) => {
    const { num } = props;
    const color = numToColor[num] || "#fff";
    const isPrime = pnums.includes(num);
    return (
      <div
        key={num}
        style={{
          backgroundColor: color,
          marginRight: "1em",
          fontWeight: isPrime ? "bold" : "normal",
        }}
      >
        {num}
      </div>
    );
  };

  return (
    <div className="App">
      <input
        type="number"
        value={input}
        onChange={(e) => {
          if (e.target.value === "") {
            setInput("");
            return;
          }
          let n = Number(e.target.value);
          if (n <= -1 || n >= 1e4) n = 0;
          setMaxNum(n);
          setInput(e.target.value);
        }}
      ></input>
      <div>
        <p>prime numbers</p>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {pnums.map((num) => (
            <div key={num} style={{ marginRight: "1em" }}>
              {num}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p>numbers</p>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {nums.map((n) => num({ num: n }))}
        </div>
      </div>
    </div>
  );
};

export default App;
