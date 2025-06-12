import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors.android";

const Title = ({ children }) => {
	return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 24,
		color: Colors.accent500,
		textAlign: "center",
		// borderWidth: Platform.OS === "ios" ? 0 : 2,
		// borderWidth: Platform.select({ ios: 0, android: 2 }),
		borderWidth: 2,
		borderColor: Colors.accent500,
		paddingVertical: 8,
		maxWidth: "80%",
		width: 300,
	},
});
