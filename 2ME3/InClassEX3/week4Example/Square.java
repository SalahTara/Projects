package week4Example;

class Square extends Shape {
    private double side;
	
    public Square(double side) throws InvalidShapeException {
        super("Square");
		if (side <= 0) {
			throw new InvalidShapeException("Invalid shape parameters provided.");
		}
		this.side = side;	
        // try {
		// 	if (side <= 0) {
		// 		throw new InvalidShapeException("Invalid shape parameters provided.");
		// 	}
		// 	this.side = side;
		// }
		// catch(InvalidShapeException e) {
		// 	System.out.println(e.getMessage());
		// 	this.side = 1;
		// }
    }

    public double area() {
        return side * side;
    }
	public double getSide()	 {
		return this.side;
	}
	public static void main(String[] args) throws InvalidShapeException {
		Square square = new Square(-4);
		System.out.println(square.getSide());
	}
}
