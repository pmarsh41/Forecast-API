;
(function(exports) {
    ///Bookmark, Line 74///
    "use strict";
    //Constructor Code

    var WeatherRouter = Backbone.Router.extend({
        routes: {
            // "#route" : "router-method"
            "": "showWeather"
        },

        showWeather: function() {
            var fview = new ForecastView()

            var wmodel = new WeatherModel({
                'apiKey': '568f74ba4d47528af29a3a846957dc4a',
                'theView': fview

            })

        },

        initialize: function() {
            Backbone.history.start()
        }


    })
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
                'https://api.forecast.io/forecast/', , this.get('apiKey'), '/', , this.get('lat'), ',', this.get('lng'), '?callback=?' //required for JSON-P

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
                .then(function(geData) {
                    console.log(geData)
                        ///geData lat.long value is set to new weatherModel instance///
                    self.set('lat', geData.coords.latitude)
                    self.set({
                        lng: geData.coords.longitude
                    })

                    console.log(self.attributes)
                    console.log(self.url())
                        ///fetch takes a "url" string and retrieves the API data,
                        ///then weData object is returned and passed as a parameter///
                    $.when(
                        self.fetch(),
                        self.get("theView").loadTemplate("templatecast")).then(function(weData, myTemplate) {
                            console.log(weData)
                            console.log(myTemplate)
                            var myWeData = weData[0] //get data-obj from array
                            var compiledHtml = _.template(myTemplate);
                            var compiledData = compiledHtml(myWeData)
                            console.log(compiledData)
                            self.get("theView").el.innerHTML = compiledData
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
            return $.get('./templates/' + filename + '.html').then(function(htmlData) {
                return htmlData;
            })
        },

        initialize: function() {
            console.log(this);
            console.log(this.el)




        }

    });

    //Execution Code

    var myWeather = new WeatherRouter()



})(typeof module === "object" ? module.exports : window);
