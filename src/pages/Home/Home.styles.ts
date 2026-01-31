const styles = {
	root: {
		position: "relative",
	},

	createButton: {
		display: "flex",
		gap: 1,
		position: "fixed",
		bottom: 32,
		right: 32,
		zIndex: 1000,
		transition: "width 0.3s ease, padding 0.3s ease",

		"&:hover": {
			paddingRight: 2,
			backgroundColor: "primary.main",
		},
	},
};

export default styles;
