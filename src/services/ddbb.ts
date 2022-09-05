import { connect } from 'mongoose';
import { errorLogger } from './logs';

export const ConnectToDDBB = (url: string) => {
    try{
        connect(url);
        return;
    }
    catch(err: any){
        errorLogger(err);
    }
}