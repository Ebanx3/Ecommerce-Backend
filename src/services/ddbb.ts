import { connect } from "mongoose";
import { errorLogger } from "./logs";

export const ConnectToDDBB = async (url: string) => {
  try {
    // const connectionParams = {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
    // };
    await connect(url);
    return;
  } catch (err: any) {
    errorLogger(err);
  }
};
