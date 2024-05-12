import axios from "axios";

import { Package } from "../interfaces/package.interface"

export const npmCheckUpdate = async (packageJsonContent) => {
    const table: Package[] = [];

    const packageTypes = ["dependencies", "devDependencies"];

    for (const packageType of packageTypes) {
      const pkgs = packageJsonContent[packageType];
      if(!pkgs) continue;

      for (const [package_, version] of Object.entries(pkgs)) {
            try {
              const response = await axios.get(`https://registry.npmjs.org/${package_}`);

              if (response.status >= 400) {
                throw new Error("Bad response from server");
              }

              const body = response.data;

              const lastestVersion = body["dist-tags"].latest.replace(/[^0-9.]/g, '');
              
              if(lastestVersion !== version)
                table.push({
                  package: package_,
                  version: lastestVersion,
                  current: version as string,
                  url: `https://www.npmjs.com/package/${package_}`
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
                url: `https://www.npmjs.com/package/${package_}`
              })
            }
      	}
    }

    return table;
};