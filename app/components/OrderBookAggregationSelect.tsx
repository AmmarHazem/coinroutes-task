import { Box, Select } from "@chakra-ui/react";
import { setAggregation } from "../redux/orderBookSlice";
import { ChangeEvent, FC } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

const OrderBookAggregationSelect: FC = () => {
  const dispatch = useAppDispatch();
  const aggregation = useAppSelector((state) => state.orderBook.aggregation);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAggregation(Number(event.target.value)));
  };

  return (
    <Box display={"flex"} alignItems={{ base: "flex-start", md: "center" }} gap={2} flexDir={{ base: "column", md: "row" }}>
      <label htmlFor="aggregation-select">Aggregation</label>
      <Select width={"200px"} id="aggregation-select" onChange={handleChange} value={aggregation}>
        <option value="0.01">0.01</option>
        <option value="0.05">0.05</option>
        <option value="0.1">0.1</option>
      </Select>
    </Box>
  );
};

export default OrderBookAggregationSelect;
