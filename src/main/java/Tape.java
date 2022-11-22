import java.util.ArrayList;
import java.util.List;

public class Tape {
    private String artist;
    private String album;
    private int year;
    private List<String> genre = new ArrayList<>();

    public Tape(String artist, String album, int year, String...genres) {
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

    public int getYear() {
        return year;
    }

    public String getGenre() {
        String genreList = genre.toString();
        genreList = genreList.replace("[", "").replace("]", "");
        return genreList;
    }

    @Override
    public String toString(){
        //Artist - Album Name (Year) [Genre, Genre, Genre];
        return getArtist() + " - " + getAlbum() + " (" + getYear() + ") [" + getGenre() + "]";
    }
}



