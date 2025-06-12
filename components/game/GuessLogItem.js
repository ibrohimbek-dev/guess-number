import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Colors from "../../constants/colors";

const GuessLogItem = ({ roundNumber, guess, isSmallScreen }) => {
	const { width } = useWindowDimensions();

	// Additional responsive check if isSmallScreen isn't passed
	const smallScreen = isSmallScreen || width < 380;

	return (
		<View
			style={[
				styles.listItem,
				smallScreen && styles.smallListItem,
				{ width: smallScreen ? "95%" : "100%" },
			]}
		>
			<Text style={[styles.itemText, smallScreen && styles.smallItemText]}>
				#{roundNumber}
			</Text>
			<Text style={[styles.itemText, smallScreen && styles.smallItemText]}>
				Opponent's Guess: {guess}
			</Text>
		</View>
	);
};

export default GuessLogItem;

const styles = StyleSheet.create({
	listItem: {
		borderColor: Colors.primary800,
		borderWidth: 1,
		borderRadius: 40,
		padding: 12,
		marginVertical: 8,
		backgroundColor: Colors.accent500,
		flexDirection: "row",
		justifyContent: "space-between",
		elevation: 4,
		shadowColor: Colors.primary800,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
	smallListItem: {
		padding: 8,
		marginVertical: 4,
		borderRadius: 30,
	},
	itemText: {
		fontFamily: "open-sans",
		fontSize: 16,
		color: Colors.primary800,
	},
	smallItemText: {
		fontSize: 14,
	},
});
