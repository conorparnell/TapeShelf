public class Demo {
    public static void main(String[] args) {
        Tape prettyHateMachine = new Tape("Nine Inch Nails", "Pretty Hate Machine", 1989, "Synth Pop", "Industrial");
        Tape brokenEP = new Tape("Nine Inch Nails", "Broken", 1992, "Industrial", "Noise Rock");
        Tape theDownwardSpiral = new Tape("Nine Inch Nails", "The Downward Spiral", 1994, "Industrial");
        Tape theFragile = new Tape("Nine Inch Nails", "The Fragile", 1999, "Industrial", "Art Rock");
        Tape withTeeth = new Tape("Nine Inch Nails", "With Teeth", 2005, "Industrial");

        Shelf shelf1 = new Shelf(1, prettyHateMachine, brokenEP, theDownwardSpiral, theFragile, withTeeth);

        shelf1.listTapes();

        //format testing
        String str = "\"MCMXCI\",\"Skogen, Flickan Och Flaskan\",2012,Electronic,Opal Tapes";
        String[] res = str.split(",(?=([^\"]|\"[^\"]*\")*$)");
        for (int i = 0; i < res.length; i++) {
            System.out.println(res[i]);
        }
        String str2 = "Cap'n Jazz,Shmap'n Shmazz,1994,Emo";
        String[] res2 = str2.split(",(?=([^\"]|\"[^\"]*\")*$)");
        for (int i = 0; i < res2.length; i++) {
            System.out.println(res2[i]);
        }

    }
}
