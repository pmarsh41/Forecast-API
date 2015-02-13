;
(function(exports) {

    "use strict";

    Backbone.GeoModel = Backbone.Model.extend({
        geo: function() {




            navigator.geolocation.getCurrentPosition(success, error, WeatherModel.options)

        }

    })

    var WeatherModel = Backbone.Model.extend({
        url: function() {
            return [
                "https://api.forcecast.io/forcast/",
                this.get('access_token'),
                "/",
                this.get("lat") + ',' + this.get("lng"),
                "?callback=?"
            ].join('')
        },

        options: {
            enableHighAccuracy: true,
            timeout: 12000,
            maximumAge: 50000
        },

        success: function(pos) {
            var crds = pos.cords;
            console.log('Your current position is');
            console.log('Latitude :' + crds.lat);
            console.log('Longitude :' + crds.lng);
        },

        error: function(err) {
            console.log(err)

        },

        defaults: {
            forcecast: "Its Going to Rain",
            lat: 5,
            lng: 5,
        },

        validate: function(attrs) {
            if (attrs.lat === 0 || attrs.lng === 0) {
                return "lat or lng not set."

            }


        },
        initialize: function() {
            console.log("WeatherModel initialized")

            this.on("change", function(model, options) {
                console.log(model)
                console.log(options)
            })
            this.on("change:forcecast", function(model, value, options) {
                console.log("weather forcast changed")
            })
            this.on("invalid", function(model, errorMessage, options) {
                alert("Something is awry!!")
            })

        }
    })

    exports.instance = new WeatherModel({
        access_token: "568f74ba4d47528af29a3a846957dc4a"
    })

    exports.instance.set("lat", "lng")
    exports.instance.set("lat", "lng", "options")
    exports.instance.get("model", "errorMessage", "options")

})(typeof module === "object" ? module.exports : window);
