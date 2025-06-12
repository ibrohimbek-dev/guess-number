import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
	const { width, height } = useWindowDimensions();

	const isSmallScreen = width < 380 || height < 400;
	const isLandscape = width > height;
	const isVerySmallScreen = width < 350;

	// Dynamic image size calculation
	let imageSize = isSmallScreen ? 300 : 250;
	if (isLandscape) {
		imageSize = isSmallScreen ? 200 : 150;
	}
	if (isVerySmallScreen) {
		imageSize = 200;
	}

	// Dynamic font size calculation
	const fontSize = isVerySmallScreen ? 14 : isSmallScreen ? 16 : 20;
	const marginSize = isVerySmallScreen ? 8 : isSmallScreen ? 12 : 24;

	return (
		<View
			style={[
				styles.mainContainer,
				isLandscape && styles.landscapeContainer,
				isVerySmallScreen && styles.verySmallContainer,
			]}
		>
			<View
				style={[
					styles.imageContainer,
					{
						width: imageSize,
						height: imageSize,
						borderRadius: imageSize / 2,
						margin: marginSize,
					},
				]}
			>
				<Image
					style={styles.image}
					source={require("../assets/imgs/success.png")}
				/>
			</View>

			<View
				style={[styles.rootContainer, isLandscape && styles.landscapeContent]}
			>
				<Title style={isSmallScreen && { fontSize: 20 }}>!! GAME OVER !!</Title>
				<Text
					style={[
						styles.summaryText,
						{
							fontSize: fontSize,
							marginBottom: marginSize,
							marginHorizontal: isLandscape ? 12 : 0,
						},
					]}
				>
					Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
					rounds to guess the number{" "}
					<Text style={styles.highlight}>{userNumber}</Text>.
				</Text>
				<PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
			</View>
		</View>
	);
};

export default GameOverScreen;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 16,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	verySmallContainer: {
		padding: 8,
	},
	landscapeContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 24,
	},
	imageContainer: {
		borderWidth: 1,
		borderColor: Colors.primary800,
		overflow: "hidden",
		elevation: 40,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	rootContainer: {
		justifyContent: "center",
		alignItems: "center",
		maxWidth: 400, // Prevent content from stretching too wide on tablets
	},
	landscapeContent: {
		paddingLeft: 24,
	},
	summaryText: {
		fontFamily: "open-sans",
		textAlign: "center",
	},
	highlight: {
		fontFamily: "open-sans-bold",
		color: Colors.primary500,
	},
});
