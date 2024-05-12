// Read config file
const config = require('../config.json');

// Validate config file
import { verifyConfigFileService } from './services/verify-config-file.service';
verifyConfigFileService(config);

// For each repository do the work 💪💪💪
for (const repository of config) {
  // Get the files to check
  // Check if the files are up to date
  // Send alerts if needed
}