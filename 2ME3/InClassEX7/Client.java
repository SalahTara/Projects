public class Client {
    public static void main(String[] args) {
        Article article = new Article();

        Paragraph paragraph1 = new Paragraph("This is the first paragraph of the article.");
        Paragraph paragraph2 = new Paragraph("This is the second paragraph with more details.");

        Picture picture1 = new Picture("image1.jpg");

        article.addComponent(paragraph1);
        article.addComponent(paragraph2);
        article.addComponent(picture1);

        article.display();
    }
}