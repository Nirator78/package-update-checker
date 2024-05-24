import axios from "axios";
import * as semverLt from "semver/functions/lt";
import * as semverDiff from "semver/functions/diff";

import { IPackage } from "../interfaces/package.interface";
import { ReleaseType } from "../enums/release-type.enum";

export const npmCheckUpdate = async (packageJsonContent): Promise<IPackage[]> => {
    const table: IPackage[] = [];

    const packageTypes = ["dependencies", "devDependencies"];

    for (const packageType of packageTypes) {
      const pkgs = packageJsonContent[packageType];
      if(!pkgs) continue;

      for (const [packageName, version] of Object.entries(pkgs)) {
            try {
              const response = await axios.get(`https://registry.npmjs.org/${packageName}`);

              if (response.status >= 400) {
                throw new Error("Bad response from server");
              }

              const body = response.data;

              const lastestVersion = body["dist-tags"].latest;
              
              if(semverLt(version, lastestVersion))
                table.push({
                  package: packageName,
                  version: lastestVersion,
                  current: version as string,
                  url: `https://www.npmjs.com/package/${packageName}`,
				  releaseType: semverDiff(version, lastestVersion)
                })
            } catch(e) {
              console.log(
                `Skipped ${packageName} because it encountered an error`,
              );
              console.log(e)
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