import React, { useEffect } from "react";

const App = () => {
  const [nums, setNums] = React.useState<number[]>([1]);
  const [maxNum, setMaxNum] = React.useState<number|string>(1);
  const [pnums, setpnums] = React.useState<number[]>([]);
  const [numToColor, setnumToColor] = React.useState<string[]>([]);

  useEffect(()=>{
    const init = 15
    setMaxNum(init)
    const n = Number(init)
    const ns = Array.from(Array(n + 1).keys());
    ns.shift();
    setNums(ns);
    setpnums(eratosthenes(n)); 
  }, [])

  const eratosthenes = (max: number): number[] => {
    const isPrime = [];
    for (let i = 0; i <= max; i++) {
      isPrime[i] = true;
    }
    const primes: number[] = [];
    for (let i = 2; i * i <= max; i++) {
      if (isPrime[i]) {
        const colors = ["#F1948A", "#7FB3D5", "#F7DC6F", "#B2BABB"];
        numToColor[i] = colors[i % 4];
        for (let j = 2; i * j <= max; j++) {
          isPrime[i * j] = false;
          if (numToColor[i * j]) continue;
          numToColor[i * j] = colors[i % 4];
        }
        setnumToColor([...numToColor]);
      }
    }
    isPrime.forEach((isP, i) => {
      if (isP && i >= 2) {
        primes.push(i);
      }
    });

    return primes;
  };

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
        value={maxNum}
        onChange={(e) => {
          if(e.target.value === '') {
            setMaxNum('')
            return;
          }
          let n = Number(e.target.value);
          if (n <= -1 || n >= 1e4) n = 0;
          setMaxNum(n);
          const ns = Array.from(Array(n + 1).keys());
          ns.shift();
          setNums(ns);
          setpnums(eratosthenes(n));
        }}
      ></input>
      <div>
        <p>prime numbers</p>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
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
