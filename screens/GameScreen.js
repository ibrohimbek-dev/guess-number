import React, { useEffect, useState } from "react";
import {
	Alert,
	FlatList,
	StyleSheet,
	View,
	useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
	const { width, height } = useWindowDimensions();
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);

	// Responsive calculations
	const isSmallScreen = width < 380 || height < 500;
	const isLandscape = width > height;
	const isVerySmallScreen = width < 350;
	const buttonSize = isVerySmallScreen ? 20 : isSmallScreen ? 24 : 28;
	const paddingValue = isVerySmallScreen ? 8 : isSmallScreen ? 12 : 24;
	const marginValue = isVerySmallScreen ? 8 : isSmallScreen ? 12 : 16;
	const marginTop = height > 380 ? 70 : 0;

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, userNumber, onGameOver]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	function nextGuessHandler(direction) {
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "greater" && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}

		if (direction === "lower") {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setCurrentGuess(newRndNumber);
		setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
	}

	const guessRoundsListLength = guessRounds.length;

	return (
		<View
			style={[
				styles.screen,
				{ padding: paddingValue, marginTop: marginTop },
				isLandscape && styles.landscapeScreen,
			]}
		>
			<Title style={isSmallScreen && { fontSize: 24 }}>Opponent's Guess</Title>

			<NumberContainer
				style={isSmallScreen && { marginVertical: marginValue / 2 }}
			>
				{currentGuess}
			</NumberContainer>

			<Card
				style={[
					styles.card,
					isLandscape && styles.landscapeCard,
					{ marginVertical: marginValue },
				]}
			>
				<InstructionText
					style={[styles.instructionText, { marginBottom: marginValue }]}
				>
					Higher or Lower?
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={nextGuessHandler.bind(this, "lower")}
							style={isSmallScreen && { padding: 8 }}
						>
							<Ionicons name="remove" size={buttonSize} color="white" />
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={nextGuessHandler.bind(this, "greater")}
							style={isSmallScreen && { padding: 8 }}
						>
							<Ionicons name="add" size={buttonSize} color="white" />
						</PrimaryButton>
					</View>
				</View>
			</Card>

			<View
				style={[
					styles.listContainer,
					{ padding: paddingValue / 2 },
					isLandscape && styles.landscapeList,
				]}
			>
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							roundNumber={guessRoundsListLength - itemData.index}
							guess={itemData.item}
							isSmallScreen={isSmallScreen}
						/>
					)}
					keyExtractor={(item) => item.toString()}
					contentContainerStyle={isLandscape && { paddingBottom: 20 }}
				/>
			</View>
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		marginTop: 100,
	},
	landscapeScreen: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "flex-start",
		paddingTop: 24,
	},
	card: {
		width: "90%",
		maxWidth: 400,
		minWidth: 300,
	},
	landscapeCard: {
		width: "45%",
		marginHorizontal: 8,
	},
	listContainer: {
		flex: 1,
		width: "90%",
	},
	landscapeList: {
		width: "45%",
		flex: 0,
		maxHeight: "60%",
	},
	instructionText: {
		textAlign: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonContainer: {
		flex: 1,
		maxWidth: 150,
		marginHorizontal: 8,
	},
});
