<template>
 <v-card class='fill-height'>
    <v-card-text>Inputs</v-card-text>

    <v-divider></v-divider> 
    <CsvUpload></CsvUpload>
<test></test>
    
 </v-card>
</template>

<script>
import CsvUpload from './CsvUpload'
export default {
    name: 'inputs',
    components: {
   CsvUpload,       

    },
    
};
</script>