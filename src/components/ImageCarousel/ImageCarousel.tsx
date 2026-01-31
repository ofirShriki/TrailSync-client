import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import styles from "./ImageCarousel.styles";

interface ImageCarouselProps {
	photos: string[];
	alt?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
	photos,
	alt = "carousel image",
}) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleNextImage = () => {
		setCurrentImageIndex(prev => (prev + 1) % photos.length);
	};

	const handlePrevImage = () => {
		setCurrentImageIndex(prev => (prev - 1 + photos.length) % photos.length);
	};

	return (
		<Box sx={styles.root}>
			<Box
				component="img"
				src={photos[currentImageIndex]}
				alt={alt}
				sx={styles.image}
			/>
			{photos.length > 1 && (
				<>
					<Button onClick={handlePrevImage} sx={styles.carouselButton}>
						‹
					</Button>
					<Button onClick={handleNextImage} sx={styles.carouselButton}>
						›
					</Button>
					<Box sx={styles.indicatorContainer}>
						{photos.map((_, index) => (
							<Box
								key={index}
								onClick={() => setCurrentImageIndex(index)}
								sx={styles.dot(index === currentImageIndex)}
							/>
						))}
					</Box>
				</>
			)}
		</Box>
	);
};

export default ImageCarousel;
