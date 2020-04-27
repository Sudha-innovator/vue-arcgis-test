<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

    <v-img
      alt="Arup Logo"
      class="shrink mr-2"
      contain
      src="./assets/Arup.png"
      transition="scale-transition"
      width="65"
    />
    <v-toolbar-title>Vuetify Test </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn small class='orange' @click='showMap = !showMap'> Show Map </v-btn>
   </v-app-bar>
 
  <v-content class='fill-height'>
<v-container fluid class='fill-height ma-0'>
      <v-row no-gutters class='top-row'>
        <v-col  fluid>
<!--           <inputs class='fill-height' @click-add-layer-btn='updateAddLayer' /> -->
            <inputs class='fill-height' />
        </v-col>
        <transition name='fade'>
          <v-col  v-if='showMap'>
              <v-card transition="slide-x-transition" class='fill-height'>
                <webmap class='fill-height'> </webmap>
<!--                 <webmap class='fill-height' :addLayer='this.addLayerApp'> </webmap> -->
              </v-card>
          </v-col>

        </transition>
      </v-row>
      <v-row class='bottom-row'>
        <v-col cols='12'>
          <Data class='fill-height'/>
        </v-col>
      </v-row>
</v-container>
  </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import inputs from './components/Inputs';
import Data from './components/Data';
import webmap from './components/WebMap';

export default {
  name: 'App',

  components: {
  //  HelloWorld,
    inputs,
    Data,
    webmap,
  },

  data: () => ({
    //
    showMap: false,
/*     addLayerApp: false, */

  }),
  methods: {
    updateAddLayer(tag){
      this.addLayerApp = tag;
    }

  },
};
</script>
<style >
html,body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.top-row {
  height: 65%
}
.bottom-row {
  height: 35%
}

</style>
