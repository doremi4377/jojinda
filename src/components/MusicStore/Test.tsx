import React, { useState, useEffect } from "react";

export default function PlayItem() {
  const [count, setCount] = useState(() => JSON.parse(localStorage.getItem("count") || "{}"));

  useEffect(() => {
    window.localStorage.setItem("count", JSON.stringify(count));
  }, [count]);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
