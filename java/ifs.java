public class ifs {
	public static void main(String[] args) {
		boolean gameOver = true;
		int score = 54000;
		int levelCompleted = 5;
		int bonus = 100;


		if (score < 5000 && score > 1000) {
			System.out.println("Your score was 1000-5000");
		}
		else if (score < 1000) {
			System.out.println("Your score was less than 1,000");
		}
		else {
			System.out.println("You suck or are very good");
		}
	}
}
