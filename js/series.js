/**
 * get a url parameter
 *
 * @param {String} name URL argument name
 * @returns {String} URL argument value
 * @public
 */
$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
      return null;
  }
  else{
      return decodeURI(results[1]) || 0;
  }
}


$(function() {
  // -- Get the current date
  var now = moment().format("YYYY-MM-DD");
  var year = moment().format("YYYY");


  /**
   *  -- series races feed
   */
  var seriesURL = "https://www.hendersonvilleraceseries.com/api/" + year + "_race_series.json?start_date=" + now;

  /**
   *  -- race alerts --
   */
  var race_series = $("#race-series");
  var race_results = $("#race-results");

  $.getJSON(seriesURL, function(data) {

    var output = "";
    var output2 = "";
    for (var i in data.results) {
      output += "<li class='series-item' data-wow-delay='0.6s'>";
      output += "<div class='series-content'>";
      output += "<h5>" + data.results[i].title + "</h5>";
      output += "<p>";
      output += "<a href='" + data.results[i].url + "' target='hrs'>";
      output += "<img src='img/" + data.results[i].logo + "' width='150' alt='" + data.results[i].title + "' />";
      output += "</a>";
      output += "</p>";
      output += "<h6>" + moment(data.results[i].date).format("MMMM DD, YYYY") + " &#8226; " + data.results[i].time + "</h6>";
      output += "</div>";
      output += "</li>";

      /** 
       * -- display results
       */
      if (data.results[i].results) {
        output2 += "<li class='results-item' data-wow-delay='0.6s'>";
        output2 += "<div class='results-content'>";
        output2 += "<h6><a href='" + data.results[i].results + "' target='hrs'>Results</a></h6>";
        output2 += "</div>";
        output2 += "</li>";
      } else {
        output2 += "<li class='results-item' data-wow-delay='0.6s'>";
        output2 += "<div class='results-content-none'>";
        output2 += "<h6>&nbsp;</h6>";
        output2 += "</div>";
        output2 += "</li>";
      }
    }
    race_series.html(output);
    race_results.html(output2);
  });

  /**
   *  -- race alerts --
   */
  var race_alert = $("#race-alert");

  $.getJSON(seriesURL, function(data) {

    var output = "";
    var alert_level = "";
    for (var i in data.results) {
      var days_to_race = moment(data.results[i].date).diff(now, "days");
      if (days_to_race >= -2 && days_to_race <= 14) {
        if (days_to_race <= 14 && days_to_race >= 8) {
          alert_level="alert-warning";
          alert_image="athlink_register";
          alert_message="Registration Alert";
          alert_message2=days_to_race + " days till race";
          alert_link=data.results[i].register;
        } else if (days_to_race <= 7 && days_to_race >= 1) {
          alert_level="alert-danger";
          alert_image="athlink_register";
          alert_message="Registration Alert";
          alert_message2=days_to_race + " days till race";
          alert_link=data.results[i].register;
        } else if (days_to_race <= 0) {
          alert_level="alert-success";
          alert_image="athlink_results";
          alert_message="Did you Run?";
          alert_message2="";
          alert_link=data.results[i].results;
        }
        output += "<div class='alert-content " + alert_level + " text-center " + data.results[i].tags + "'>";
        // output += "<div class='alert alert-warning' role='alert'>";
        output += "<div class='col-md-4 alert-left'>";
        output += "<h5>" + alert_message + "</h5>";
        output += "<div>" + alert_message2 + "</div>";
        output += "</div>";
        output += "<div class='col-md-4'>";
        output += "<h4><a href='" + data.results[i].url + "' target='hrs'>" + data.results[i].title + "</a></h4>";
        output += "<div class=''>";
        output += "<i class='far fa-clock' aria-hidden='true'></i> " + moment(data.results[i].date).format("dddd MMMM DD, YYYY");
        output += " &#8226; " + data.results[i].time;
        output += "</div>";
        output += "<div class=''>";
        output += "<i class='fas fa-map-marker-alt' aria-hidden='true'></i> " + data.results[i].location;
        output += "</div>";
        output += "</div>";
        output += "<div class='col-md-4 text-center'>";
        output += "<a href='" + alert_link + "' target='hrs'>";
        output += "<img src='img/" + alert_image + ".png' height='35' alt='athlink'>";
        output += "</a>";
        output += "</div>";
        output += "</div>";
      }
    }
    race_alert.html(output);
  });
});