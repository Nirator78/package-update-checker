import axios from "axios";
import { IFileToCheck, IRepository } from "../../interfaces/repository.interface";

export const getPackageFromGithubService = async (repository: IRepository, fileToCheck: IFileToCheck): Promise<any> => {
	if(repository.private) {
		let rawGithub = repository.url.replace("github.com", "raw.githubusercontent.com") + "/main";
		rawGithub = rawGithub.replace("https://", `https://${repository.auth}@`);
		const url = `${rawGithub}/${fileToCheck.path}`;
		const response = await axios.get(url);
		return response.data;
	} else {
		let rawGithub = repository.url.replace("github.com", "raw.githubusercontent.com") + "/main";
		const url = `${rawGithub}/${fileToCheck.path}`;
		const response = await axios.get(url);
		return response.data;
	}
};