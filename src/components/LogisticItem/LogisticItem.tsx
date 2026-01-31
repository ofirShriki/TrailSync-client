import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./LogisticItem.styles";

interface LogisticItemProps {
	label: string;
	value: string;
}

const LogisticItem: React.FC<LogisticItemProps> = ({ label, value }) => (
	<Box>
		<Typography>{label}</Typography>
		<Typography variant="body2" sx={styles.value}>
			{value}
		</Typography>
	</Box>
);

export default LogisticItem;
