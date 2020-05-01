<template>
    <div>
    <input type='file' id='csv_file' name = 'csv_file' accept='.csv'  @change='loadCSV($event)'>

<!--     <v-layout>
        <v-flex md2 v-for="data in parse_header" :key="data">
          <div>{{data}}</div>
          <div v-for="csv in parse_csv" :key="csv"> {{ csv[data] }}</div>
        </v-flex>

    </v-layout> -->
    </div>
</template>
<script>
export default {
    name: 'CsvUpload',
    data(){
           return{
           parse_csv: [],
           parse_header: [],
           }
    },
    methods:{
      loadCSV(e){

            var vm = this;
            if(window.FileReader){
                var reader = new FileReader();

                reader.readAsText(e.target.files[0]);

                reader.onload = function(event){
                    var csv = event.target.result;

                    vm.parse_csv = vm.csvJSON(csv);
                    vm.$emit('csv-data',vm.parse_csv);

                };
                reader.onerror = function(evt) {
                    if(evt.target.error.name == "NotReadableError") {
                    alert("Canno't read file !");
                    } 
                }
            } else {
                      alert('FileReader are not supported in this browser.');
             }

      },
    csvJSON(csv){
      var vm = this
      var lines = csv.split("\n")
      var result = []
      var headers = lines[0].split(",")
      vm.parse_header = lines[0].split(",") 

      lines.map(function(line, indexLine){
        if (indexLine < 1) return // Jump header line
        
        var obj = {}
        var currentline = line.split(",")
        
        headers.map(function(header, indexHeader){
          obj[header] = currentline[indexHeader]
        })
         
        result.push(obj)
      })
      
      result.pop() // remove the last item because undefined values

      return result // JavaScript object
    },
   },
    
}
</script>