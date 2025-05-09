public class Animal 
{	 public static void main(String[] args) 
	{
		Animal dog = new Animal(true, "Omnivore", true);
		Animal spider = new Animal(false, "Carnivore", false);

		System.out.println(dog);
		System.out.println(spider);
	}
	public boolean isVertebrate;
	public String diet;
	public boolean isWarmBlooded;

	public Animal(boolean inIsVertebrate, String inDiet, boolean inIsWarmBlooded)
	{
		this.isVertebrate = inIsVertebrate;
		this.diet = inDiet;
		this.isWarmBlooded = inIsWarmBlooded;
	}	

	public String toString()
	{
		String ifWarmblooded = isWarmBlooded ? "warm-blooded" : "cold-blooded";
		String ifVertebrate = isVertebrate ? "vertebrate" : "invertebrate";
		String animalProfile = "This " + ifWarmblooded + " animal is a " + diet + " and a " + ifVertebrate;
		return animalProfile;
	}
}
