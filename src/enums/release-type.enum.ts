export enum ReleaseType {
	ERROR = "error",
	MAJOR = "major",
	PREMAJOR = "premajor",
	MINOR = "minor",
	PREMINOR = "preminor",
	PATCH = "patch",
	PREPATCH = "prepatch",
	PRERELEASE = "prerelease",
};

// Order for ReleaseType
export const ReleaseTypeOrder = {
	[ReleaseType.ERROR]: 0,
	[ReleaseType.MAJOR]: 1,
	[ReleaseType.PREMAJOR]: 2,
	[ReleaseType.MINOR]: 3,
	[ReleaseType.PREMINOR]: 4,
	[ReleaseType.PATCH]: 5,
	[ReleaseType.PREPATCH]: 6,
	[ReleaseType.PRERELEASE]: 7,
};