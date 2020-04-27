<template>
  <div></div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'web-map',
  data: () => ({
      tagFromWebMap: false,  //need to adjust code for AddLayer button in the Inputs.vue

  }),
/*
  //if I use $emit, need to get the value from the parent component- App.vue   
  props: {   
      addLayer: {
          type: Boolean,
          required: true
      }

  }, 
    computed: {
    countryname() {
        return this.$store.getters.getName;
    }

    }, 
    watch:{
       
    countryname(val)
    {
        this.$store.dispatch('setName', val);
    }

    },*/

  mounted() {

      this.loadMap();

  }, 

  methods:{
      loadMap(){
          //this -> refers to the vue instance
          let that = this;
    // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], { css: true })
        .then(([ArcGISMap, MapView, FeatureLayer]) => {
            //this -- >refers to loadmodules
            
            const map = new ArcGISMap({
                basemap: 'topo-vector'
            });
            
            var firePointsLayer = new FeatureLayer({
                url: "https://services7.arcgis.com/WSiUmUhlFx4CtMBB/arcgis/rest/services/FIRMS_Active_Fire_Points_Australia_Fires/FeatureServer/0"
            });

             if(this.tagFromWebMap){   //needs to add more code for Add Layer button
                map.add(firePointsLayer);
            } 
           

            var worldCountries = new FeatureLayer({
                url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries_(Generalized)/FeatureServer/0",
                outFields: '*',
            }); 

            map.add(worldCountries);



            var view = new MapView({
                container: this.$el,
                map: map,
                center: [144, -24],
                zoom: 2,
                highlightOptions: {
                    color: 'orange',
                    fillOpacity: 0.5,
                }
            });


            var highlight, currName;
            view.whenLayerView(worldCountries).then(function () {
                view.on("pointer-move", eventHandler);
            });

            function eventHandler(event) {
                view.hitTest(event).then(getGraphics);
            }

            function getGraphics(response) {
                if (response.results.length) {
                    
                    var graphic = response.results.filter(function (result) {
                        return result.graphic.layer === worldCountries;
                    })[0].graphic;


                   var attributes = graphic.attributes;
                    var name = attributes.COUNTRY;

                    if (highlight && (currName !== name)) {
                        highlight.remove();
                        highlight = null;
                        return;
                    }
                    if (highlight) {
                        return;
                    }

                    view.whenLayerView(worldCountries).then(function (layerView) {
                        highlight = layerView.highlight(graphic);
                    });

                    currName = name;
                   that.$store.dispatch('setName', name);  //update the value to $store


                } else {
                    highlight.remove(); //remove the highlight if no features are returned from the hitTest
                    highlight = null;
                }

            }

            
        });

   },

  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }


};

</script>

<style scoped>
div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>