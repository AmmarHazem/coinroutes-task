import { FC, useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { TickerDataModel } from "../models/TickerDataModel";
import moment from "moment";
import useAppSelector from "../hooks/useAppSelector";

interface PriceChartDataItem {
  event: TickerDataModel;
  time: moment.Moment;
}

const numberOfPoints = 12;

const PriceChart: FC = () => {
  const selectedCurrencyPair = useAppSelector((state) => state.currencyPair.selectedCurrencyPair);
  const tickerData = useAppSelector((state) => state.tickerChannel.event);

  const [data, setData] = useState<PriceChartDataItem[]>(() => {
    if (!tickerData) return [];
    const currentMoment = moment();
    const currentSecond = currentMoment.get("second");
    if (currentSecond !== 0 && currentSecond !== 15 && currentSecond !== 30 && currentSecond !== 45) {
      return [];
    }
    return [
      {
        event: { ...tickerData },
        time: moment().startOf("minute"),
      },
    ];
  });

  useEffect(() => {
    if (tickerData && !data.length) {
      setData([{ event: { ...tickerData }, time: moment().startOf("minute") }]);
    }
  }, [data.length, tickerData]);

  useEffect(() => {
    if (selectedCurrencyPair) {
      setData([]);
    }
  }, [selectedCurrencyPair]);

  const labels = useMemo<string[]>(() => {
    return data.map((item) => item.time.format("HH:mm:ss"));
  }, [data]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (!tickerData) return;
      const currentMoment = moment();
      const currentSecond = currentMoment.get("second");
      if (currentSecond !== 0 && currentSecond !== 15 && currentSecond !== 30 && currentSecond !== 45) {
        return;
      }
      setData((value) => {
        const newValue = [...value, { event: { ...tickerData }, time: currentMoment }];
        if (newValue.length > numberOfPoints) {
          newValue.shift();
        }
        return newValue;
      });
    }, 1000);
    return () => clearInterval(intervalID);
  }, [tickerData]);

  const bids = useMemo(() => data.map((item) => item.event.best_bid), [data]);
  const asks = useMemo(() => data.map((item) => item.event.best_ask), [data]);

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Line Chart Example",
          },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            label: "Bids",
            data: bids,
            stepped: true,
            borderColor: "#4299e1",
            fill: false,
          },
          {
            label: "Asks",
            data: asks,
            stepped: false,
            borderColor: "#ED8936",
            fill: false,
          },
        ],
      }}
    />
  );
};

export default PriceChart;
