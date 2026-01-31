import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import LogisticItem from "../../LogisticItem/LogisticItem";
import styles from "../PostModal.styles";

interface LogisticsSectionProps {
	region: string;
	numberOfDays: number;
	price: number;
}

const LogisticsSection: React.FC<LogisticsSectionProps> = ({
	region,
	numberOfDays,
	price,
}) => {
	const logisticsData = [
		{ label: "Region", value: region },
		{ label: "Duration", value: `${numberOfDays} days` },
		{ label: "Estimated Price", value: `$${price}` },
	];

	return (
		<Box>
			<Typography variant="h6" sx={styles.title}>
				Logistics
			</Typography>
			<Grid container spacing={4}>
				{logisticsData.map(item => (
					<LogisticItem
						key={item.label}
						label={item.label}
						value={item.value}
					/>
				))}
			</Grid>
		</Box>
	);
};

export default LogisticsSection;
