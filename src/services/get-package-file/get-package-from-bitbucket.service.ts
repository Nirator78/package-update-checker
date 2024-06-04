import axios from "axios";
import { IFileToCheck, IRepository } from "@/interfaces/repository.interface";

const config = {
	method: "get",
	url: "",
	headers: { 
	  "Authorization": ""
	},
};

export const getPackageFromBitbucketService = async (repository: IRepository, fileToCheck: IFileToCheck): Promise<any> => {
	if(repository.private) {
		const url = new URL(repository.url);
		const domain = url.hostname;
		const rawGithub = repository.url.replace(domain, "api." + domain) + "/src/main";
        config.url = `${rawGithub}/${fileToCheck.path}`;
        config.headers.Authorization = `Bearer ${repository.auth}`;
		const response = await axios.request(config);
        return response.data;
	} else {
		const url = `${repository.url}/raw/main/${fileToCheck.path}`;
		const response = await axios.get(url);
		return response.data;
	}
};