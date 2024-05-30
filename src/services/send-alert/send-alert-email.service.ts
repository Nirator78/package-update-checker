import nodemailer from "nodemailer";
import { IAlert } from "@/interfaces/repository.interface";
import { IPackage } from "@/interfaces/package.interface";

export const sendAlertEmailService = async (alert: IAlert, update: IPackage[]): Promise<void> => {
    const { url, to, from, title } = alert;

    let text: string = title + "\n\n";

    for(const up of update){
		const deprecatedMessage = up.deprecated ? "[DEPRECATED] " : "";
        const newSection = `${deprecatedMessage}${up.package} is out of date (${up.releaseType}): - Current version : ${up.current} - Last version : ${up.version}\n`;
        text = text.concat(newSection);
    }

    const mailOptions = {
        from,
        to,
        subject: title,
        text
    };

    const transporter = nodemailer.createTransport(url);
    
    if(update.length != 0){
        await transporter.sendMail(mailOptions);
    }    
};