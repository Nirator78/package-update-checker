import axios from "axios";
import { IFileToCheck, IRepository } from "../../interfaces/repository.interface";

export const getPackageFromGitlabService = async (repository: IRepository, fileToCheck: IFileToCheck): Promise<any> => {
	if(repository.private) {
		throw new Error("Private Gitlab repositories are not supported yet");
	} else {
		const url = `${repository.url}/-/raw/main/${fileToCheck.path}`;
		const response = await axios.get(url);
		return response.data;
	}
};