import java.util.ArrayList;
import java.util.List;

public class Tape implements Comparable<Tape>{
    private String artist;
    private String album;
    private String year; //year of specific tape's release, not necessarily the original release date of the album
    private List<String> genre = new ArrayList<>();

    public Tape(String artist, String album, String year) {
        this.artist = artist;
        this.album = album;
        this.year = year;
    }

    public Tape(String artist, String album, String year, String...genres) {
        this.artist = artist;
        this.album = album;
        this.year = year;
        for (String genre : genres) {
            this.genre.add(genre);
        }
    }

    public String getArtist() {
        return artist;
    }

    public String getAlbum() {
        return album;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getGenre() {
        String genreList = genre.toString();
        genreList = genreList.replace("[", "").replace("]", "");
        return genreList;
    }

    public void addGenre(String...genre) {
        for (int i = 0; i < genre.length; i++) {
            this.genre.add(genre[i]);
            System.out.println("Adding \'" + genre[i] + "\' as a genre to \"" + getAlbum() + "\" by " + getArtist());
        }
    }

    @Override
    public String toString(){
        //Artist - Album Name (Year) [Genre, Genre, Genre];
        if (this.genre.size() == 0) {
            return getArtist() + " - " + getAlbum() + " (" + getYear() + ")";
        }
        return getArtist() + " - " + getAlbum() + " (" + getYear() + ") [" + getGenre() + "]";
    }


    @Override
    public int compareTo(Tape o) {
        Character a = this.getArtist().charAt(0);
        Character b = o.getArtist().charAt(0);
        return a.compareTo(b);
        }
}




