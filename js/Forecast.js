;
(function(exports) {

    "use strict";

    Backbone.GeoModel = Backbone.Model.extend({
        getGeo: function() {

            var jQPromise = $.Deferred()

            function gSuccess(position) {
                console.log("geolocation request successful");
                jQPromise.resolve(position)

            }

            navigator.geolocation.getCurrentPosition(gSuccess)

            return jQPromise

        }


    })

    var WeatherModel = Backbone.GeoModel.extend({

        defaults: {
            lat: 0,
            lng: 0,
            apiKey: ''
        },

        url: function() {
            return [
            'https://api.forecast.io/forecast/',
            , this.get('apiKey')
            , '/',
            , this.get('lat')
            , ','
            , this.get('lng')
            , '?callback=?'

            ].join('')
        },

        options: {

        },

        initialize: function() {
            var self = this
            console.log(self.attributes)

///getGeo "get's" coordinates///
            this.getGeo()
///after getGeo data is recieved, geData is passed as a parameter in a function///
               .then(function(geData){
                console.log(geData)
///geData lat.long value is set to new weatherModel instance///
                    self.set('lat' , geData.coords.latitude)
                    self.set({lng : geData.coords.longitude})

                    console.log(self.attributes)
                    console.log(self.url())
///fetch takes a "url" string and retrieves the API data,
///then weData object is returned and passed as a parameter///
                    self.fetch().then(function(weData){
                        console.log(self)

                        console.log(self.curren)

                    })


            })
        }

    })

    var wmodel = new WeatherModel({'apiKey': '568f74ba4d47528af29a3a846957dc4a'})


})(typeof module === "object" ? module.exports : window);
