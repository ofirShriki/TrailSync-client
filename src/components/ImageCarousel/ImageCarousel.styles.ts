const styles = {
	root: { position: "relative", marginBottom: 3 },

	image: {
		width: "100%",
		borderRadius: 2,
		height: 200,
		objectFit: "cover",
	},

	carouselButton: {
		position: "absolute",
		right: 8,
		top: "50%",
		transform: "translateY(-50%)",
		minWidth: 32,
	},

	indicatorContainer: {
		display: "flex",
		gap: 1,
		justifyContent: "center",
		marginTop: 1,
	},

	dot: (isCurrImage: boolean) => ({
		width: 8,
		height: 8,
		borderRadius: "50%",
		backgroundColor: isCurrImage ? "primary.main" : "gray",
		cursor: "pointer",
	}),
};

export default styles;
