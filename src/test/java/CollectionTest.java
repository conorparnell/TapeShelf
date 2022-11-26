import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class CollectionTest {
    Collection testCollection;

    @Before
    public void Setup(){
        testCollection = new Collection("discogs-collection.csv");
    }

    @Test
    public void quotes_should_be_removed(){
        String test = "\"Test case, fix me\"";
        String expected = "Test case, fix me";
        String actual = testCollection.formatQuotes(test);

        Assert.assertEquals(expected, actual);
    }





}
