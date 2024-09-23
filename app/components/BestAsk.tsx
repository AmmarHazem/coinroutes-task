import { Text, Box } from "@chakra-ui/react";
import { FC } from "react";
import useAppSelector from "../hooks/useAppSelector";

const BestAsk: FC = () => {
  const { event, loading } = useAppSelector((state) => state.tickerChannel);

  return (
    <Box>
      <Box backgroundColor={"orange.400"} color={"white"} padding={2} fontWeight={500}>
        <Text>Best Ask</Text>
      </Box>
      <Box borderX={"1px"} borderBottom={"1px"} borderColor={"gray.200"} display={"flex"} justifyContent={"space-between"}>
        <Box padding={2} width={"50%"} borderRight={"1px"} borderColor={"gray.200"}>
          <Text fontWeight={600}>{loading ? "Loading" : event?.best_ask ?? "-"}</Text>
          <Text fontSize={"small"}>Ask Price</Text>
        </Box>
        <Box padding={2} width={"50%"}>
          <Text fontWeight={600}>{loading ? "Loading" : event?.best_ask_size ?? "-"}</Text>
          <Text fontSize={"small"}>Ask Quantity</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BestAsk;
