import fs from "fs";
import { IAlert } from "@/interfaces/repository.interface";
import { IPackage } from "@/interfaces/package.interface";

export const sendAlertJsonService = async (alert: IAlert, update: IPackage[]): Promise<void> => {
    const body = {
        alert,
		update
    };
    
    if(update.length != 0){
        fs.writeFileSync("update.json", JSON.stringify(body, null, 4));
    }
};