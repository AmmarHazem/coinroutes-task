import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyPairState {
  selectedCurrencyPair: string;
}

const initialState: CurrencyPairState = {
  selectedCurrencyPair: "BTC-USD",
};

export const currencyPairSlice = createSlice({
  name: "currencyPair",
  initialState: initialState,
  reducers: {
    setCurrencyPair: (state, action: PayloadAction<string>) => {
      state.selectedCurrencyPair = action.payload;
    },
  },
});

export const { setCurrencyPair } = currencyPairSlice.actions;

export default currencyPairSlice.reducer;
