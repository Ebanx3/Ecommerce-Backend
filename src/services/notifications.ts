import Config from "../config";
import nodemailer from "nodemailer";

const gmailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: Config.GMAIL_EMAIL,
    pass: Config.GMAIL_PASSWORD,
  },
});

export const notifyByEmail = async (data: any, str: string) => {
  let subject = "";
  let html = "";
  if (str == "newOrder") {
    subject = "Nueva orden";
    html = `<h1>Nueva orden generada</h1>
    <h2>Id de orden: ${data._id}</h2>
    <h2>EL precio total de la orden es ${data.totalPrice}</h2>
    <h2>El estado de tu orden es ${data.state}</h2>
    <h3>Orden creada ${data.createdAt}</h3>`;
  } else {
    subject = "Orden Completa";
    html = `<h1>Orden completada</h1>
    <h2>Id de orden: ${data._id}</h2>
    <h2>EL precio total de la orden es ${data.totalPrice}</h2>
    <h3>Orden creada ${data.createdAt}</h3>
    <h2>Orden completada ${data.updatedAt}</h2>`;
  }
  const response = await gmailTransporter.sendMail({
    from: {
      name: Config.GMAIL_NAME || "",
      address: Config.GMAIL_EMAIL || "",
    },
    to: Config.GMAIL_EMAIL,
    subject,
    html,
  });
  return response;
};
