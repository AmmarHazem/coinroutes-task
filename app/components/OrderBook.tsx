import { Box, Divider, Heading, Spinner } from "@chakra-ui/react";
import { Colors } from "../constants";
import { FC } from "react";
import OrderBookAggregationSelect from "./OrderBookAggregationSelect";
import OrderBookBidsTable from "./OrderBookBidsTable";
import OrderBookAsksTable from "./OrderBookAsksTable";
import useAppSelector from "~/hooks/useAppSelector";

const OrderBook: FC = () => {
  const { loading } = useAppSelector((state) => state.tickerChannel);

  return (
    <Box
      maxW={"600px"}
      width={"100%"}
      marginX={"auto"}
      backgroundColor={Colors.Neutral[800]}
      color={"white"}
      padding={4}
      marginTop={8}
    >
      <Box
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        gap={{ base: 4, md: 0 }}
        alignItems={{ base: "flex-start", md: "center" }}
      >
        <Heading size={"md"}>Order Book {loading && <Spinner size={"sm"} />}</Heading>
        <OrderBookAggregationSelect />
      </Box>
      <Divider borderColor={Colors.Neutral[700]} marginY={4} />
      <div className="order-book-columns">
        <div className="bids">
          <Heading color={Colors.Neutral[500]} fontWeight={600} size={"md"}>
            Bids
          </Heading>
          <OrderBookBidsTable />
        </div>
        <Divider borderColor={Colors.Neutral[700]} marginY={4} />
        <div className="asks">
          <Heading color={Colors.Neutral[500]} fontWeight={600} size={"md"}>
            Asks
          </Heading>
          <OrderBookAsksTable />
        </div>
      </div>
    </Box>
  );
};

export default OrderBook;
