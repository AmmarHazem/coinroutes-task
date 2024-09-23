import { Text } from "@chakra-ui/react";
import { FC } from "react";
import useAppSelector from "../hooks/useAppSelector";

const Spread: FC = () => {
  const { event } = useAppSelector((state) => state.tickerChannel);

  return <Text>Spread: {event?.spread.toLocaleString()}</Text>;
};

export default Spread;
