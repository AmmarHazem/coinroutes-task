import { FC } from "react";

const OrderBookItem: FC<OrderBookItemProps> = ({ price, size }) => {
  return (
    <tr key={price}>
      <td style={{ width: "200px" }}>{price}</td>
      <td>{size}</td>
    </tr>
  );
};

interface OrderBookItemProps {
  price: string;
  size: string;
}

export default OrderBookItem;
