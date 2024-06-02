import { IFileToCheck } from "@/interfaces/repository.interface";
import { PackageType } from "@/enums/package-type.enum";
import { npmCheckUpdate } from "@/lib/npm-check-update";
import { yarnCheckUpdate } from "@/lib/yarn-check-update";
import { composerCheckUpdate } from "@/lib/composer-check-update";
import { pipCheckUpdate } from "@/lib/pip-check-update";

export const checkUpdateService = async (fileToCheck: IFileToCheck, packageContent: any): Promise<any> => {
	switch (fileToCheck.type) {
		case PackageType.NPM:
			return await npmCheckUpdate(fileToCheck, packageContent);
		case PackageType.YARN:
			return await yarnCheckUpdate(fileToCheck, packageContent);
		case PackageType.COMPOSER:
			return await composerCheckUpdate(fileToCheck, packageContent);
		case PackageType.PIP:
			return await pipCheckUpdate(fileToCheck, packageContent);
		default:
			throw new Error("Package type not found");
	}
};