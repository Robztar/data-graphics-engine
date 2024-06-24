import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"

import { Nav } from "../components/Nav"
import { dataStore, chartStore } from "../hooks/dataStore"

import boxwhiskerIcon from '../img/chart-icon/box-whisker-icon.png'
import barIcon from '../img/chart-icon/bar-chart-icon.png'
import columnIcon from '../img/chart-icon/column-chart-icon.png'
import lineIcon from '../img/chart-icon/line-graph-icon.png'
import radarIcon from '../img/chart-icon/radar-chart-icon.png'
import scatterIcon from '../img/chart-icon/scatter-plot-icon.png'
import vennIcon from '../img/chart-icon/venn-diagram-icon.png'
import pieIcon from '../img/chart-icon/pie-chart-icon.png'
import histoIcon from '../img/chart-icon/histogram-icon.png'
import pictoIcon from '../img/chart-icon/pictograph-icon.png'
import pyramidIcon from '../img/chart-icon/pyramid-chart-icon.png'

export const StartSheet=()=>{
     const {dataset, setData, delDataset} = dataStore()
     const {chartset, addChartset} = chartStore()
     const [curRow, setCurRow] = useState(-1)
     const [curCol, setCurCol] = useState(-1)
     const [undoArr, setUndo] 
          = useState<{ row: number, col: number, arr: any[] }[]>([])
     // const [redoArr, setRedo] = useState<{ [key:string]: any }[]>([
     //      {row : -1, col: -1, arr: []}
     // ])
     const [defaultType, setDefaultType] = useState<string[]>([])
     const [activeProcess, setActiveProcess] = useState(false)
     const [chartOpts, setChartOpts] = useState<string[]>([])

     const navigate = useNavigate()
     
     const [goToNewProj, setNewProj] = useState(false)
     if(goToNewProj){
          if(chartset !== null){
               const lastData = chartset.length-1
               const dataKey = chartset[lastData].key
               console.log('Zustand Last Data is: ' + dataKey) 
               
               navigate(`/proj?id=${dataKey}`)
          }
          setNewProj(false)
     }

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
               }else if(dataInst.type === 'json'){
                    let jsonData = (document.getElementById('create-dataset-data') as HTMLInputElement).value
                    console.log(jsonData)
                    // pData : any[] = processyMagic(rawData)
                    // pDataType : string = typingMagic(pData)
                    // addDataset(name, pDataType, pData)
                    // setNewProj(true)
                    // setActive(false)
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
          const handleHeaderChange = (newHead : any, index : number) =>{
               let headerTemp:any = []
               headers.forEach((h)=>{
                    headerTemp.push(h)
               })
               headerTemp[index] = newHead
               setHeaders(headerTemp)
          }
          const handleFieldChange = (newVal : any, inRow : number, inCol : number) =>{
               let fieldsTemp:any = []
               fields.forEach((f, i)=>{
                    fieldsTemp.push([])
                    f.forEach((c:any)=>{
                         fieldsTemp[i].push(c)
                    })
               })
               fieldsTemp[inRow][inCol] = newVal
               setFields(fieldsTemp)
          }
          
          const testDataType = (inRow: number, inCol: number, colDataType : string[], value: any) =>{
               let dType: string = ''

               if(value.trim() !== ''){
                    let numVal = parseFloat(value)
                    if(!isNaN(numVal) && value === numVal.toString()){
                         if(Number.isInteger(numVal)){
                              numVal = parseInt(value)
                              dType = 'integer'
                         }else
                              dType = 'decimal'
                    }else{
                         let dateVal = new Date(value)
                         // @ts-expect-error
                         if(!isNaN(dateVal))
                              dType = 'date'
                         else
                              dType = typeof(value)
                    }
               }else{
                    alert('Empty Field at: row- '+inRow+', column- '+inCol)
               }
               if(inRow === 0)
                    colDataType[inCol] = dType
               
               if(inRow > 0){
                    if(colDataType[inCol] !== dType){
                         if((colDataType[inCol] === 'decimal' && dType === 'integer')
                              || (colDataType[inCol] === 'integer' && dType === 'decimal')
                         ){colDataType[inCol] = 'decimal'}
                         else
                              colDataType[inCol] === 'string'
                    }
               }
               if(inRow === 4 && inCol === 11)
                    console.log(colDataType)
          }
          const setChartTypes = (upDataset : any) =>{
               const chartDS = upDataset
               console.log('chart dataset')
               console.log(chartDS)
               let chartCols = chartDS.header.length
               let chartVals = chartDS.values
               let upChartOpts : string[] = []

               if(chartCols === 1)
                    if(typeof(chartVals[0][0]) === 'number'){
                         upChartOpts.push('boxwhisker')  // Box & Whisker Chart
                         upChartOpts.push('bar')  // Bar Chart
                         upChartOpts.push('column')  // Column Chart
                         upChartOpts.push('line')  // Line Graph, Spline Graph, Area Chart
                         upChartOpts.push('radar')  // Radar Chart
                         upChartOpts.push('scatter')  // Scatter Plot, Bubble Chart
                         upChartOpts.push('venn')  // Venn Diagram
                    }
               if(chartCols > 1){
                    let valsNum = true
                    chartVals[0].forEach((v: any, i: number)=>{
                         if(i > 0)
                              if(typeof(v) !== 'number')
                                   valsNum = false
                    })

                    if(valsNum){
                         upChartOpts.push('bar')  // Bar Chart
                         upChartOpts.push('column')  // Column Chart
                         upChartOpts.push('line')  // Line Graph
                         upChartOpts.push('radar')  // Radar Chart
                         upChartOpts.push('scatter')  // Scatter Plot
                    }
                    if(chartCols < 5){   // (maybe temporary limitation)
                         upChartOpts.push('venn')  // Venn Diagram
                         if(valsNum){
                              if(chartCols === 2){
                                   upChartOpts.push('pie')  // Pie Chart
                                   upChartOpts.push('histogram')  // Histogram
                                   upChartOpts.push('pictograph')  // Pictograph, Dot Plot
                                   upChartOpts.push('pyramid')  // Pyramid Chart
                              }
                         }
                    }
               }

               console.log('upChartOpts')
               console.log(upChartOpts)
               setChartOpts(upChartOpts)
          }
          const setNewType = (colDataType ?: string[], newType ?: string, modCol ?: number) =>{
               let fieldsTemp: any[] = []
               if(colDataType !== undefined){
                    fields.forEach((f, i)=>{
                         fieldsTemp.push([])
                         f.forEach((val:any, iCol: number)=>{
                              if(colDataType[iCol] === 'string')
                                   fieldsTemp[i].push(val.toString())
                              else if(colDataType[iCol] === 'integer')
                                   fieldsTemp[i].push(parseInt(val))
                              else if(colDataType[iCol] === 'decimal')
                                   fieldsTemp[i].push(parseFloat(val))
                              else if(colDataType[iCol] === 'date')
                                   fieldsTemp[i].push(new Date(val))
                              else
                                   fieldsTemp[i].push(val)
                         })
                    })
               }else if(newType !== undefined && modCol !== undefined)
                    upDataset.current.values.forEach((f:any, i: number)=>{
                         fieldsTemp.push([])
                         f.forEach((val:any, iCol: number)=>{
                              if(modCol === iCol){
                                   if(newType === 'string')
                                        fieldsTemp[i].push(val.toString())
                                   else if(newType === 'integer')
                                        fieldsTemp[i].push(parseInt(val))
                                   else if(newType === 'decimal')
                                        fieldsTemp[i].push(parseFloat(val))
                                   else if(newType === 'date')
                                        fieldsTemp[i].push(new Date(val))
                              }else
                                   fieldsTemp[i].push(val)
                         })
                    })
               
               upDataset.current = ({
                    header : headers,
                    values : fieldsTemp,
               })
               console.log('upDataset')
               console.log(upDataset.current)

               setChartTypes(upDataset.current)
          }

          const processData = () =>{
               const colDataType: any[] = []
               fields.forEach((r, iRow)=>{
                    r.forEach((val: any, iCol: number)=>{
                         if(iRow === 0)
                              colDataType.push('')
                         testDataType(iRow, iCol, colDataType, val)
                    })
               })
               
               upDataset.current = ({
                    header : headers,
                    values : fields,
               })
               setNewType(colDataType)
               setDefaultType(colDataType)
               setActiveProcess(true)
          }
          const transferDataset = (name:string, type : string) =>{
               console.log('set state')
               console.log(type)
               console.log(upDataset.current)
               addChartset(name, type, upDataset.current)
               setNewProj(true)
          }
          
          return(
               <div id="start-sheet-page" className="h-full w-full flex flex-col items-center p-2 pt-20">
                         <Nav />
                         {/* Local Nav */}
                         <div className='bg-slate-200 w-full py-0.5 px-8 flex items-center justify-between'>
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
                                             processData()
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
                                        <tr className='flex items-center justify-start'>
                                             <th className='row-del-btn-head w-6 h-12'><div></div></th>
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
                                                                 onChange={()=>{
                                                                      const headerCont = document.getElementsByClassName('head col-'+i)
                                                                      const headVal = (headerCont[0].querySelector('textarea') as HTMLTextAreaElement)
                                                                           ?.value
                                                                      handleHeaderChange(headVal, i)
                                                                 }}
                                                            ></textarea>
                                                       </th>
                                                  )
                                             })}
                                        </tr>
                                   </thead>

                                   {/* Table Body */}
                                   <tbody className='flex flex-col items-start'>
                                        {fields.map((bod , i) =>{
                                             if(bod === '') return
                                             let columns : any[] = bod
                                             
                                             return(
                                                  <tr key={i} className={`row-${i} flex justify-start`}>
                                                       <td className='row-del-cont'
                                                            onMouseEnter={()=>{
                                                                 setCurRow(i)
                                                            }}
                                                            onMouseLeave={()=>{
                                                                 setCurRow(-1)
                                                            }}
                                                       >
                                                            <i className={`fa fa-minus-circle row-del-btn cursor-pointer 
                                                                 ${curRow === i?'active' : ''} w-6 h-12`}
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
                                                                           onChange={()=>{
                                                                                const fieldRow = document.getElementsByClassName('row-'+i)[0]
                                                                                const fieldCell = fieldRow.getElementsByClassName('body-cell col-'+inCol)
                                                                                const cellVal = (fieldCell[0].querySelector('textarea') as HTMLTextAreaElement)
                                                                                     ?.value
                                                                                handleFieldChange(cellVal, i, inCol)
                                                                           }}
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

                         {/* Process Wizard */}
                         <div className={`
                              table-types-float-cont ${activeProcess? 'h-full w-full active':'h-0 w-0'} 
                              absolute top-0 left-0`
                         }>
                              {/* Blur Overlay */}
                              <div className="h-full w-full bg-slate-800 bg-opacity-60 backdrop-blur-sm"
                                   onClick={()=>setActiveProcess(false)}
                              ></div>
                              {/* Wizard Body */}
                              <div className={`
                                        table-types-float-body ${activeProcess? 'h-3/4 w-3/4 p-2 active':'h-0 w-0'} 
                                        absolute bg-white rounded-3xl flex flex-col items-center justify-start gap-4`
                                   }
                              >
                                   {/* Wiz Head */}
                                   <div className="w-full px-2 flex items-center justify-between border-b-red-200 border-b-2">
                                        <h1 className={`${activeProcess? 'h-10 text-2xl':'h-0 w-0'}`}> Verify Data Types</h1>
                                        <i className="fa fa-times-circle-o text-3xl cursor-pointer"
                                             onClick={()=>{
                                                  setActiveProcess(false)
                                             }}
                                        ></i>
                                   </div>

                                   {/* Wiz Body */}
                                   <div className="w-full h-full px-6 flex flex-col items-center justify-start ">
                                        <label className="pl-8">Chart Name:</label>
                                        <input 
                                             id='create-chartset-name'
                                             className="w-1/2 px-1 rounded-md border-2 border-teal-500"
                                             type='text'
                                             defaultValue={dataInst.name}
                                        />
                                        <h2>Verify the data type for each column</h2>
                                        <div className="w-fit flex items-center justify-between gap-1 bg-red-200">
                                             {headers.map((h , i) =>{
                                                  return(
                                                       <div key={i} className={`flex flex-col items-center justify-center gap-1 bg-red-400
                                                            ${activeProcess? 'text-sm':'h-0 w-0 hidden'}`}
                                                       >
                                                            <div className="w-full px-2 flex items-center justify-center border border-black">
                                                                 {h}
                                                            </div>
                                                            {defaultType[i] === 'string' ?
                                                                 <select className="w-full" name="dataType" id="data-type" defaultValue="string" 
                                                                      onChange={(e)=>{ 
                                                                           const opVal = e.target.value
                                                                           setNewType(undefined, opVal, i)
                                                                 }}>
                                                                      <option value="string">string</option>
                                                                      <option value="integer" disabled={true}>integer</option>
                                                                      <option value="decimal" disabled={true}>decimal</option>
                                                                      <option value="date" disabled={true}>date</option>
                                                                 </select>
                                                            :''}
                                                            {defaultType[i] === 'integer' ?
                                                                 <select className="w-full" name="dataType" id="data-type" defaultValue="integer" 
                                                                      onChange={(e)=>{ 
                                                                           const opVal = e.target.value
                                                                           setNewType(undefined, opVal, i)
                                                                 }}>
                                                                      <option value="integer">integer</option>
                                                                      <option value="decimal">decimal</option>
                                                                      <option value="string">string</option>
                                                                      <option value="date" disabled={true}>date</option>
                                                                 </select>
                                                            :''}
                                                            {defaultType[i] === 'decimal' ?
                                                                 <select className="w-full" name="dataType" id="data-type" defaultValue="decimal"
                                                                      onChange={(e)=>{ 
                                                                           const opVal = e.target.value
                                                                           setNewType(undefined, opVal, i)
                                                                 }}>
                                                                      <option value="decimal">decimal</option>
                                                                      <option value="integer">integer</option>
                                                                      <option value="string">string</option>
                                                                      <option value="date" disabled={true}>date</option>
                                                                 </select>
                                                            :''}
                                                            {defaultType[i] === 'date' ?
                                                                 <select className="w-full" name="dataType" id="data-type" defaultValue="date"
                                                                      onChange={(e)=>{ 
                                                                           const opVal = e.target.value
                                                                           setNewType(undefined, opVal, i)
                                                                 }}>
                                                                      <option value="date">date</option>
                                                                      <option value="string">string</option>
                                                                      <option value="integer" disabled={true}>integer</option>
                                                                      <option value="decimal" disabled={true}>decimal</option>
                                                                 </select>
                                                            :''}
                                                       </div>
                                                  )
                                             })}
                                        </div>
                                        <h3 className='pt-12'>Choose Chart Type</h3>
                                        <div className={`flex justify-around flex-wrap w-3/4 gap-y-2
                                                            ${activeProcess? '':'h-0 w-0 hidden'}`}>
                                             {chartOpts.map((opt) =>{
                                                  let optLabel = ''
                                                  let optImg = ''
                                                  if(opt === 'boxwhisker'){
                                                       optLabel= 'Box & Whisker'
                                                       optImg = boxwhiskerIcon
                                                  }else if(opt === 'bar'){
                                                       optLabel= 'Bar Chart'
                                                       optImg = barIcon
                                                  }else if(opt === 'column'){
                                                       optLabel= 'Column Chart'
                                                       optImg = columnIcon
                                                  }else if(opt === 'line'){
                                                       optLabel= 'Line Graph'
                                                       optImg = lineIcon
                                                  }else if(opt === 'radar'){
                                                       optLabel= 'Radar Chart'
                                                       optImg = radarIcon
                                                  }else if(opt === 'scatter'){
                                                       optLabel= 'Scatter Plot'
                                                       optImg = scatterIcon
                                                  }else if(opt === 'venn'){
                                                       optLabel= 'Venn Diagram'
                                                       optImg = vennIcon
                                                  }else if(opt === 'pie'){
                                                       optLabel= 'Pie Chart'
                                                       optImg = pieIcon
                                                  }else if(opt === 'histogram'){
                                                       optLabel= 'Histogram'
                                                       optImg = histoIcon
                                                  }else if(opt === 'pictograph'){
                                                       optLabel= 'Pictograph'
                                                       optImg = pictoIcon
                                                  }else if(opt === 'pyramid'){
                                                       optLabel= 'Pyramid Chart'
                                                       optImg = pyramidIcon
                                                  }return(
                                                       <div className='chart-options flex flex-col items-center justify-end cursor-pointer'
                                                            style={{ backgroundImage: `url(${optImg})` }}
                                                            onClick={()=>{
                                                                 let name : string
                                                                 name = (document.getElementById('create-chartset-name') as HTMLInputElement).value
                                                                 if(name.length === 0)
                                                                      name = dataInst.name
                                                                 transferDataset(name, opt)
                                                            }}
                                                       >
                                                            <p className='text-center p-0 m-0'>{optLabel}</p>
                                                       </div>
                                                  )
                                             })}
                                        </div>
                                   </div>
                              </div>
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