import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors.android";

const NumberContainer = ({ children }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.numberText}>{children}</Text>
		</View>
	);
};

export default NumberContainer;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		borderWidth: 4,
		borderColor: Colors.accent500,
		padding: deviceWidth < 380 ? 12 : 16,
		margin: deviceWidth < 380 ? 12 : 14,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	numberText: {
		fontFamily: "open-sans-bold",
		color: "white",
		fontSize: deviceWidth < 380 ? 28 : 32,
	},
});
