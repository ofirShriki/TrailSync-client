const styles = {
	root: {
		width: "100%",
		cursor: "pointer",
		borderRadius: 4,
		overflow: "hidden",
		transition: "transform 0.15s ease, box-shadow 0.15s ease",
		padding: 1,

		"&:hover": {
			transform: "translateY(-2px)",
			boxShadow: 4,
		},
	},

	cardContentContainer: {
		display: "flex",
		justifyContent: "space-between",
		minHeight: 160,
	},

	cardContent: { padding: 2, flexGrow: 1 },

	postTitle: {
		fontWeight: 600,
		marginBottom: 0.5,
		lineHeight: 1.3,
	},

	postDescription: {
		marginTop: 1,
		display: "-webkit-box",
		WebkitLineClamp: 3,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},

	media: {
		width: 160,
		padding: 1,
		borderRadius: 3,
		objectFit: "cover",
	},

	actions: {
		paddingX: 2,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},

	comments: { display: "flex", alignItems: "center", gap: 0.5 },

	metadata: {
		display: "flex",
		alignItems: "center",
		marginTop: 1,
	},

	metadataText: {
		marginRight: 2,
	},
};

export default styles;
