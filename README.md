# Package Update Checker (Npm, Composer)
A little application to check if package need update or not and send alert if update needed

## Installation (Manual)
1. Clone this repository
2. Run `npm install`
3. Copy `config.example.json` to `config.json` and fill the configuration
4. Run `npm start`

## Installation (Docker)
1. Clone this repository
2. Copy `config.example.json` to `config.json` and fill the configuration
3. Run `docker build -t package-update-checker .`
4. Run `docker run package-update-checker`

## Installation (Docker Compose)
1. Clone this repository
2. Copy `config.example.json` to `config.json` and fill the configuration
3. Run `docker-compose up -d`

## Configuration
In progress...

## Compatibility

### Versionning System
- Tortoise SVN (Public / Private Repository)
- Github (Public / Private Repository)

### Alert System
- Slack

## License
[MIT](LICENSE)