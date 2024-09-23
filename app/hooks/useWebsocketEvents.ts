import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setTickerChannelEvent } from "../redux/tickerChannel";
import { TickerDataModel } from "../models/TickerDataModel";
import { OrderBookState, setOrderBookSnapshot, updateOrderBook } from "../redux/orderBookSlice";
import { UpdateOrderBookEventModel } from "../models/UpdateOrderBookEventModel";
import useAppSelector from "./useAppSelector";
import toast from "react-hot-toast";
import useIsClient from "./useIsClient";

export default function useWebsocketEvents() {
  const socketRef = useRef<WebSocket | null>(null);
  const selectedCurrencyPair = useAppSelector((state) => state.currencyPair.selectedCurrencyPair);
  const product_ids = useMemo(() => [selectedCurrencyPair], [selectedCurrencyPair]);
  const dispatch = useDispatch();

  const handleTickerData = useCallback(
    (data: TickerDataModel) => {
      data.spread = Number(data.best_ask) - Number(data.best_bid);
      dispatch(setTickerChannelEvent(data));
    },
    [dispatch]
  );

  const handleLevel2Data = useCallback(
    (data: OrderBookState | UpdateOrderBookEventModel) => {
      if (data.type === "snapshot") {
        dispatch(setOrderBookSnapshot(data as OrderBookState));
      } else if (data.type === "l2update") {
        dispatch(updateOrderBook(data as UpdateOrderBookEventModel));
      }
    },
    [dispatch]
  );

  const { isClient } = useIsClient();

  useEffect(() => {
    console.log("socketRef.current?.readyState", socketRef.current?.readyState);
    if (socketRef.current?.readyState === WebSocket.OPEN) return;
    if (!isClient) return;
    const socket = new WebSocket("wss://ws-feed-public.sandbox.exchange.coinbase.com");
    socketRef.current = socket;
    const channels = ["ticker", "level2_batch"];
    dispatch(setLoading(true));
    socket.onopen = () => {
      console.log("WebSocket connected");
      const subscribeMessage = {
        type: "subscribe",
        product_ids: product_ids,
        channels: channels,
      };
      socket.send(JSON.stringify(subscribeMessage));
    };
    let toastId: string;
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Received message", data);
      if (data.type === "l2update" || data.type === "snapshot") {
        handleLevel2Data(data);
      } else if (data.type === "ticker") {
        handleTickerData(data);
        toast.dismiss(toastId);
      } else if (data.type === "error") {
        toastId = toast.error(`${data.message}\n${data.reason}`);
      }
      dispatch(setLoading(false));
    };
    socket.onclose = (e) => {
      console.log("WebSocket disconnected", e);
      if (e.reason) {
        toast.error(e.reason);
      }
    };
    return () => {
      console.log("Unsubscribing from channels", channels);
      dispatch(setLoading(true));
      dispatch(setTickerChannelEvent(undefined));
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "unsubscribe", channels: channels }));
        socket.close();
      }
    };
  }, [dispatch, handleLevel2Data, handleTickerData, isClient, product_ids]);

  // return { tickerData, loading };
}
