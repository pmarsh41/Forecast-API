;
(function(exports) {
///Bookmark, Line 74///
    "use strict";
//Constructor Code
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
            , '?callback=?' //required for JSON-P

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
                    self.fetch().then(

                    function(weData){
                        console.log(self)
                        console.log(self.get("theView"))
                        console.log(self.get("theView").el)
                    ///Next, we have to populate our html template with our weather data///
                    ///Then, our template must be appended to the page///

                    }

                    )


            })
        }

    });

    var ForecastView = Backbone.View.extend({

        el: ".container",

        loadTemplate: function(filename) {
            return $.get('./templates/'+filename+'.html').then(function(htmlData){
                return htmlData;
            })
        },

        initialize: function() {
            console.log(this);
            console.log(this.el)

            this.loadTemplate("templatecast").then(function(temphtml){
            console.log(temphtml);

        })


        }

    });

//Execution Code

    var fview = new ForecastView()

    var wmodel = new WeatherModel({
        'apiKey': '568f74ba4d47528af29a3a846957dc4a',
        'theView': fview
    })


})(typeof module === "object" ? module.exports : window);
