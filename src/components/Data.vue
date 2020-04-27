<template>
<v-card>
    <v-card-text> Data </v-card-text>
     <p id='name'>Country Name: {{this.$store.getters.getName}}</p> 

</v-card>
</template>

<script>
export default {
    name:'Data',
    computed:{

    }
    
}
</script>
