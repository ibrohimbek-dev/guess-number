import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Colors from "../../constants/colors";

const Card = ({ children, style }) => {
	const { width, height } = useWindowDimensions();

	// Responsive calculations
	const isSmallScreen = width < 380 || height < 500;
	const isLandscape = width > height;
	const isVerySmallScreen = width < 350;

	// Dynamic styles
	const cardStyles = [
		styles.card,
		{
			marginTop: isVerySmallScreen ? 12 : isSmallScreen ? 18 : 24,
			marginHorizontal: isVerySmallScreen ? 8 : isSmallScreen ? 12 : 24,
			padding: isVerySmallScreen ? 8 : isSmallScreen ? 12 : 16,
			width: isLandscape
				? isVerySmallScreen
					? "85%"
					: isSmallScreen
					? "75%"
					: "65%"
				: isVerySmallScreen
				? "90%"
				: isSmallScreen
				? "85%"
				: "80%",
			maxWidth: 500, // Prevent card from becoming too wide on tablets
		},
		style, // Allow custom styles to override
	];

	return <View style={cardStyles}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
	card: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary800,
		borderRadius: 8,
		elevation: 4,
		shadowColor: Colors.primary500,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
});
