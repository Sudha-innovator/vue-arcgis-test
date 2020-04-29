<template>
 <v-card class='fill-height'>
    <v-card-text>Inputs</v-card-text>
    <v-divider></v-divider>
    <input type='file' id='csv_file' name = 'csv_file' label="Csv file input" outlined dense @change='loadCSV($event)'>
    
    <v-card>
            <table v-if="parse_csv">
            <thead>
            <tr>
              <th v-for="data in parse_header" :key="parse_header[data]">
                {{ data }}            
              </th>
            </tr>
          </thead>
          <tr v-for="csv in parse_csv" :key="parse_csv[csv]">
            <td v-for="value in parse_header" :key="parse_header[value]">
              {{csv[value]}}
            </td>
          </tr>
          
        </table>
    </v-card>
 </v-card>
</template>

<script>
export default {
    name: 'inputs',
    data() {    
        return{
           parse_csv: [],
           parse_header: [],
        

       }
    },

    methods: {
        clickAddLayerBtn(){
            //this.$emit('click-add-layer-btn', this.addLayerTag); //emit to the base component
            //this.$store.state.addLayer = true;
            this.$store.dispatch('setTag','true');

        },
        loadCSV(e){

            var vm = this;
            if(window.FileReader){
                var reader = new FileReader();

                reader.readAsText(e.target.files[0]);

                reader.onload = function(event){
                    var csv = event.target.result;

                    vm.parse_csv = vm.csvJSON(csv);

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

    }
    
}
</script>