import { Socket } from "socket.io";
import { CartModel } from "../cart/cart.model";
import { OrdersModel } from "../orders/oders.model";
import { isValidProductId } from "../products/products.contrMongo";
import { ProductsModel } from "../products/products.model";
import { userId } from "../services/auth";

const messages = [
  {
    from: "fromSystem",
    message: `Hola soy el bot de este e-commerce`,
  },
  {
    from: "fromSystem",
    message: `Puedes enviar <stock> <productId> para saber stock de un producto`,
  },
  {
    from: "fromSystem",
    message: `Puedes enviar <cart> para saber sobre tu carrito`,
  },
  {
    from: "fromSystem",
    message: `Puedes enviar <order> para saber sobre tu orden`,
  },
];

export const onConnection = (socket: Socket) => {
  console.log("new user connected");

  socket.on("openChat", (data) => {
    socket.emit("response", messages);
  });

  socket.on("sendMessage", async (data) => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const date = `${day} / ${month} / ${year} -- ${hours}:${minutes}`;

    const msgFromUser = {
      from: "fromUser",
      message: data.message,
      date,
    };

    messages.push(msgFromUser);

    let respo = "";

    switch (data.message.substring(0, 5)) {
      case "stock": {
        const isValidId = await isValidProductId(data.message.substring(6, 30));
        if (isValidId) {
          const product: any = await ProductsModel.findById(
            data.message.substring(6, 30)
          );
          respo = `Nombre de producto: ${product.name}\nPrecio: ${product.price}\nStock: ${product.stock}`;
        } else {
          respo = "No existe un producto con ese id";
        }
        break;
      }
      case "cart": {
        const cart: any = await CartModel.find({ userId });

        if (cart[0].products.length == 0) {
          respo = "Tu carrito está vacío";
        } else {
          respo = `Tu carrito tiene :\n\n`;
          cart[0].products.forEach((prod: any) => {
            respo +=
              "-Producto con Id: " +
              prod.productId.toString() +
              "\n" +
              "-Cantidad: " +
              prod.amount.toString() +
              "\n\n";
          });
        }
        break;
      }
      case "order": {
        const order: any = await OrdersModel.find({ userId });
        console.log(order);
        if (order[0] == undefined) respo = "Aun no hiciste ninguna orden";
        else {
          respo = "Tus ordenes fueron :\n\n";
          order.forEach((o: any) => {
            respo +=
              "-Orden con Id: " +
              o._id.toString() +
              "\nDe valor: " +
              o.totalPrice +
              "\n" +
              "Estado :" +
              o.state +
              "\n\n";
          });
        }
        break;
      }
      default: {
        respo =
          "No se a que te refieres, conmigo puedes averiguar stock de algun producto, el estado de tu carrito o el estado de tu orden";
      }
    }

    const msgFromServer = {
      from: "fromSystem",
      message: respo,
      date,
    };
    messages.push(msgFromServer);
    socket.emit("response", messages);
  });
};
