import { RepositoryType } from "@/enums/repository-type.enum";
import { IRepository, IFileToCheck } from "@/interfaces/repository.interface";
import { getPackageFromGithubService } from "@/services/get-package-file/get-package-from-github.service";
import { getPackageFromGitlabService } from "@/services/get-package-file/get-package-from-gitlab.service";
import { getPackageFromTortoiseSvnService } from "@/services/get-package-file/get-package-from-tortoisesvn.service";
import { getPackageFromBitbucketService } from "@/services/get-package-file/get-package-from-bitbucket.service";

export const getPackageFileService = async (repository: IRepository, fileToCheck: IFileToCheck): Promise<any> => {
	const { type } = repository;
	switch (type) {
		case RepositoryType.GITHUB:
			return getPackageFromGithubService(repository, fileToCheck);
		case RepositoryType.GITLAB:
			return getPackageFromGitlabService(repository, fileToCheck);
		case RepositoryType.TORTOISESVN:
			return getPackageFromTortoiseSvnService(repository, fileToCheck);
		case RepositoryType.BITBUCKET:
			return getPackageFromBitbucketService(repository, fileToCheck);
		default:
			throw new Error("Repository type not supported");
	}
};