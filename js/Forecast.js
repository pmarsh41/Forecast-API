;(function(m){

    "use strict";

var WeatherModel = Backbone.Model.extend({
    url: function(){
        return [
        "https://api.forcecast.io/forcast/",
        this.get('access_token'),
        "/",
        this.get("lat")+','+ this.get("lng"),
        "?callback=?"
        ].join('')
    },
    defaults: {
        forcecast: "Its Going to Rain",
        lat: 5,
        lng: 5,
    },

    validate: function(attrs){
    if(attrs.lat === 0 || attrs.lng === 0){
        return "lat or lng not set."

    }


    },
    initialize: function(){
        this.on("change", function(model, options){
            console.log("see the change?")
        })
        this.on("change:forcecast", function(model, value, options){
            console.log("weather forcast changed")
        })
        this.on("invalid", function(model, errorMessage, options){
            alert("Something is awry!!")
        })

    }
})

exports.instance = new WeatherModel({access_token: "568f74ba4d47528af29a3a846957dc4a"})


})(typeof module === "object" ? module.exports : window);




