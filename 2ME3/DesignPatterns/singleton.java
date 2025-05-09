public class singleton {
	private static Singleton instance;
	private String data;

	private Singlton(String data) {
		this.data = data;
	}

	public static Singleton getInstance(String data) {
		if (instance == null) {
			instance = new instance();
		}
		return instance;
	}
}
