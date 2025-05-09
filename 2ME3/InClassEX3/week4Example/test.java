public class test {
	public static void main(String[] args) {
		// int b = 5;
		// do
		// 	while (--b > 1) {
		// 		System.out.println("b is: " + b);
		// 	}
		// while (false);
		// String program = "ms";
		
		// switch (program) {
		// 	case "undergrad":
		// 		System.out.println("U");
		// 		break;
		// 	case "ms", "phd":
		// 		System.out.println("G");
		// 		break;
		// 	case "test":
		// 		System.out.println("L");
		// 	default:
		// 		System.out.println("Highschool?");
		// }
		int numerator = 10;
		int denominator = 0;

		try {
			int result = numerator / denominator;
			System.out.println("Result: " + result);
		}
		catch (ArithmeticException e) {
			System.out.println("The result is undefined.");
		}

		System.out.println("Program Continues...");
	}
}
