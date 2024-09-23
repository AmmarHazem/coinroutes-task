import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import OrderBookTable from "./OrderBookTable";

const OrderBookBidsTable: FC = () => {
  const { bids } = useSelector((state: RootState) => state.orderBook);

  const bidsSlice = useMemo(() => {
    return bids;
  }, [bids]);

  return <OrderBookTable items={bidsSlice} />;
};

export default OrderBookBidsTable;
