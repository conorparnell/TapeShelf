import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

public class Shelf {
    private final int MAX_CAPACITY = 21;
    private int shelfNumber;
    private List<Tape> shelf = new ArrayList<>();

    public Shelf(int shelfNumber, Tape...tapes) {
        this.shelfNumber = shelfNumber;
        for (Tape tape : tapes) {
            if (shelf.size() > MAX_CAPACITY) {
                System.out.println("Shelf full, could not add " + tape);
                break;
            }
            shelf.add(tape);
        }
    }


    public void listTapes(){
        System.out.println("");
        System.out.println("Contents of shelf " + shelfNumber + ": ");
        int count = 1;
        for (Tape tape : shelf) {
            System.out.println("\t" + count + ". " + tape.toString());
            count++;
        }
    }

}
