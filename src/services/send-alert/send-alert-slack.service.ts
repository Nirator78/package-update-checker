import axios from "axios";
import { IAlert } from "../../interfaces/repository.interface";
import { IPackage } from "../../interfaces/package.interface";

export const sendAlertServiceToSlack = async (alert: IAlert, update: IPackage[]): Promise<any> => {
    const result: any = [];

    for(let up of update){
        const newSection = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*${up.package}* is out of date : - Current version : ${up.current} - Last version : ${up.version}`
            }
        };
        result.push(newSection);
    }

    const body = {
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `${alert.title} - (${update.length} packages out of date)`,
                }
            },
            ...result
        ]
    };
    
    if(result.length != 0){
        await axios.post(alert.url, 
            body,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        );
    }    
};