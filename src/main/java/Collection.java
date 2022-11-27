import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class Collection {
    private List<Tape> collection = new ArrayList<>();

    public Collection(String filePath) {
        populate(filePath);
        order(collection);
        System.out.println("COLLECTION ALPHABETIZED...");
        System.out.println();
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
                String[] release = releaseInfo.split(",(?=([^\"]|\"[^\"]*\")*$)"); //ignore commas if between quotes
                //artist = [1], album title = [2], year released = [6];
                String artist = formatQuotes(release[1]);
                artist = formatArtist(artist);
                String album = formatQuotes(release[2]);
                String year = formatYear(release[6]);

                //System.out.println("Adding item: " + count + ": " + artist + " - " + album + " (" + year + ") to your collection.");

                Tape tape = new Tape(artist, album, year);
                collection.add(tape);
            }
        } catch (FileNotFoundException e) {
            System.out.println("put the csv back");
        }
        System.out.println("COLLECTION POPULATED...");
        System.out.println();
    }


    public Tape edit(int tapeNumber){
        return collection.get(tapeNumber - 1);
    }


    public String formatQuotes(String name) {
        String fixedName;
        if (name.charAt(0) == '"' && name.charAt(name.length()-1) == '"'){
            fixedName = name.substring(1, name.length() - 1);
        } else {
            fixedName = name;
        }
        return fixedName;
    }

    private String formatArtist(String name){
        String fixedName;
        int length = name.length();
        if (name.charAt(length -1) == ')') {
            if (name.charAt(length-3) == '(') {
                return name.substring(0, length -4);
            } else if (name.charAt(length - 4) == '(') {
                return name.substring(0, length -5);
            }
        }
       return name;
    }

    private String formatYear(String year){
        String newYear;
        if (year.equals("0")) {
            newYear = "unknown";
        } else {
            newYear = year;
        }
        return newYear;
    }

    public void order(List<Tape> tapes) { //alphabetical by artist, then chronological within each artist
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
