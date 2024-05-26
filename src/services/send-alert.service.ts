import { AlertSource } from "../enums/alert-source.enum";
import { IPackage } from "../interfaces/package.interface";
import { IAlert } from "../interfaces/repository.interface";
import { sendAlertServiceToSlack } from "./send-alert/send-alert-slack.service";
import { sendAlertServiceToDiscord } from "./send-alert/send-alert-discord.service";
import { sendAlertCustomService } from "./send-alert/send-alert-custom.service";

export const sendAlertService = async (alert: IAlert, update: IPackage[]): Promise<void> => {
	const { source } = alert;

	try {
		switch (source) {
			case AlertSource.SLACK:
				return sendAlertServiceToSlack(alert, update);
			case AlertSource.DISCORD:
				return sendAlertServiceToDiscord(alert, update);
			case AlertSource.CUSTOM:
				return sendAlertCustomService(alert, update);
			default:
				throw new Error('Alert source not found');
		}
	} catch (error) {
		console.error(error);
	}
};