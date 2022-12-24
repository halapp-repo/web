class OrderItem {
  ProductId: string;
  Price: number;
  Count: number;
  Unit: string;
}

class Order {
  organizationId: string;
  createdBy: string;
  deliveryAddress: string;
  orderItems: OrderItem[];
}

export { Order, OrderItem };
