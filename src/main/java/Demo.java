public class Demo {
    public static void main(String[] args) {
        Tape prettyHateMachine = new Tape("Nine Inch Nails", "Pretty Hate Machine", 1989, "Synth Pop", "Industrial");
        Tape brokenEP = new Tape("Nine Inch Nails", "Broken", 1992, "Industrial", "Noise Rock");
        Tape theDownwardSpiral = new Tape("Nine Inch Nails", "The Downward Spiral", 1994, "Industrial");
        Tape theFragile = new Tape("Nine Inch Nails", "The Fragile", 1999, "Industrial", "Art Rock");
        Tape withTeeth = new Tape("Nine Inch Nails", "With Teeth", 2005, "Industrial");

        Shelf shelf1 = new Shelf(1, prettyHateMachine, brokenEP, theDownwardSpiral, theFragile, withTeeth);

        shelf1.listTapes();

    }
}
