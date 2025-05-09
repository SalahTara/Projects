public class Dog extends Pet {

	public String breed;
	public static void main(String args[]) 
	{
		Dog dog1 = new Dog(true, "Omnivore", true, "Taro", "Golden Retriever");

		System.out.println(dog1);
	}

	public Dog(boolean isVertebrate, String diet, boolean isWarmBlooded, String petName, String petBreed) 
	{
		super(isVertebrate, diet, isWarmBlooded, petName);
		this.breed = petBreed;
	}

	public String toString()
	{
		return super.toString() + " This pet is an " + breed + ".";
	}
}
