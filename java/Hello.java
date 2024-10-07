public class Hello {
	public static void main(String[] args) {
		System.out.println("Hello World");
		System.out.println("Hello, Tim");

		// boolean isAlien = false;
		// if (!isAlien) {
		// 	System.out.println("It's not an alien!");
		// }
		boolean isCar = false;
		if (!isCar) {
			System.out.println("This is not a car");
		}
		String makeOfCar = "Volkswagen";
		String isDomestic = makeOfCar == "Volkswagen" ? "domestic" : "not domestic";
		System.out.println("The car is " + isDomestic);
	}
}
