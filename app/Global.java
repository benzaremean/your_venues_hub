/**
 * Created with IntelliJ IDEA.
 * User: IfieB
 * Date: 11/02/2013
 * Time: 22:12
 * To change this template use File | Settings | File Templates.
 */
import com.google.code.morphia.Morphia;
import com.mongodb.Mongo;
import controllers.MorphiaObject;
import models.Address;
import models.Contact;
import models.Rooms;
import models.Venues;
import play.GlobalSettings;
import play.Logger;

import java.net.UnknownHostException;

public class Global extends GlobalSettings {
    @Override
    public void onStart(play.Application arg0) {
        super.beforeStart(arg0);
        Logger.debug("*** onStart ***");
        try {
            MorphiaObject.mongo = new Mongo("127.0.0.1", 27017);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        MorphiaObject.morphia = new Morphia();
        MorphiaObject.morphia.map(Venues.class)
                .map(Contact.class)
                //.map(Rooms.class)
                .map(Address.class);
        MorphiaObject.datastore = MorphiaObject.morphia.createDatastore(MorphiaObject.mongo, "test7");
        MorphiaObject.datastore.ensureIndexes();
        MorphiaObject.datastore.ensureCaps();

        Logger.debug(String.format("** Morphia datastore: ", MorphiaObject.datastore.getDB()));
    }
}
