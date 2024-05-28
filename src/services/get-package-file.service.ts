import { RepositoryType } from "../enums/repository-type.enum";
import { IRepository, IFileToCheck } from "../interfaces/repository.interface";
import { getPackageFromGithubService } from "./get-package-file/get-package-from-github.service";
import { getPackageFromGitlabService } from "./get-package-file/get-package-from-gitlab.service";
import { getPackageFromTortoiseSvnService } from "./get-package-file/get-package-from-tortoisesvn.service";

export const getPackageFileService = async (repository: IRepository, fileToCheck: IFileToCheck): Promise<any> => {
	const { type } = repository;
	switch (type) {
		case RepositoryType.GITHUB:
			return getPackageFromGithubService(repository, fileToCheck);
		case RepositoryType.GITLAB:
			return getPackageFromGitlabService(repository, fileToCheck);
		case RepositoryType.TORTOISESVN:
			return getPackageFromTortoiseSvnService(repository, fileToCheck);
		default:
			throw new Error("Repository type not supported");
	}
};