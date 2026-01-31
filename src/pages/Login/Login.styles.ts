const styles = {
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh",
		width: "100vw",
	},

	logo: {
		width: 100,
		height: 100,
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

	signUpText: {
		marginTop: 3,
		display: "flex",
		alignItems: "center",
		fontSize: 16,

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
