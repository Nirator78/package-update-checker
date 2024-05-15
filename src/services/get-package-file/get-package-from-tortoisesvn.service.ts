import axios from "axios";
import * as https from "https";
import { IFileToCheck, IRepository } from "../../interfaces/repository.interface";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

let config = {
  method: "get",
  maxBodyLength: Infinity,
  httpsAgent,
  url: "",
  headers: { 
    "Authorization": ""
  },
};

export const getPackageFromTortoiseSvnService = async (repository: IRepository, fileToCheck: IFileToCheck): Promise<any> => {
	if(repository.private) {
        config.url = `${repository.url}/${fileToCheck.path}`;
        config.headers.Authorization = `Basic ${repository.auth}`;
		const response = await axios.request(config);
        return response.data;
	} else {
        config.url = `${repository.url}/${fileToCheck.path}`;
		const response = await axios.request(config);
		return response.data;
	}
};