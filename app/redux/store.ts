import { configureStore } from "@reduxjs/toolkit";
import currencyPairReducer from "./currencyPairSlice";
import tickerChannelReducer from "./tickerChannel";
import orderBookReducer from "./orderBookSlice";

const store = configureStore({
  reducer: {
    currencyPair: currencyPairReducer,
    tickerChannel: tickerChannelReducer,
    orderBook: orderBookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
