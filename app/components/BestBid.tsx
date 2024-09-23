import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import useAppSelector from "../hooks/useAppSelector";

const BestBid: FC = () => {
  const { event, loading } = useAppSelector((state) => state.tickerChannel);

  return (
    <Box>
      <Box backgroundColor={"blue.400"} color={"white"} padding={2} fontWeight={500}>
        <Text>Best Bid</Text>
      </Box>
      <Box borderX={"1px"} borderBottom={"1px"} borderColor={"gray.200"} display={"flex"} justifyContent={"space-between"}>
        <Box padding={2} width={"50%"} borderRight={"1px"} borderColor={"gray.200"}>
          <Text fontWeight={600}>{loading ? "Loading" : event?.best_bid ?? "-"}</Text>
          <Text fontSize={"small"}>Bid Price</Text>
        </Box>
        <Box padding={2} width={"50%"}>
          <Text fontWeight={600}>{loading ? "Loading" : event?.best_bid_size ?? "-"}</Text>
          <Text fontSize={"small"}>Bid Quantity</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BestBid;
