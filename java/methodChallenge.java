public class methodChallenge {
	public static void main(String[] args) {
		
		int highScorePosition = calculateHighscorePosition(1500);
		displayHighscorePosition("Tim", highScorePosition);

		highScorePosition = calculateHighscorePosition(1000);
		displayHighscorePosition("Tim", highScorePosition);

	    highScorePosition = calculateHighscorePosition(500);
		displayHighscorePosition("Tim", highScorePosition);

		highScorePosition = calculateHighscorePosition(100);
		displayHighscorePosition("Tim", highScorePosition);

		highScorePosition = calculateHighscorePosition(25);
		displayHighscorePosition("Tim", highScorePosition);
	}
	public static void displayHighscorePosition(String name, int position) {
		System.out.println(name + " managed to get into position " + position + " on the high score list!");
	}
	public static int calculateHighscorePosition(int score) {
		if (score >= 1000) {
			return 1;
		}
		else if (score >= 500 && score < 1000) {
			return 2;
		}
		else if (score >=	 100 && score < 500) {
			return 3;
		}
		else {
			return 4;
		}

	}	
}
