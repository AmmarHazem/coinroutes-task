import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import BestBid from "./BestBid";
import BestAsk from "./BestAsk";
import Spread from "./Spread";
import Volume24h from "./24Volume";

const BestBidAndAsk: FC = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} padding={2}>
      <Spread />
      <Volume24h />
      <BestBid />
      <BestAsk />
    </SimpleGrid>
  );
};

// interface BestBidAndAskProps {}

export default BestBidAndAsk;
