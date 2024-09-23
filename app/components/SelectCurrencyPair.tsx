import { Select } from "@chakra-ui/react";
import { FC } from "react";
import { setCurrencyPair } from "../redux/currencyPairSlice";
import { currencyPairs } from "../constants";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

const SelectCurrencyPair: FC = () => {
  const selectedCurrencyPair = useAppSelector((state) => state.currencyPair.selectedCurrencyPair);
  const dispatch = useAppDispatch();

  return (
    <Select
      placeholder="Select currency pair"
      width={{ base: "100%", md: "200px" }}
      value={selectedCurrencyPair}
      onChange={(e) => {
        dispatch(setCurrencyPair(e.target.value));
      }}
    >
      {currencyPairs.map((currencyPair) => (
        <option key={currencyPair} value={currencyPair}>
          {currencyPair}
        </option>
      ))}
    </Select>
  );
};

export default SelectCurrencyPair;
