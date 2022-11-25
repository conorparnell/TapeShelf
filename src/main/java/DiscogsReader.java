import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class DiscogsReader {
    public static void main(String[] args) {
        File discogsCollection = new File("discogs-collection.csv");
        try (Scanner scanner = new Scanner(discogsCollection)) {
            scanner.nextLine(); //clear first line for formatting
            int count = 0;
            while (scanner.hasNextLine()) {
                count++;
                String releaseInfo = scanner.nextLine();
                String[] release = releaseInfo.split(",(?=([^\"]|\"[^\"]*\")*$)");
                String year;
                if (release[6].equals("0")) {
                    year = "unknown";
                } else {
                    year = release[6];
                }
                System.out.println("FORMAT TEST: " + count + ": " + release[1] + " - " + release[2] + " (" + year + ")");
                }
            } catch (FileNotFoundException e) {
            System.out.println("put the csv back");
        }


    }
    //Catalog#,Artist,Title,Label,Format,Rating,Released,release_id,CollectionFolder,Date Added,Collection Media Condition,Collection Sleeve Condition,Collection Notes
    //x,      artist, title, x,     x,    x,     first 4 digits , ignore all else
    //0          1         2   3      4    5         6










}
