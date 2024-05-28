import axios from "axios";
import { IAlert } from "@/interfaces/repository.interface";
import { IPackage } from "@/interfaces/package.interface";

export const sendAlertCustomService = async (alert: IAlert, update: IPackage[]): Promise<void> => {
    const body = {
        alert,
		update
    };
    
    if(update.length != 0){
        await axios.post(alert.url, body);
    }    
};