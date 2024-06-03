import axios from "axios";
import { IAlert } from "@/interfaces/repository.interface";
import { IPackage } from "@/interfaces/package.interface";

export const sendAlertTeamsService = async (alert: IAlert, update: IPackage[]): Promise<void> => {
    const result: any = [];

    for(const up of update){
		const deprecatedMessage = up.deprecated ? "[DEPRECATED] " : "";
        const newSection = {
            "name": "",
            "value": `${deprecatedMessage}*${up.package}* is out of date (${up.releaseType}): - Current version : ${up.current} - Last version : ${up.version}`
        };
        result.push(newSection);
    }

    const title = `${alert.title} - (${update.length} packages out of date)`;
    const body = {
        "summary": title,
        "@type": "MessageCard",
        "sections": [
            {
                "title": title,
                "facts": result
            }
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