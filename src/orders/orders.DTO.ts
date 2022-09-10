const ordersDTO = (order: any) => {
  return {
    id: order._id,
    userId: order.userId,
    items: order.items,
    state: order.state,
    totalPrice: order.totalPrice,
  };
};

export default ordersDTO;
