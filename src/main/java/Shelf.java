import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

public class Shelf {
    private int MAX_CAPACITY = 21;
    private int shelfNumber;
    private List<Tape> shelf = new ArrayList<>();
    private String nickname;

    public Shelf(int shelfNumber) {
        this.shelfNumber = shelfNumber;
        }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void shelve(Tape tape) {
        if (shelf.contains(tape)) {
            System.out.println(tape.getAlbum() + " is already in shelf " + shelfNumber + ".");
        } else if (shelf.size() > MAX_CAPACITY) {
            System.out.println("Shelf " + shelfNumber + " is full. Could not add " + tape.getAlbum() + ".");
        } else {
            shelf.add(tape);
            tape.shelved();
            System.out.println(tape.getAlbum() + " added to shelf " + shelfNumber + ".");
        }
    }

    public void unshelve(Tape tape) {
        if (!shelf.contains(tape)) {
            System.out.println(tape.getAlbum() + " is not in shelf " + shelfNumber + ".");
        } else {
            shelf.remove(tape);
            tape.unshelved();
            System.out.println(tape.getAlbum() + "removed from shelf " + shelfNumber +  ".");
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
