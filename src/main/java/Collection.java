import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class Collection {
    private List<Tape> collection = new ArrayList<>();

    public Collection() {
    }

    public List<Tape> getCollection() {
        return collection;
    }

    public void listCollection(){
        System.out.println("Contents of collection: ");
        int count = 1;
        for (Tape tape : collection) {
            System.out.println("\t" + count + ". " + tape.toString());
            count++;
        }
        System.out.println();
    }

    public void populate(String filePath) {
        File discogsCollection = new File(filePath);
        try (Scanner scanner = new Scanner(discogsCollection)) {
            scanner.nextLine(); //clear first line for formatting
            int count = 0;
            while (scanner.hasNextLine()) {
                count++;
                String releaseInfo = scanner.nextLine();
                String[] release = releaseInfo.split(",(?=([^\"]|\"[^\"]*\")*$)");
                //artist = [1], album title = [2], year released = [6];
                String year;
                if (release[6].equals("0")) {
                    year = "unknown";
                } else {
                    year = release[6];
                }
                System.out.println("Adding item: " + count + ": " + release[1] + " - " + release[2] + " (" + year + ") to your collection.");

                Tape tape = new Tape(release[1], release[2], year);
                collection.add(tape);
            }
        } catch (FileNotFoundException e) {
            System.out.println("put the csv back");
        }
        System.out.println();
        System.out.println("COLLECTION POPULATED");
        System.out.println();
    }

    public void order(List<Tape> tapes) {

        Collections.sort(tapes, new Comparator() {

            public int compare(Object o1, Object o2) {

                String x1 = ((Tape) o1).getArtist();
                String x2 = ((Tape) o2).getArtist();
                int sComp = x1.compareTo(x2);

                if (sComp != 0) {
                    return sComp;
                }
                Integer y1;
                Integer y2;

                if (((Tape) o1).getYear().equals("unknown")) {
                    y1 = 0;
                } else {
                    y1 = Integer.parseInt(((Tape) o1).getYear());
                }

                if (((Tape) o2).getYear().equals("unknown")){
                    y2 = 0;
                } else {
                    y2 = Integer.parseInt(((Tape) o2).getYear());
                }
                return y1.compareTo(y2);
            }});
    }

}
