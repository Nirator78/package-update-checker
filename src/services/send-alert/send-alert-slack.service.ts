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
                "text": `*${up.package}* n'est plus à jour : - Version actuelle : ${up.current} - Dernière version : ${up.version}`
            }
        };
        result.push(newSection);
    }
    
    if(result.length != 0){
        await axios.post(alert.url, 
            {
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": `${alert.title} - (${update.length} packages à mettre à jour)`,
                        }
                    },
                    ...result
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        );
    }    
};