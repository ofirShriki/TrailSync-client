const styles = {
	root: {
		width: 190,
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "palette.neutral.light",
		padding: 2,
		borderRight: "1px solid",
		borderColor: "divider",
		overflow: "none",
	},

	logo: {
		display: "flex",
		alignItems: "center",
		marginBottom: 1,
		gap: 1,
	},

	item: (isActive: boolean) => ({
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: 1,
		marginY: 0.5,
		borderRadius: 1,
		width: "100%",
		boxSizing: "border-box",
		padding: 1.5,
		textTransform: "none",
		backgroundColor: isActive ? "rgba(25, 118, 210, 0.1)" : "transparent",
		color: isActive ? "primary.main" : "text.secondary",

		"&:hover": {
			backgroundColor: "rgba(25, 118, 210, 0.15)",
		},
	}),

	avatar: { width: 30, height: 30 },
};

export default styles;
