# Package Update Checker (Npm, Composer)
A little application to check if package need update or not and send alert if update needed

## 💪🏻 Installation (Manual)
1. Clone this repository
2. Run `npm install`
3. Copy `config.example.json` to `config.json` and fill the configuration
4. Run `npm start`

## 🐳 Installation (Docker)
1. Clone this repository
2. Copy `config.example.json` to `config.json` and fill the configuration
3. Run `docker build -t package-update-checker .`
4. Run `docker run package-update-checker`

## 🐳 Installation (Docker Compose)
1. Clone this repository
2. Copy `config.example.json` to `config.json` and fill the configuration
3. Run `docker-compose up -d`

## Configuration
```json
[
	{
		"name": "Test git public repository", // Name of the repository
		"type": "github", // Type of repository (github, tortoisesvn)
		"url": "", // URL of the repository
		"description": "This is a test repository", // Description of the repository
		"private": false, // Is the repository private
		"auth": "", // Authentification for private repository
		"fileToCheck": [
			{
				"path": "package.json", // Path of the file to check
				"type": "npm" // Type of the file to check (npm, composer)
			}
		],
		"alerts": [
			{
				"type": "webhook", // Type of alert (webhook)
				"source": "slack", // Source of the alert (slack, discord)
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
- Tortoise SVN (Public / Private Repository)
- Github (Public / Private Repository)

### Alert System
- Slack
- Discord
- Custom Webhooks

## Motivation

- It's my first open source project
- I want to learn about open source and communauty tools
- I already use this tool in my project in another unclean version 😂

## License
[MIT](LICENSE)