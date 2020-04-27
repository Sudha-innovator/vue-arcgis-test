<template>
 <v-card class='fill-height'>
    <v-card-text>Inputs</v-card-text>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
   <!--  <v-btn small @click='clickAddLayerBtn' >{{BtnTitle}}</v-btn> -->

 </v-card>
</template>

<script>
export default {
    name: 'inputs',
    data: () => ({    
           
           addLayerTag: true,
           BtnTitle: ' Add Layer ',

    }),

    methods: {
        clickAddLayerBtn(){
            //this.$emit('click-add-layer-btn', this.addLayerTag); //emit to the base component
            //this.$store.state.addLayer = true;
            this.$store.dispatch('setTag','true');

        }

    }
    
}
</script>