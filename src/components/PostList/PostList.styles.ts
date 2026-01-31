const styles = {
	root: {
		display: "flex",
		flexDirection: "column",
		gap: 2,
		padding: 3,
	},

	skeleton: {
		height: 200,
		borderRadius: 4,

		"&.MuiSkeleton-root": {
			transform: "none",
		},
	},
};

export default styles;
