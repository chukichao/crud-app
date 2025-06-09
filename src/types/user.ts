export interface IUser {
	id: number;
	username: string;
	password: string;
	age: number;
	isAgreeWithRules: boolean;
	country?: string;
	birthday?: string;
	gender?: string;
	skills?: ("html" | "css" | "js")[];
}
