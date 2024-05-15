import { AlertSource } from "../enums/alert-source.enum";
import { IPackage } from "../interfaces/package.interface";
import { IAlert, IRepository } from "../interfaces/repository.interface";
import { sendAlertServiceToSlack } from "./send-alert/send-alert-slack.service";

export const sendAlertService = async (repository: IRepository, alert: IAlert, update: IPackage[]): Promise<any> => {
	const { type } = alert;
	switch (type) {
		case AlertSource.SLACK:
			return sendAlertServiceToSlack(repository, alert, update);
		default:
			throw new Error('Alert source not found');
	}
};