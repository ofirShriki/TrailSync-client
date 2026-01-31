const styles = {
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "100vh",
		width: "100vw",
		padding: 4,
	},

	title: {
		marginBottom: 4,
	},

	form: {
		width: "100%",
		maxWidth: 400,
		display: "flex",
		flexDirection: "column",
		gap: 2,
	},

	submitButton: {
		marginTop: 2,
	},

	avatarContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 2,
	},

	avatarButton: {
		padding: 0,
		borderRadius: "50%",
		minWidth: 0,
	},

	avatar: (hasError: boolean) => ({
		width: 120,
		height: 120,
		cursor: "pointer",
		border: "3px solid",
		borderColor: hasError ? "error.main" : "divider",

		"&:hover": {
			opacity: 0.8,
		},
	}),

	avatarIcon: {
		fontSize: 40,
		color: "text.secondary",
	},

	errorText: {
		marginTop: 1,
	},

	helperText: {
		marginTop: 1,
	},

	loginText: {
		marginTop: 3,
		display: "flex",
		alignItems: "center",
		fontSize: 16,
		justifyContent: "center",

		"& .MuiButtonBase-root": {
			fontSize: 16,
			paddingY: 0,

			"&:hover": {
				textDecoration: "underline",
				backgroundColor: "transparent",
			},
		},
	},
};

export default styles;
