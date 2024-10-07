public class casting {
	public static void main(String args[]) {
		short shortMinValue = Short.MIN_VALUE; int intMinValue = Integer.MIN_VALUE;
		System.out.println(shortMinValue + ", " + intMinValue);
		byte byteMinValue = Byte.MIN_VALUE, byteMaxValue = Byte.MAX_VALUE;
		System.out.println(byteMaxValue + ", " + byteMinValue);
		byte newByteValue = (byte) (byteMinValue / 2);
		System.out.println(newByteValue);
	}

}