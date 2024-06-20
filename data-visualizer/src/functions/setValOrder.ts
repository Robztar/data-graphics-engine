export const setValOrder = (values: any[], ) =>{
     let sortedVals:any = []
     console.log('values')
     console.log(values)

     values.forEach((row)=>{
          let rowLabel = row[0]
          if(typeof(rowLabel) === 'number' 
               || !(rowLabel instanceof Date 
                    && !isNaN(rowLabel.getTime()))){
               if(sortedVals.length > 0){
                    let lastsortedVal = sortedVals.length-1
                    let stopSort = false
                    sortedVals.forEach((v: any[], i: number)=>{
                         // Descending order
                         // if(v[0].valueOf() < rowLabel.valueOf() && !stopSort){
                         //      console.log('descend Sort')
                         //      sortedVals.splice(i, 0, row)
                         //      stopSort = true
                         // }
                         // if(i === lastsortedVal && !stopSort){
                         //      sortedVals.push(row)
                         //      stopSort = true
                         // }

                         // Ascending order
                         if(v[0].valueOf() > rowLabel.valueOf() && !stopSort){
                              sortedVals.splice(i, 0, row)
                              stopSort = true
                         }
                         if(i === lastsortedVal && !stopSort){
                              sortedVals.push(row)
                              stopSort = true
                         }
                    })
               }else{
                    console.log('empty')
                    sortedVals.push(row)
               }
          }else
               sortedVals = values
     })
     return sortedVals
}