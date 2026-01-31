import Login from "../pages/Login";
import Home from "../pages/Home";
import type { ComponentType } from "react";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

export interface RouteType {
	path: string;
	element: ComponentType<any>;
}

export const UNAUTHENTICATED_ROUTES: RouteType[] = [
	{
		path: "/",
		element: Login,
	},
	{
		path: "/register",
		element: Register,
	},
];

export const ROUTES: RouteType[] = [
	{
		path: "/home",
		element: Home,
	},
	{
		path: "/profile",
		element: Profile,
	},
];

export const PATHS = {
	HOME: "/home",
	PROFILE: "/profile",
	REGISTER: "/register",
};
