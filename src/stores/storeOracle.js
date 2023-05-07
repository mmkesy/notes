import { defineStore } from 'pinia'
import axios from 'axios'


export const useStoreOracle = defineStore('storeOracle', {
  state: () => {
    return { 
      data: [],
      query: ''
    }
  },
  actions: {

    init() {
     // something to intiate in storeOracle
    },
    clear() {
      this.data = []
      this.query ='' 
    },
    setQueryStmt(query) {
      this.query = query
    },

    executeQuery() {
      console.log('executing query...')
      //let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}`
      let apiUrl = `https://pmat.macforsoft.pl/api/sqlres`
      const params = {
                      query: this.query
      }
      
      axios.get(apiUrl,{params}).then( result => {
        
        let  resData = result.data,
             arrJSON = []
  
        try {
            arrJSON = typeof resData != 'object' ? JSON.parse(resData) : resData
  
            if (arrJSON.length==0) {      
            this.data = [{"Info":"brak danych"}]
            }
            else  this.data = resData
        }
        catch  {
          this.data = [{"Błąd":resData}]  
        }
        
      }).catch( err => {
        this.data = [{"Błąd":err}]
      })
    } //executeQuey
   
  },

  getters: {
    getFields: (state) => {
      let firstRow = state.data[0],
          fields = []
      for (const item in firstRow) { 
        fields.push(item)
      }    
      return fields
    } // getFields
  }
})