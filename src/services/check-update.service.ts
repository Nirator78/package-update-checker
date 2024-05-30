import { IFileToCheck } from "@/interfaces/repository.interface";
import { PackageType } from "@/enums/package-type.enum";
import { npmCheckUpdate } from "@/lib/npm-check-update";
import { yarnCheckUpdate } from "@/lib/yarn-check-update";
import { composerCheckUpdate } from "@/lib/composer-check-update";

export const checkUpdateService = async (fileToCheck: IFileToCheck, packageContent: any): Promise<any> => {
	switch (fileToCheck.type) {
		case PackageType.NPM:
			return await npmCheckUpdate(packageContent);
		case PackageType.YARN:
			return await yarnCheckUpdate(packageContent);
		case PackageType.COMPOSER:
			return await composerCheckUpdate(packageContent);
		default:
			throw new Error("Package type not found");
	}
};