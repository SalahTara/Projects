public class Pet extends Animal 
{
	public String name;

		public static void main(String[] args) 
	{
		Pet pet1 = new Pet(false, "Carnivore", true, "Taro");
		Pet pet2 = new Pet(false, "Carnivore", false, "Sneed");
		System.out.println(pet1);
		System.out.println(pet2);
	}

	public Pet(boolean isVertebrate, String diet, boolean isWarmBlooded, String petName)
	{
		super(isVertebrate, diet, isWarmBlooded);
		this.name = petName;
	}
	
	public String toString()
	{
		return super.toString() + ". This pet's name is " + name + ".";
	}
}
