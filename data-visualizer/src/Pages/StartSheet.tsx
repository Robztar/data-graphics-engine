import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"

import { Nav } from "../components/Nav"
import { dataStore } from "../hooks/dataStore"



export const StartSheet=()=>{
     const {dataset, setData, setDataType, delDataset} = dataStore()
     const [curRow, setCurRow] = useState(-1)
     const [curCol, setCurCol] = useState(-1)
     const [undoLen, setUndoLen] = useState(0)
     // const [undoActive, setUndoActive] = useState(false)
     // const [undoArr, setUndo] = useState<{ row: number, col: number, arr: [] }[]>([
     //      // {row : -1, col: -1, arr: []}
     // ])
     // const [redoArr, setRedo] = useState<{ [key:string]: any }[]>([
     //      {row : -1, col: -1, arr: []}
     // ])

     

     const navigate = useNavigate()
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
     
     const [headers, setHeaders] = useState<any[]>([])
     const [body, setBody] = useState<any[]>([])
     const [fields, setFields] = useState<any[]>([])
     const [bodyCol, setBodyCol] = useState<any[]>([])
     
     // const [upDataset, setUpDSet] = useState<{ [key:string]: any }> ({
     //      header : [],
     //      values : [],
     // })
     const upDataset = useRef<{ [key:string]: any }> ({
          header : [],
          values : [],
     })
     // let upDataset : { [key:string]: any }[] = [{
     //      header : [],
     //      values : [],
     // }]
     let undoArr : { row: number, col: number, arr: any[] }[] =[]

     useEffect(()=>{
          if(dataInst){
               if(dataInst.type === 'raw'){
                    let rawData = (document.getElementById('create-dataset-data') as HTMLInputElement).value
                    console.log(rawData)
                    // pData : any[] = processyMagic(rawData)
                    // pDataType : string = typingMagic(pData)
                    // addDataset(name, pDataType, pData)
                    // setNewProj(true)
                    // setActive(false)
               }else if(dataInst.type === 'csv'){
                    let csvData = dataInst.data[0]
                    const DELIMITER = ','
                    const NEWLINE = '\n'
                    const csvBody = csvData.split(NEWLINE)
                    // headers = body.shift()?.trim().split(DELIMITER)
                    
                    setHeaders(csvBody.shift()?.trim().split(DELIMITER))
                    setBody(csvBody)
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
                    console.log(jsonData)
                    // pData : any[] = processyMagic(rawData)
                    // pDataType : string = typingMagic(pData)
                    // addDataset(name, pDataType, pData)
                    // setNewProj(true)
                    // setActive(false)
               }else if(dataInst.type === 'state'){
                    // console.log(dataInst)
                    let headersConv : any[] = []
                    dataInst.data.forEach((d:any) => {
                         headersConv.push(d.header)
                    })

                    let n:number = dataInst.data[0].header.length
                    let bodyConv : any[] = []
                    for(let a = 0; a<n; a++){
                         let x:number = dataInst.data.length
                         let bodArr = []
                         for(let b = 0; b<x; b++){
                              bodArr.push(dataInst.data[b].values[a])
                         }
                         bodyConv.push(bodArr)
                    }
                    setHeaders(headersConv)
                    setBody(bodyConv)
     
                    // - Table doesn't refresh on reload
                    // Idea! - Instead of sending info to dataStore
                         // - use setHeaders() and setBody() directly
                         // - avoid all the state dataInst.type
                         // - may still use this code to do that
                    // Also move undo variable (undoArr) to state
                         // and make it actually work
               }
          }
     },[dataInst])

     useEffect(()=>{
          let datasetTemp : any[] = []
          {body.map((bod) =>{
               if(bod === '') return
               let columns : any[] = []

               if(dataInst.type === 'csv'){
                    // regular experession to separate strings by commas,
                    // while leaving strings within enclosing quotes intact
                    const regex = /((?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*))/g
                    // executing match against regex
                    // also removing all quotes and starting commas
                    columns = bod.match(regex)?.map((item:any) => item.replace(/"/g, '').replace(/^,/, '').trim());
                    // setBodyCol(columns)
               }
               if(dataInst.type === 'state')
                    columns = bod

               datasetTemp.push(columns)
          })}
          // setUpDSet({
          //      header : headers,
          //      values : datasetTemp,
          // })
          if(bodyCol.length <= 0)
               setBodyCol(datasetTemp)

          upDataset.current = ({
               header : headers,
               values : bodyCol,
          })
          
          console.log('Data')
          console.log(upDataset)

          // Double Check everything is stable,
               // Then clean up!

          headers.forEach((h:any, i:number)=>{
               const insertCol = document.getElementsByClassName('head col-'+i)
               if(insertCol){
                    const insertVal = insertCol[0].querySelector('textarea') as HTMLTextAreaElement
                    insertVal.value = h
               }
          })
          bodyCol.forEach((b:any, i:number)=>{
               const insertRow = document.getElementsByClassName('row-'+i)
               
               if(insertRow){
                    const rowCells = insertRow[0].getElementsByClassName('body-cell')
                    for (let c = 0; c < rowCells.length; c++) {
                         const insertCell = insertRow[0].querySelector('.col-'+c)
                         const insertVal = insertCell?.querySelector('textarea') as HTMLTextAreaElement
                         if(insertVal)
                              insertVal.value = b[c]
                    }
               }
          })
     },[headers, bodyCol])

     if(dataInst){
          let unique = dataInst.key
          const handleRemoveColumn = (index: number) => {
               const updatedHeaders = headers.filter((_, i) => i !== index);
               const updatedValues = bodyCol.map((row:any) =>
                    row.filter((_:any, i:number) => i !== index)
               );
               setHeaders(updatedHeaders);
               setBodyCol(updatedValues);
               upDataset.current = ({
                    header: updatedHeaders,
                    values: updatedValues,
               });
               
               // console.log('temp')
               // console.log(updatedHeaders)
               // console.log(updatedValues)
               // console.log(upDataset.current)
          }
          const updateTempDataset = (upDataset : any) =>{
               const tempDS = upDataset
               console.log('temp')
               console.log(tempDS)
               setData(tempDS, unique)
               setDataType('state', unique)
          }
          
          return(
               <div id="start-sheet-page" className="h-full w-full flex flex-col items-center p-2 pt-20">
                         <Nav />
                         <div className='bg-slate-200 w-full py-0.5 px-8 flex items-center justify-between'>
                              {/* Mimic style of the navbar */}
                              <h2 className='h-10 text-2xl bg-yellow-400 flex items-center'>{dataInst.name}</h2>
                              <div className='flex items-center justify-around gap-8'>
                                   <div className={`sheet-nav-btn ${undoLen <= 0? 'inactive':''}`}
                                        onClick={()=>{
                                             let returnArr = undoArr.pop()
                                             // if(returnArr){
                                             //      let returnCol = returnArr.col
                                             //      let returnRow = returnArr.row
                                             //      let returnHeader = returnArr.arr[0]
                                             //      let returnBody = returnArr.arr.slice(1)
                                             //      if(returnCol >= 0 && returnRow < 0)
                                             //           upDataset.splice(returnCol, 0, {
                                             //                header : returnHeader,
                                             //                values : returnBody
                                             //           })
                                             //      if(returnRow >= 0 && returnCol < 0){
                                             //           // upDataset.splice(returnRow?, 0, {
                                             //           //      header : returnHeader,
                                             //           //      values : returnBody
                                             //           // })
                                             //      }
                                             //      updateTempDataset(upDataset)
                                             // }
                                        }}
                                   >
                                        <i className="fa-solid fa-arrow-rotate-left"></i>
                                        <button>Undo</button>
                                   </div>
                                   <div className='sheet-nav-btn'>
                                        <i className="fa-solid fa-arrow-rotate-right"></i>
                                        <button>Redo</button>
                                   </div>
                                   <div className='sheet-nav-btn delete'
                                        onClick={()=>{
                                             delDataset(unique)
                                             navigate('/')
                                        }}
                                   >
                                        <i className="fa-solid fa-trash"></i>
                                        <button>Delete</button>
                                   </div>
                                   
                                   <div className='sheet-nav-save bg-teal-400 rounded-xl cursor-pointer flex items-center gap-1 py-0.5 px-2'>
                                        <button>Save and Proceed</button>
                                        <i className="fa-solid fa-right-to-bracket"></i>
                                   </div>
                              </div>
                         </div>
                         
                         <div className='sheet-table-cont flex flex-col border border-black'>
                              <table className='w-full h-full'>

                                   {/* Header */}
                                   <thead>
                                        <tr>
                                             <th className='row-del-btn-head'><div></div></th>
                                             {headers.map((_ , i) =>{
                                                  return(
                                                       <th key={i} className={`head col-${i} bg-white`}
                                                            onMouseEnter={()=>setCurCol(i)}
                                                            onMouseLeave={()=>setCurCol(-1)}
                                                       >
                                                            <i className={`fa fa-minus-circle column-del-btn cursor-pointer
                                                                 ${curCol === i?'active' : ''}`}
                                                                 onClick={()=>{
                                                                      undoArr.push({row : -1, col: i, arr: []})
                                                                      if(undoArr[undoArr.length-1].arr){
                                                                           const undoCol = document.getElementsByClassName('col-'+i)
                                                                           for (let c = 0; c < undoCol.length; c++) {
                                                                                const undoCell = undoCol[c].querySelector('textarea') as HTMLTextAreaElement
                                                                                if(undoCell)
                                                                                     undoArr[undoArr.length-1].arr.push(undoCell.value)
                                                                           }
                                                                           handleRemoveColumn(i)
                                                                      }
                                                                      setUndoLen(undoArr.length)
                                                                      // updateTempDataset(upDataset)
                                                                 }}
                                                            ></i>
                                                            <textarea 
                                                                 name="text"
                                                                 wrap="soft"
                                                                 className="h-8 w-48 border"
                                                                 // defaultValue={h}
                                                                 // defaultValue={headers[i]}
                                                            ></textarea>
                                                       </th>
                                                  )
                                             })}
                                        </tr>
                                   </thead>

                                   {/* Table Body */}
                                   <tbody>
                                        {bodyCol.map((bod , i) =>{
                                             if(bod === '') return
                                             let columns : any[] = bod
                                             
                                             return(
                                                  <tr key={i} className={`row-${i}`}>
                                                       <td className='row-del-cont'
                                                            onMouseEnter={()=>{
                                                                 setCurRow(i)
                                                            }}
                                                            onMouseLeave={()=>{
                                                                 setCurRow(-1)
                                                            }}
                                                       >
                                                            <i className={`fa fa-minus-circle row-del-btn cursor-pointer 
                                                                 ${curRow === i?'active' : ''}`}></i>
                                                       </td>
                                                       {columns.map((_ , inCol) =>{
                                                            // upDataset[inCol].values.push(col)
                                                            // console.log('column')
                                                            // console.log(bodyCol[inCol])
                                                            return(
                                                                 <td key={inCol} className={`body-cell col-${inCol}`}
                                                                      onMouseEnter={()=>{
                                                                           setCurCol(inCol)
                                                                           setCurRow(i)
                                                                      }}
                                                                      onMouseLeave={()=>{
                                                                           setCurCol(-1)
                                                                           setCurRow(-1)
                                                                      }}
                                                                 >
                                                                      <textarea 
                                                                           name="text"
                                                                           wrap="soft"
                                                                           className="h-12 w-48"
                                                                           // defaultValue={col}
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