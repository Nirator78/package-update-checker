import axios from "axios";
import { IAlert } from "../../interfaces/repository.interface";
import { IPackage } from "../../interfaces/package.interface";

export const sendAlertServiceToDiscord = async (alert: IAlert, update: IPackage[]): Promise<any> => {
    let result: string = "";

    for(let up of update){
        const newSection = `**${up.package}** is out of date : - Current version : **${up.current}** - Last version : **${up.version}**\n`;
        result = result.concat(newSection);
    }

    const body = {
        "embeds": [
          {
            "title": `${alert.title} - (${update.length} packages out of date)`,
            "description": result
          }
        ]
    };
    
    if(update.length != 0){
        await axios.post(alert.url, body);
    }    
};