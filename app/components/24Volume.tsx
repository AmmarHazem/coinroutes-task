import { Text } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import useAppSelector from "../hooks/useAppSelector";

const Volume24h: FC = () => {
  const { event } = useAppSelector((state) => state.tickerChannel);

  const value = useMemo(() => {
    if (!event?.volume_24h) return "";
    return Number(event?.volume_24h).toLocaleString();
  }, [event?.volume_24h]);

  return <Text>24h Volume: {value}</Text>;
};

export default Volume24h;
