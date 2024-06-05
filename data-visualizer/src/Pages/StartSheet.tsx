import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"

import { Nav } from "../components/Nav"
import { dataStore } from "../hooks/dataStore"



export const StartSheet=()=>{
     const {dataset, setData, setDataType, delDataset} = dataStore()
     const [curRow, setCurRow] = useState(-1)
     const [curCol, setCurCol] = useState(-1)
     const [undoArr, setUndo] 
          = useState<{ row: number, col: number, arr: any[] }[]>([])
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
     const upDataset = useRef<{ [key:string]: any }> ({
          header : [],
          values : [],
     })

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
     
                    // - avoid all the state dataInst.type (maybe)
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
                    columns = bod.match(regex)?.map((item:any) => item.replace(/"/g, '').replace(/^,/, '').trim())
                    // setBodyCol(columns)
               }
               if(dataInst.type === 'state')
                    columns = bod

               datasetTemp.push(columns)
          })}
          if(fields.length <= 0)
               setFields(datasetTemp)

          headers.forEach((h:any, i:number)=>{
               const insertCol = document.getElementsByClassName('head col-'+i)
               if(insertCol){
                    const insertVal = insertCol[0].querySelector('textarea') as HTMLTextAreaElement
                    insertVal.value = h
               }
          })
          fields.forEach((b:any, i:number)=>{
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
     },[headers, fields])

     if(dataInst){
          let unique = dataInst.key
          const handleRemoveColumn = (index: number) => {
               const updatedHeaders = headers.filter((_, i) => i !== index)
               const updatedValues = fields.map((row:any) =>
                    row.filter((_:any, i:number) => i !== index)
               )
               setHeaders(updatedHeaders)
               setFields(updatedValues)
               
               let undoList = {row : -1, col: index, arr: [] as any[]}
               const undoCol = document.getElementsByClassName('col-'+index)
               for (let c = 0; c < undoCol.length; c++) {
                    const undoCell = undoCol[c].querySelector('textarea') as HTMLTextAreaElement
                    if(undoCell)
                         undoList.arr.push(undoCell.value)
               }
               setUndo([...undoArr, undoList])
          }
          const handleRemoveRow = (index: number) => {
               const updatedValues = fields.filter((_:any, i:number) => i !== index)
               setFields(updatedValues)

               let undoList = {row : index, col: -1, arr: [] as any[]}
               const undoRow = document.getElementsByClassName('row-'+index)
               const undoCells = undoRow[0].getElementsByClassName('body-cell')
               for (let c = 0; c < undoCells.length; c++) {
                    const cellVal = undoCells[c].querySelector('textarea') as HTMLTextAreaElement
                    if(cellVal)
                         undoList.arr.push(cellVal.value)
               }
               setUndo([...undoArr, undoList])
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
                              {/* Local Nav */}
                              <h2 className='h-10 text-2xl bg-yellow-400 flex items-center'>{dataInst.name}</h2>
                              <div className='flex items-center justify-around gap-8'>
                                   <div className={`sheet-nav-btn ${undoArr.length <= 0? 'inactive':''}`}
                                        onClick={()=>{
                                             if(undoArr.length > 0){
                                                  let undoList:any = []
                                                  undoArr.forEach((u:any)=>{
                                                       undoList.push(u)
                                                  })
                                                  let returnArr = undoList.pop()
                                                  if(returnArr){
                                                       let returnCol = returnArr.col
                                                       let returnRow = returnArr.row
                                                       
                                                       if(returnCol >= 0 && returnRow < 0){
                                                            let headerTemp:any = []
                                                            let fieldsTemp :any = []
                                                            headers.forEach((h)=>{
                                                                 headerTemp.push(h)
                                                            })
                                                            fields.forEach((f, i)=>{
                                                                 fieldsTemp.push([])
                                                                 f.forEach((c:any)=>{
                                                                      fieldsTemp[i].push(c)
                                                                 })
                                                            })
                                                            returnArr.arr.forEach((col:any, i:number) =>{
                                                                 if(i === 0)
                                                                      headerTemp.splice(returnCol, 0, col)
                                                                 else
                                                                      fieldsTemp[i-1].splice(returnCol, 0, col)
                                                            })
                                                            setHeaders(headerTemp)
                                                            setFields(fieldsTemp)
                                                       }
                                                       if(returnRow >= 0 && returnCol < 0){
                                                            let fieldsTemp :any = []
                                                            let colTemp :any = []
                                                            fields.forEach((f, i)=>{
                                                                 fieldsTemp.push([])
                                                                 f.forEach((c:any)=>{
                                                                      fieldsTemp[i].push(c)
                                                                 })
                                                            })
                                                            returnArr.arr.forEach((col:any) =>{
                                                                 colTemp.push(col)
                                                            })
                                                            fieldsTemp.splice(returnRow, 0, colTemp)
                                                            setFields(fieldsTemp)
                                                       }
                                                  }
                                                  setUndo(undoList)
                                             }
                                        }}
                                   >
                                        <i className="fa-solid fa-arrow-rotate-left"></i>
                                        <button>Undo</button>
                                   </div>
                                   <div className='sheet-nav-btn inactive'>
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
                                   
                                   <div className='sheet-nav-save bg-teal-400 rounded-xl cursor-pointer flex items-center gap-1 py-0.5 px-2'
                                        onClick={()=>{
                                             const upHeaders :any = []
                                             const upValues: any = []
                                             headers.forEach((_, i)=>{
                                                  const insertCol = document.getElementsByClassName('head col-'+i)
                                                  if(insertCol){
                                                       const insertVal = insertCol[0].querySelector('textarea') as HTMLTextAreaElement
                                                       upHeaders.push(insertVal.value)
                                                  }
                                             })
                                             fields.forEach((b:any, i:number)=>{
                                                  const insertRow = document.getElementsByClassName('row-'+i)
                                                  
                                                  if(insertRow){
                                                       const rowCells = insertRow[0].getElementsByClassName('body-cell')
                                                       upValues.push([])
                                                       for (let c = 0; c < rowCells.length; c++) {
                                                            const insertCell = insertRow[0].querySelector('.col-'+c)
                                                            const insertVal = insertCell?.querySelector('textarea') as HTMLTextAreaElement
                                                            if(insertVal)
                                                                 upValues[i].push(insertVal.value)
                                                       }
                                                  }
                                             })
                                             upDataset.current = ({
                                                  header : upHeaders,
                                                  values : upValues,
                                             })
                                             console.log('upDataset')
                                             console.log(upDataset.current)
                                             
                                             // updateTempDataset(upDataset)
                                             // navigate(`/proj?id=${unique}`)
                                        }}
                                   >
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
                                                                 onClick={()=>{ handleRemoveColumn(i) }}
                                                            ></i>
                                                            <textarea 
                                                                 name="text"
                                                                 wrap="soft"
                                                                 className="h-8 w-48 border"
                                                                 // if I edit a field then update state the updated field
                                                                      // goes back to original
                                                                 // Make header input on change
                                                                 // onChange={handleTextChange(h, i)}
                                                            ></textarea>
                                                       </th>
                                                  )
                                             })}
                                        </tr>
                                   </thead>

                                   {/* Table Body */}
                                   <tbody>
                                        {fields.map((bod , i) =>{
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
                                                                 ${curRow === i?'active' : ''}`}
                                                                 onClick={()=>{ handleRemoveRow(i) }}
                                                            ></i>
                                                       </td>
                                                       {columns.map((_ , inCol) =>{
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