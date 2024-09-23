import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateOrderBookEventModel } from "../models/UpdateOrderBookEventModel";
import { orderBookSliceSize } from "../constants";

export interface OrderBookState {
  type: "snapshot";
  aggregation: number;
  bids: [string, string][];
  asks: [string, string][];
}

const initialState: OrderBookState = {
  type: "snapshot",
  aggregation: 0.01,
  bids: [],
  asks: [],
};

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    setOrderBookSnapshot: (state, action: PayloadAction<OrderBookState>) => {
      state.bids = action.payload.bids;
      state.asks = action.payload.asks;
    },
    setAggregation: (state, action: PayloadAction<number>) => {
      state.aggregation = action.payload;
      state.bids = handleAggregation({ list: state.bids, aggregation: action.payload });
      state.asks = handleAggregation({ list: state.asks, aggregation: action.payload });
    },
    updateOrderBook: (state, action: PayloadAction<UpdateOrderBookEventModel>) => {
      action.payload.changes.forEach((change: [string, string, string]) => {
        const [side, price, size] = change;
        let orderList = side === "buy" ? state.bids : state.asks;
        const index = orderList.findIndex((order) => order[0] === price);
        if (size === "0" && index !== -1) {
          orderList = orderList.splice(index, 1);
        } else if (index !== -1) {
          orderList[index] = [price, size];
        } else {
          orderList.push([price, size]);
          orderList.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
        }
        if (side === "buy") {
          state.bids = handleAggregation({ list: orderList, aggregation: state.aggregation }).slice(0, orderBookSliceSize);
        } else {
          state.asks = handleAggregation({ list: orderList, aggregation: state.aggregation }).slice(0, orderBookSliceSize);
        }
      });
    },
  },
});

function roundPrice(price: number, aggregationValue: number): number {
  const roundParam = 1 / aggregationValue;
  return Math.round(price * roundParam) / roundParam;
}

function handleAggregation({ list, aggregation }: { list: [string, string][]; aggregation: number }): [string, string][] {
  if (aggregation === 0.01) return list;
  const aggregatedValues = new Map<number, number>();
  for (const [price, size] of list) {
    const roundedPrice = roundPrice(parseFloat(price), aggregation);
    const currentSize = aggregatedValues.get(roundedPrice) || 0;
    aggregatedValues.set(roundedPrice, currentSize + parseFloat(size));
  }
  const value = Array.from(aggregatedValues.entries()).map<[string, string]>(([price, size]) => [
    price.toString(),
    size.toString(),
  ]);
  return value;
}

export const { setOrderBookSnapshot, updateOrderBook, setAggregation } = orderBookSlice.actions;
export default orderBookSlice.reducer;
