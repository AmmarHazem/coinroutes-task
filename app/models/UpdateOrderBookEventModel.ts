export interface UpdateOrderBookEventModel {
  changes: [string, string, string][];
  product_id: string;
  type: "l2update";
}
