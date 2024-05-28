import axios from "axios";
import semverLt from "semver/functions/lt";
import semverDiff from "semver/functions/diff";
import semberCoerce from "semver/functions/coerce";

import { IPackage } from "@/interfaces/package.interface";
import { ReleaseType } from "@/enums/release-type.enum";

export const composerCheckUpdate = async (composerJsonContent): Promise<IPackage[]> => {
    const table: IPackage[] = [];

    const packageTypes = ["require", "require-dev"];

    for (const packageType of packageTypes) {
		const pkgs = composerJsonContent[packageType];
		if(!pkgs) continue;

		for (let [packageName, version] of Object.entries(pkgs)) {
			if (packageName === "php") {
				continue;
			}

			if (packageName.startsWith("ext-")) {
				continue;
			}

			try {
				const response = await axios.get(`https://repo.packagist.org/p2/${packageName}.json`);

				if (response.status >= 400) {
				throw new Error("Bad response from server");
				}

				const body = response.data.packages[packageName][0];
				const lastestVersion = body.version;
				version = (version as string).replace(/[^0-9.]/g, "");
				version = semberCoerce(version).version;

				if(semverLt(version, lastestVersion))
				table.push({
					package: packageName,
					version: lastestVersion,
					current: version as string,
					url: `https://packagist.org/packages/${packageName}`,
					releaseType: semverDiff(version, lastestVersion)
				})
			} catch(e) {
				console.error(e);
				table.push({
					package: packageName,
					version: "Error",
					current: version as string,
					url: `https://packagist.org/packages/${packageName}`,
					releaseType: ReleaseType.ERROR
				})
			}
		}
    }

    return table;
};