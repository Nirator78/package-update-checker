// Read config file
const config = require('../config.json');
// Import utilities
import { verifyConfigFileService } from './services/verify-config-file.service';
import { getPackageFileService } from './services/get-package-file.service';
import { npmCheckUpdate } from './lib/npm-check-update';
import { composerCheckUpdate } from './lib/composer-check-update';
// Import Enums
import { PackageType } from './enums/package-type.enum';

// Validate config file
verifyConfigFileService(config);

(async () => {
    // For each repository do the work 💪💪💪
	for (const repository of config) {
		for (const fileToCheck of repository.fileToCheck) {
			// Get the files to check
			const packageContent = await getPackageFileService(repository, fileToCheck);
			// Check if the files are up to date
			let update;
			if (fileToCheck.type === PackageType.NPM) {
				update = await npmCheckUpdate(packageContent);
			} else {
				update = await composerCheckUpdate(packageContent);
			}
			// Send alerts if needed
		}
	}
})();