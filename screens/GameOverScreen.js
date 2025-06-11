import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

const GameOverScreen = () => {
	return (
		<View style={styles.rootContainer}>
			<Title>!! GAME OVER !!</Title>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={require("../assets/imgs/success.png")}
				/>
			</View>

			<Text>Your phone needed X rounds to guess the number Y.</Text>
		</View>
	);
};

export default GameOverScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		alignItems: "center",
	},

	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 200,
		borderWidth: 2,
		borderColor: Colors.primary800,
		overflow: "hidden",
		margin: 36,
		elevation: 40,
	},

	image: {
		width: "100%",
		height: "100%",
	},
});
