import axios from "axios";
import * as semver from "semver";

import { IPackage } from "../interfaces/package.interface"

export const composerCheckUpdate = async (composerJsonContent): Promise<IPackage[]> => {
    const table: IPackage[] = [];

    const packageTypes = ["require", "require-dev"];

    for (const packageType of packageTypes) {
      const pkgs = composerJsonContent[packageType];
      if(!pkgs) continue;

      for (const [package_, version] of Object.entries(pkgs)) {
          if (package_ === "php") {
            continue;
          }

          if (package_.startsWith("ext-")) {
            continue;
          }

          try {
            const response = await axios.get(`https://repo.packagist.org/p2/${package_}.json`);

            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }

			const body = response.data.packages[package_][0];
			const lastestVersion = body.version;
			
            if(semver.lt(version, lastestVersion))
              table.push({
                package: package_,
                version: lastestVersion,
                current: version as string,
                url: `https://packagist.org/packages/${package_}`
              })
          } catch(e) {
            console.log(
              `Skipped ${package_} because it encountered an error`,
            );
            console.log(e)
            table.push({
              package: package_,
              version: "Error",
              current: version as string,
              url: `https://packagist.org/packages/${package_}`
            })
          }
      }
    }

    return table;
};