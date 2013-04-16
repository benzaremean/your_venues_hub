package controllers;


import models.Venues;
import models.VenuesSearchResults;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.addnewvenues.addvenueform;
import views.html.addnewvenues.summary;
import views.html.compare.comparison;
import views.html.displayvenues.maindisplay;

import java.util.ArrayList;
import java.util.List;

import static play.libs.Json.toJson;

public class Venue extends Controller {
    /**
     * Defines a form wrapping the Venues class.
     */
    static Form<Venues> venuesForm = Form.form(Venues.class);

    /**
     * Display a blank form.
     */
    public static Result blank() {
        return ok(addvenueform.render(venuesForm));
    }

    public static Result venues(int page) { //}, int resultsPerPage) {

        VenuesSearchResults results = Venues.venuesByPage(page, 10);
        return ok(maindisplay.render(results));
    }

    public static Result listVenues() {
        VenuesSearchResults venues = Venues.all();
        return ok(toJson(venues.venuesList));
    }

    public static Result details(String id) {
        Venues.getVenue(id);
        return ok(summary.render(Venues.getVenue(id)));
    }

    /**
     * Handle the form submission.
     */
    public static Result submit() {
        Form<Venues> filledForm = venuesForm.bindFromRequest();

        // Check accept conditions
        if(!"true".equals(filledForm.field("accept").value())) {
            filledForm.reject("accept", "You must accept the terms and conditions");
        }
        if(filledForm.hasErrors()) {
            flash("error", "Please correct the form below");
            return badRequest(addvenueform.render(filledForm));
        } else {
            Venues.create(filledForm.get());
            Venues created = filledForm.get();
            return ok(summary.render(created));
        }
    }

    public static Result edit(String id) {
        return TODO;
    }

    public static Result deleteVenue(String id) {
        Venues.delete(id);
        return TODO; //return redirect(routes.Application.venues());
    }

    public static Result compareVenues(String ids) {
        String[] splitIds = ids.split("-");
        List<Venues> venues = new ArrayList<Venues>();
        for(String id : splitIds) {
            venues.add(Venues.getVenue(id));
        }
        return ok(comparison.render(venues));
    }
}


