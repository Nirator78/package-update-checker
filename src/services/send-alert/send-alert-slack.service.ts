import axios from "axios";
import { IAlert } from "@/interfaces/repository.interface";
import { IPackage } from "@/interfaces/package.interface";

export const sendAlertSlackService = async (alert: IAlert, update: IPackage[]): Promise<void> => {
    const result: any = [];

    for(const up of update){
		const deprecatedMessage = up.deprecated ? "[DEPRECATED] " : "";
        const newSection = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `${deprecatedMessage}*${up.package}* is out of date (${up.releaseType}): - Current version : ${up.current} - Last version : ${up.version}`
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
                    "Content-Type": "application/json; charset=utf-8"
                }
            }
        );
    }    
};