import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import AddTickerItemForm from "./components/AddTickerItemForm/AddTickerItemForm";
import TickerItem from "./components/TickerItem/TickerItem";

interface Ticker {
  id: string;
  code: string;
  dateFrom: Date;
  dateTo: Date;
}

function App() {
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [isLoading, setLoading] = useState<boolean>();
  const [isShowAddForm, setIsShowAddForm] = useState<boolean>(false);

  const getTickers = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_ADDRESS}/tickers`
    );
    const tickers = (await response.json()) as {
      id: string;
      code: string;
      dateTo: string;
      dateFrom: string;
    }[];
    return tickers.map((t) => {
      return {
        id: t.id,
        code: t.code,
        dateFrom: new Date(t.dateFrom),
        dateTo: new Date(t.dateTo),
      };
    });
  }, []);

  const addTicker = useCallback(
    async (code: string, dateFrom: string, dateTo: string) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_ADDRESS}/tickers`,
        {
          method: "POST",
          body: JSON.stringify({
            name: code,
            dateFrom,
            dateTo,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200)
        throw new Error(
          `Unable to create ticker with name ${code} at the moment`
        );
      
      setIsShowAddForm(false);

      getTickers().then((tickers) => {
        setTickers(tickers);
        setLoading(false);
      });
    },
    []
  );

  useEffect(() => {
    getTickers().then((tickers) => {
      setTickers(tickers);
      setLoading(false);
    });
  }, [getTickers]);

  return (
    <div className="App">
      <div className="ticker-items-list">
        {isShowAddForm ? (
          <AddTickerItemForm createTicker={addTicker} />
        ) : (
          <button
            onClick={() => {
              setIsShowAddForm(true);
            }}
          >
            Add Ticker
          </button>
        )}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          tickers.map((ticker) => (
            <TickerItem
              id={ticker.id}
              key={ticker.id}
              name={ticker.code}
              dateFrom={ticker.dateFrom}
              dateTo={ticker.dateTo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
