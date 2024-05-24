import axios from "axios";
import * as semver from "semver";

import { IPackage } from "../interfaces/package.interface"

export const composerCheckUpdate = async (composerJsonContent): Promise<IPackage[]> => {
    const table: IPackage[] = [];

    const packageTypes = ["require", "require-dev"];

    for (const packageType of packageTypes) {
      const pkgs = composerJsonContent[packageType];
      if(!pkgs) continue;

      for (const [packageName, version] of Object.entries(pkgs)) {
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

            if(semver.lt(version, lastestVersion))
              table.push({
                package: packageName,
                version: lastestVersion,
                current: version as string,
                url: `https://packagist.org/packages/${packageName}`
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
              url: `https://packagist.org/packages/${packageName}`
            })
          }
      }
    }

    return table;
};