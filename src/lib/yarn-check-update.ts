import axios from "axios";
import * as semverLt from "semver/functions/lt";
import * as semverDiff from "semver/functions/diff";

import { IPackage } from "../interfaces/package.interface";
import { ReleaseType } from "../enums/release-type.enum";

export const yarnCheckUpdate = async (packageJsonContent): Promise<IPackage[]> => {
    const table: IPackage[] = [];

    const packageTypes = ["dependencies", "devDependencies"];

    for (const packageType of packageTypes) {
		const pkgs = packageJsonContent[packageType];
		if(!pkgs) continue;

		for (let [packageName, version] of Object.entries(pkgs)) {
			try {
				const response = await axios.get(`https://registry.yarnpkg.com/${packageName}`);

				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}

				const body = response.data;

				const lastestVersion = body["dist-tags"].latest;
				version = (version as string).replace(/[^0-9.]/g, "");
				if(semverLt(version, lastestVersion))
					table.push({
						package: packageName,
						version: lastestVersion,
						current: version as string,
						url: `https://classic.yarnpkg.com/en/package/${packageName}`,
						releaseType: semverDiff(version, lastestVersion)
					})
			} catch(e) {
				console.error(e);
				table.push({
					package: packageName,
					version: "Error",
					current: version as string,
					url: `https://www.npmjs.com/package/${packageName}`,
					releaseType: ReleaseType.ERROR
				})
			}
      	}
    }

    return table;
};