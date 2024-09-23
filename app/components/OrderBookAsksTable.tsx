import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import OrderBookTable from "./OrderBookTable";

const OrderBookAsksTable: FC = () => {
  const { asks } = useSelector((state: RootState) => state.orderBook);

  const asksSlice = useMemo(() => {
    return asks;
  }, [asks]);

  return <OrderBookTable items={asksSlice} />;
};

export default OrderBookAsksTable;
