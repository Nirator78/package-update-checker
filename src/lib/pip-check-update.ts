import axios from "axios";
import semverLt from "semver/functions/lt";
import semverDiff from "semver/functions/diff";
import semberCoerce from "semver/functions/coerce";

import { IPackage } from "@/interfaces/package.interface";
import { IFileToCheck } from "@/interfaces/repository.interface";
import { ReleaseType } from "@/enums/release-type.enum";

export const pipCheckUpdate = async (fileToCheck: IFileToCheck, requirementsTxtContent: any): Promise<IPackage[]> => {
    const table: IPackage[] = [];
	
	// Parse requirements.txt file to get json object
	let requirementsJsonContent: any = {};
	const requirementsTxtLines = requirementsTxtContent.split("\n");
	for (const line of requirementsTxtLines) {
		if (line.trim() === "") {
			continue;
		}

		const [packageName, version] = line.split("==");

		if (!packageName || !version) {
			continue;
		}

		requirementsJsonContent[packageName] = version;
	}
	
	if(Object.keys(requirementsJsonContent).length === 0) {
		return table;
	}

	for (let [packageName, version] of Object.entries(requirementsJsonContent)) {
		const ignorePackages = fileToCheck.ignorePackages || [];
		if(ignorePackages.includes(packageName)) {
			continue;
		}

		try {
			const response = await axios.get(`https://pypi.org/pypi/${packageName}/json`);

			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}

			const body = response.data;

			const lastestVersion = body.info.version;
			version = (version as string).replace(/[^0-9.]/g, "");
			version = semberCoerce(version).version;

			const deprecated = body.info.yanked || false;

			if(semverLt(version, lastestVersion))
				table.push({
					package: packageName,
					version: lastestVersion,
					current: version as string,
					url: `https://pypi.org/project/${packageName}/`,
					releaseType: semverDiff(version, lastestVersion),
					deprecated
				})
		} catch(e) {
			console.error(e);
			table.push({
				package: packageName,
				version: "Error",
				current: version as string,
				url: `https://pypi.org/project/${packageName}/`,
				releaseType: ReleaseType.ERROR,
				deprecated: false
			})
		}
	}

    return table;
};