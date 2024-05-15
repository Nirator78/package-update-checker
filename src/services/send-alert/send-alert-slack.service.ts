import { IAlert, IRepository } from "../../interfaces/repository.interface";
import { IPackage } from "../../interfaces/package.interface";

export const sendAlertServiceToSlack = async (repository: IRepository, alert: IAlert, update: IPackage[]): Promise<any> => {
};