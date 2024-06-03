import { AlertSource } from "@/enums/alert-source.enum";
import { IPackage } from "@/interfaces/package.interface";
import { IAlert } from "@/interfaces/repository.interface";
import { sendAlertSlackService } from "@/services/send-alert/send-alert-slack.service";
import { sendAlertDiscordService } from "@/services/send-alert/send-alert-discord.service";
import { sendAlertTeamsService } from "@/services/send-alert/send-alert-teams.service";
import { sendAlertCustomService } from "@/services/send-alert/send-alert-custom.service";
import { sendAlertEmailService } from "@/services/send-alert/send-alert-email.service";
import { sendAlertPdfService } from "./send-alert/send-alert-pdf.service";

export const sendAlertService = async (alert: IAlert, update: IPackage[]): Promise<void> => {
	const { source } = alert;

	try {
		switch (source) {
			case AlertSource.SLACK:
				return sendAlertSlackService(alert, update);
			case AlertSource.DISCORD:
				return sendAlertDiscordService(alert, update);
			case AlertSource.TEAMS:
				return sendAlertTeamsService(alert, update);
			case AlertSource.CUSTOM:
				return sendAlertCustomService(alert, update);
			case AlertSource.SMTP:
				return sendAlertEmailService(alert, update);
			case AlertSource.PDF:
				return sendAlertPdfService(alert, update);
			default:
				throw new Error("Alert source not found");
		}
	} catch (error) {
		console.error(error);
	}
};