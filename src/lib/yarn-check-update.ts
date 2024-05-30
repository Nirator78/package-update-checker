import axios from "axios";
import semverLt from "semver/functions/lt";
import semverDiff from "semver/functions/diff";
import semberCoerce from "semver/functions/coerce";

import { IPackage } from "@/interfaces/package.interface";
import { IFileToCheck } from "@/interfaces/repository.interface";
import { ReleaseType } from "@/enums/release-type.enum";

export const yarnCheckUpdate = async (fileToCheck: IFileToCheck, packageJsonContent: any): Promise<IPackage[]> => {
    const table: IPackage[] = [];

    const packageTypes = ["dependencies", "devDependencies"];

    for (const packageType of packageTypes) {
		const pkgs = packageJsonContent[packageType];
		if(!pkgs) continue;

		for (let [packageName, version] of Object.entries(pkgs)) {
			const ignorePackages = fileToCheck.ignorePackages || [];
			if(ignorePackages.includes(packageName)) {
				continue;
			}
			
			try {
				const response = await axios.get(`https://registry.yarnpkg.com/${packageName}`);

				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}

				const body = response.data;

				const lastestVersion = body["dist-tags"].latest;
				version = (version as string).replace(/[^0-9.]/g, "");
				version = semberCoerce(version).version;

				const deprecated = body.versions[lastestVersion].hasOwnProperty("deprecated");

				if(semverLt(version, lastestVersion))
					table.push({
						package: packageName,
						version: lastestVersion,
						current: version as string,
						url: `https://classic.yarnpkg.com/en/package/${packageName}`,
						releaseType: semverDiff(version, lastestVersion),
						deprecated
					})
			} catch(e) {
				console.error(e);
				table.push({
					package: packageName,
					version: "Error",
					current: version as string,
					url: `https://www.npmjs.com/package/${packageName}`,
					releaseType: ReleaseType.ERROR,
					deprecated: false
				})
			}
      	}
    }

    return table;
};