import { useState, useEffect } from "react";

const tbilisiUrl = "http://worldtimeapi.org/api/timezone/Asia/Tbilisi";
const milanUrl = "http://worldtimeapi.org/api/timezone/Europe/Rome";
const bratislavaUrl = "http://worldtimeapi.org/api/timezone/Europe/Bratislava";
const sydneyUrl = "http://worldtimeapi.org/api/timezone/Australia/Sydney";

function App() {
  const [tbilisiTime, setTbilisiTime] = useState(null);
  const [milanTime, setMilanTime] = useState(null);
  const [bratislavaTime, setBratislavaTime] = useState(null);
  const [sydneyTime, setSydneyTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setState) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const datetime = data.datetime.split("T")[1].split(":");
        const formattedTime = `${datetime[0]}:${datetime[1]}`;
        setState(formattedTime);
      } catch (err) {
        console.error("Fetching error: ", err);
        setError(`Failed to fetch data from ${url}`);
      }
    };

    fetchData(tbilisiUrl, setTbilisiTime);
    fetchData(milanUrl, setMilanTime);
    fetchData(bratislavaUrl, setBratislavaTime);
    fetchData(sydneyUrl, setSydneyTime);
  }, []);
  console.log(tbilisiTime);
  return (
    <>
      <h1>Tbilisi: {tbilisiTime}</h1>
      <h1>Milan: {milanTime}</h1>
      <h1>Bratislava: {bratislavaTime}</h1>
      <h1>Sydney: {sydneyTime}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default App;
