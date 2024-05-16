import axios from "axios";
import { IAlert } from "../../interfaces/repository.interface";
import { IPackage } from "../../interfaces/package.interface";

export const sendAlertServiceToDiscord = async (alert: IAlert, update: IPackage[]): Promise<any> => {
};