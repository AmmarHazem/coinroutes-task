import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Box, Heading, Container } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import type { MetaFunction } from "@remix-run/node";
import BestBidAndAsk from "~/components/BestBidAndAsk";
import OrderBook from "~/components/OrderBook";
import PriceChart from "~/components/PriceChart";
import SelectCurrencyPair from "~/components/SelectCurrencyPair";
import useWebsocketEvents from "~/hooks/useWebsocketEvents";

export const meta: MetaFunction = () => {
  return [{ title: "CoinRoutes Task" }, { name: "description", content: "CoinRoutes Task" }];
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Index() {
  useWebsocketEvents();

  return (
    <>
      <Toaster />
      <Box paddingX={2} paddingY={2} backgroundColor={"gray.50"} borderBottom={"1px"} borderColor={"gray.200"}>
        <Container
          display={"flex"}
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 0 }}
          maxW={"1200px"}
          justifyContent={"space-between"}
        >
          <Heading width={{ base: "100%", md: "50%" }} lineHeight={"1"}>
            Real Time Chart
          </Heading>
          <SelectCurrencyPair />
        </Container>
      </Box>
      <Container maxW={"1200px"}>
        <BestBidAndAsk />
        <PriceChart />
        <OrderBook />
      </Container>
    </>
  );
}
