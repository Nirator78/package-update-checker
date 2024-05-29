export interface IPackage {
	package: string,
	version: string,
	current: string,
	url: string,
	releaseType: string,
	deprecated: boolean
}