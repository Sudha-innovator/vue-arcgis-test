<template>
 <v-card class='fill-height'>
    <v-card-text>Inputs</v-card-text>

    <v-divider></v-divider> 
    <CsvUpload @csv-data='updateCsv'></CsvUpload>
      <v-layout>
<!--        <v-flex md2 v-for="(data) in result.length" :key="data">  -->
<!--        <v-flex v-for="index in result.length :key="index"> -->
         <v-flex>
          <div v-for="(csv,index) in result" :key="index"> {{ csv }}</div>
        </v-flex> 

    </v-layout>
    
 </v-card>
</template>

<script>
import CsvUpload from './CsvUpload'

export default {
    name: 'inputs',
    components: {
   CsvUpload,       

    },
    data(){
       return{
          result: [],
       }
    },
    methods:{
       updateCsv(csvData){
          this.result.push(csvData);

       }

    },
    
};
</script>