const styles = {
	header: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		marginBottom: 4,
	},

	form: {
		display: " flex",
		flexDirection: "column",
		gap: 3,
		overflowY: "auto",
	},

	formRow: {
		display: "flex",
		gap: 2,
	},

	addPhotosButton: {
		marginBottom: 2,
	},

	errorText: {
		display: "block",
		marginBottom: 1,
	},

	photoPreviewContainer: {
		display: "flex",
		gap: 1,
		flexWrap: "wrap",
	},

	photoCard: {
		position: "relative",
		width: 100,
		height: 100,
	},

	photoImage: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},

	photoRemoveButton: {
		position: "absolute",
		top: 4,
		right: 4,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		color: "white",

		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.8)",
		},
	},
};

export default styles;
