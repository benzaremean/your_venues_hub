package controllers;


import models.Venues;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.addnewvenues.addvenueform;
import views.html.addnewvenues.summary;
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

    public static Result venues(int page) {
        List<Venues> allResults = Venues.all();
        int totalNoOfResults = Venues.all().size();
        int resultsPerPage = 10;
        int noOfPagesAvailable =  totalNoOfResults / resultsPerPage;
        int remainder =  totalNoOfResults % resultsPerPage;
        noOfPagesAvailable = remainder == 0 ? noOfPagesAvailable : noOfPagesAvailable + 1;

        int zeroIndexedPageNo = page - 1;
        int upTo = page * resultsPerPage > totalNoOfResults ? totalNoOfResults : page * resultsPerPage;
        int x = zeroIndexedPageNo * resultsPerPage;
        List<Venues> forView = new ArrayList<Venues>();


        for(int i = x; i < upTo; i++) {
            forView.add(allResults.get(i));
        }


        return ok(maindisplay.render(forView));
    }

    public static Result listVenues() {
        List<Venues> venues = Venues.all();
        return ok(toJson(venues));
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
}


