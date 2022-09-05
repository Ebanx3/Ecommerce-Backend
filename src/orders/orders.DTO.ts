const ordersDTO = (order: any) => {
    return{
        ...order,
        id: order._id
    }
}

export default ordersDTO;