import { AlertSource } from "../enums/alert-source.enum";
import { IPackage } from "../interfaces/package.interface";
import { IAlert } from "../interfaces/repository.interface";
import { sendAlertServiceToSlack } from "./send-alert/send-alert-slack.service";
import { sendAlertServiceToDiscord } from "./send-alert/send-alert-discord.service";

export const sendAlertService = async (alert: IAlert, update: IPackage[]): Promise<any> => {
	const { source } = alert;
	switch (source) {
		case AlertSource.SLACK:
			return sendAlertServiceToSlack(alert, update);
		case AlertSource.DISCORD:
			return sendAlertServiceToDiscord(alert, update);
		default:
			throw new Error('Alert source not found');
	}
};