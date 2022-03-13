import { useEffect, useState } from "react";
import Props from "./Props";
import "./TickerItem.scss";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

interface HistoryItem {
  date: Date;
  value: number;
}

function TickerItem({ name, dateFrom, dateTo, id }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>();

  const options: Highcharts.Options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        type: "line",
        data: historyItems?.map(hi => [hi.date.getTime(), hi.value]),
      },
    ],
  };

  console.log(options);

  useEffect(() => {
    if (isOpen && !historyItems)
      fetch(`${process.env.REACT_APP_API_BASE_ADDRESS}/Tickers/${id}`).then(
        async (response) => {
          const history = (await response.json()) as {
            code: string;
            id: string;
            historyRecords: { value: number; date: string }[];
          };

          setHistoryItems(
            history.historyRecords.map((hr) => {
              return {
                date: new Date(hr.date),
                value: hr.value,
              };
            })
          );
        }
      );
  }, [isOpen, historyItems, id]);

  return (
    <div className="ticker-item">
      <div className="ticker-item__short-info">
        <h2>{name}</h2>
        <div>{dateFrom.toLocaleDateString("RU-RU")}</div>
        <div>{dateTo.toLocaleDateString("RU-RU")}</div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {" "}
          {!isOpen ? "\\/" : "/\\"}
        </button>
      </div>
      <div>
          {isOpen && (
            <HighchartsReact highcharts={Highcharts}constructorType={'stockChart'} options={options} />
          )}
        </div>
    </div>
  );
}

export default TickerItem;
