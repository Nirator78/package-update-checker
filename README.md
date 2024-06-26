# Package Update Checker (Npm, Composer, Yarn, Pip)
A little application to check if package need update or not and send alert if update needed

## 💪🏻 Installation (Manual)
1. Clone this repository
2. Run `npm install`
3. Copy `src/config/config.example.json` to `src/config/config.json` and fill the configuration
4. Run `npm start`

## 🐳 Installation (Docker)
1. Clone this repository
2. Copy `src/config/config.example.json` to `src/config/config.json` and fill the configuration
3. Run `docker build -t package-update-checker .`
4. Run `docker run package-update-checker`

## 🐳 Installation (Docker Compose)
1. Clone this repository
2. Copy `src/config/config.example.json` to `src/config/config.json` and fill the configuration
3. Run `docker-compose up -d`

## Configuration
```json
[
	{
		"name": "Test git public repository", // Name of the repository
		"type": "github", // Type of repository (github, gitlab, tortoisesvn, bitbucket)
		"url": "", // URL of the repository
		"description": "This is a test repository", // Description of the repository
		"private": false, // Is the repository private
		"auth": "", // Authentification for private repository
		"fileToCheck": [
			{
				"path": "package.json", // Path of the file to check
				"type": "npm", // Type of the file to check (npm, composer, yarn, pip)
				"ignorePackages": ["packageName"] // List of packages to ignore (Optional)
			}
		],
		"alerts": [
			{
				"type": "webhook", // Type of alert (webhook, email)
				"source": "slack", // Source of the alert (slack, discord, teams, custom, smtp)
				"url": "", // URL of the webhook
				"title": "Test git public repository", // Title of the alert
				"onlyIfUpdateNeeded": true // Send alert only if update needed
			}
		]
	}
]
```

## Compatibility

### Versionning System
- Github (Public / Private Repository)
- Gitlab (Public / Private Repository)
- Tortoise SVN (Public / Private Repository)
- Bitbucket (Public / Private Repository)

### Alert System
- Slack
- Discord
- Teams
- Custom Webhooks
- Email (SMTP)
- PDF (only with manual installation or docker compose - only for one file to check)
- JSON (only with manual installation or docker compose - only for one file to check)

## Todo List

- [See Github Project](https://github.com/users/Nirator78/projects/4/views/1)

## Motivation

- It's my first open source project
- I want to learn about open source and communauty tools
- I already use this tool in my project in another unclean version 😂

## License
[MIT](LICENSE)