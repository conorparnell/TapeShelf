import java.util.Collections;

public class Demo {
    public static void main(String[] args) {
//        Tape prettyHateMachine = new Tape("Nine Inch Nails", "Pretty Hate Machine", "1989", "Synth Pop", "Industrial");
//        Tape brokenEP = new Tape("Nine Inch Nails", "Broken", "1992", "Industrial", "Noise Rock");
//        Tape theDownwardSpiral = new Tape("Nine Inch Nails", "The Downward Spiral", "1994", "Industrial");
//        Tape theFragile = new Tape("Nine Inch Nails", "The Fragile", "1999", "Industrial", "Art Rock");
//
        //shelf still under construction
//        Shelf shelf1 = new Shelf(1, prettyHateMachine, brokenEP, theDownwardSpiral, theFragile, withTeeth);
//        shelf1.listTapes();
//

        Collection tapes = new Collection("discogs-collection.csv");

        //edit one tape at a time
        tapes.edit(211).addGenre("Punk", "Post-Punk");
        tapes.edit(141).setYear("1980");

        //edit many tapes at once

        tapes.bulkEdit("Industrial", 19, 29, 30, 31, 32, 35, 36, 56, 57,59,60,61, 62, 63, 68, 69, 70, 71, 80, 94, 95, 96, 97, 98, 99, 108, 115, 116, 117, 120, 125, 126, 127, 128, 129, 130, 131, 137, 145, 146, 147, 148,149, 151, 152, 159, 160, 161, 164, 165, 166, 167, 168, 169, 174, 191, 192, 193, 202, 203, 204, 208);
        tapes.bulkEdit("Black Metal", 5, 12, 14, 18, 21, 38, 47, 85, 86, 100, 102, 105, 106, 111, 112, 124, 158, 175, 214, 215, 216);
        tapes.bulkEdit("Electronic", 1, 19, 26, 29, 30, 31, 33, 34, 45, 59, 60, 61, 62, 63, 75, 76, 77, 101, 107, 108, 131, 151, 152, 154, 155, 190, 201, 206, 208);
        tapes.bulkEdit("Death Metal", 2, 3, 8, 9, 10, 13, 16, 22, 23, 25, 27, 39, 40, 41, 42, 43, 44, 48, 58, 64, 65, 66, 74, 90, 109, 118, 119, 133, 134, 135, 136, 142, 143, 144, 156, 163, 176, 177, 178, 194, 195, 196, 197, 198, 199, 200, 205, 207, 212, 213, 214);

        //adding a tape will place it alphabetically within collection
        Tape paleSwordsman = new Tape("Kekht Arakh", "Pale Swordsman", "2021", "Black Metal");
        tapes.addTape(paleSwordsman);

        tapes.listCollection();

        tapes.newShelf();
        tapes.newShelf();
        tapes.shelve(2, 213, 214, 215);
        tapes.listShelf(2);
        }
    }

