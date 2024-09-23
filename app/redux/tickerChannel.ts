import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TickerDataModel } from "../models/TickerDataModel";

interface TickerChannelState {
  event?: TickerDataModel;
  loading: boolean;
}

const initialState: TickerChannelState = {
  loading: true,
};

export const tickerChannelSlice = createSlice({
  name: "tickerChannel",
  initialState: initialState,
  reducers: {
    setTickerChannelEvent: (state, action: PayloadAction<TickerDataModel | undefined>) => {
      state.event = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTickerChannelEvent, setLoading } = tickerChannelSlice.actions;

export default tickerChannelSlice.reducer;
