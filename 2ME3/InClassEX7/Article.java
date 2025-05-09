import java.util.ArrayList;
import java.util.List;

public class Article implements ArticleComponent {
    private List<ArticleComponent> components = new ArrayList<>();

    public void addComponent(ArticleComponent component) {
        components.add(component);
    }

    public void removeComponent(ArticleComponent component) {
        components.remove(component);
    }

    @Override
    public void display() {
        for (ArticleComponent component : components) {
            component.display();
        }
    }
}