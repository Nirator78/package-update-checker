import axios from "axios";
import { IFileToCheck, IRepository } from "@/interfaces/repository.interface";

export const getPackageFromGitlabService = async (repository: IRepository, fileToCheck: IFileToCheck): Promise<any> => {
	if(repository.private) {
		const url = new URL(repository.url);
		const domain = url.hostname;
		const repositoryName = repository.url.replace(`https://${domain}/`, "").split("/")[1];
		const projectListUrl = `https://${domain}/api/v4/projects?private_token=${repository.auth}&search=${repositoryName}&visibility=private`;
		const projectListResponse = await axios.get(projectListUrl);
		
		const projectId = projectListResponse.data[0].id;
		const rawGithubFile = `https://${domain}/api/v4/projects/${projectId}/repository/files/${fileToCheck.path}/raw?private_token=${repository.auth}`;
		const response = await axios.get(rawGithubFile);
        return response.data;
	} else {
		const url = `${repository.url}/-/raw/main/${fileToCheck.path}`;
		const response = await axios.get(url);
		return response.data;
	}
};