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
		let rawGithub = repository.url.replace("bitbucket.org", "api.bitbucket.org/2.0/repositories") + "/src/main";
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