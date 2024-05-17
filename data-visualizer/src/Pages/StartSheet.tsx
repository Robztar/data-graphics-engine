import { useState, useEffect } from 'react';

import { Nav } from "../components/Nav"
import { dataStore } from "../hooks/dataStore"

export const StartSheet=()=>{
     const {dataset, setData, setDataType, delDataset} = dataStore()

     // Query String
     const [queryId, setQueryId] = useState('')

     useEffect(()=>{
          if(window.location.search){
               let qSearch = window.location.search.substring(1)
               let qParts = qSearch.split('=')
               setQueryId(qParts[1])
          }
     },[queryId])

     let dataInst = dataset.find((d:any) => d.key === queryId)
     if(dataInst){
          let headers : any[] = []
          let body : any[] = []
          let upDataset : { [key:string]: any }[] = [{
               header : 'remove-this-header',
               values : [],
          }]
          
          if(dataInst.type === 'raw'){
               let rawData = (document.getElementById('create-dataset-data') as HTMLInputElement).value
               // pData : any[] = processyMagic(rawData)
               // pDataType : string = typingMagic(pData)
               // addDataset(name, pDataType, pData)
               // setNewProj(true)
               // setActive(false)
          }else if(dataInst.type === 'csv'){
               let csvData = dataInst.data[0]
               const DELIMITER = ','
               const NEWLINE = '\n'
               body = csvData.split(NEWLINE)
               headers = body.shift()?.trim().split(DELIMITER)
               headers.forEach((h)=>{
                    let ht = h.trim()
                    if(!ht) return
               })
               body.forEach((b)=>{
                    let bod = b.trim()
                    if(!bod) return
               })

               // Set data types based on the number of columns 
                    // and the types of values within the columns
               // Current types - 'items' & 'trend' will likely
                    // not be enough
               // pDataType : string = typingMagic(pData)

               // Also maybe change data updating from data sent directly,
                    // to the <textarea> value
               // Also implement column removal code
               
          }else if(dataInst.type === 'json'){
               let jsonData = (document.getElementById('create-dataset-data') as HTMLInputElement).value
               // pData : any[] = processyMagic(rawData)
               // pDataType : string = typingMagic(pData)
               // addDataset(name, pDataType, pData)
               // setNewProj(true)
               // setActive(false)
          }else if(dataInst.type === 'state'){
               // Collect data from state in its final form...
               //  (maybe scrap later)
          }
          
          return(
               <div id="start-sheet-page" className="h-full w-full flex flex-col items-center p-2 pt-20">
                         <Nav />
                         <h2 className='h-10 text-2xl bg-yellow-400'>Spread Sheet Editor</h2>
                         <div className='sheet-table-cont bg-purple-300 flex flex-col'>
                              
                              <table className='w-full h-full'>
                                   <caption>{dataInst.name}</caption>
                                   <thead>
                                        <tr>
                                             {headers.map((h , i) =>{
                                                  if(upDataset[0].header === 'remove-this-header')
                                                       upDataset[0].header = h
                                                  else
                                                       upDataset.push({
                                                            header : h,
                                                            values : [],
                                                            // vals : [] as string[]
                                                       })
                                                  return(
                                                       <th key={i} className={`head col-${i}`}>
                                                            <textarea 
                                                                 name="text"
                                                                 wrap="soft"
                                                                 className="h-8 w-48 border"
                                                                 defaultValue={h}
                                                            ></textarea>
                                                       </th>
                                                  )
                                             })}
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {body.map((bod , i) =>{
                                             if(bod === '') return
                                             let columns : any[] = []

                                             // regular experession to separate strings by commas,
                                             // while leaving strings within enclosing quotes intact
                                             const regex = /((?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*))/g
                                             // executing match against regex
                                             // also removing all quotes and starting commas
                                             columns = bod.match(regex)?.map((item:any) => item.replace(/"/g, '').replace(/^,/, '').trim());
                                             
                                             // console.log('Row '+(i+1))
                                             // console.log(columns)
                                             if(i === 20){
                                                  console.log('Dataset array at index 20: ')
                                                  console.log(upDataset)
                                             }
                                             return(
                                                  <tr key={i} className={`row-${i}`}>
                                                       {columns.map((col , inCol) =>{
                                                            upDataset[inCol].values.push(col)
                                                            return(
                                                                 <td key={inCol} className={`col-${inCol} bg-slate-600`}>
                                                                      <textarea 
                                                                           name="text"
                                                                           wrap="soft"
                                                                           className="h-12 w-48"
                                                                           defaultValue={col}
                                                                      ></textarea>
                                                                 </td>
                                                            )
                                                       })}
                                                  </tr>
                                             )
                                        })}
                                   </tbody>
                              </table>
                         </div>
                    </div>
          )
     }else{
          return(
               <div id="start-sheet-page" className="h-screen w-screen flex items-center p-2 pt-20">
                    <Nav />
                    <div className='w-full h-full bg-red-300 flex flex-col'>
                         <p>Sorry this data does not exist :(</p>
                    </div>
               </div>
          )
     }
}