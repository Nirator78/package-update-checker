export interface IFileToCheck {
	path: string;
	type: string;
	ignorePackages?: string[];
}
  
export interface IAlert {
	type: string;
	source: string;
	url: string;
	from: string;
	to: string;
	title: string;
	onlyIfUpdateNeeded: boolean;
}
  
export interface IRepository {
	name: string;
	type: string;
	url: string;
	description: string;
	private: boolean;
	auth: string;
	fileToCheck: IFileToCheck[];
	alerts: IAlert[];
}