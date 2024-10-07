public class expressions {
	public static void main(String[] args) {
		double Kilometres = (100 * 1.609344);
		int high_score = 50;
		int health = -10;
		
		if (high_score > 25) {
			high_score += 1000; // Add bonus points
		}

		if (health <= 0) {
			System.out.println("You're dead");
		}
		System.out.println(Kilometres);
		System.out.println(high_score);
	}
}
