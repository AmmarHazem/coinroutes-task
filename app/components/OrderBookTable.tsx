import { FC } from "react";
import OrderBookItem from "./OrderBookItem";

const OrderBookTable: FC<OrderBookTableProps> = ({ items }) => {
  return (
    <table>
      <thead>
        <tr>
          <th align="left" style={{ width: "200px" }}>
            Price
          </th>
          <th align="left">Size</th>
        </tr>
      </thead>
      <tbody>
        {items.map(([price, size]) => (
          <OrderBookItem key={price} price={price} size={size} />
        ))}
      </tbody>
    </table>
  );
};

interface OrderBookTableProps {
  items: [string, string][];
}

export default OrderBookTable;
