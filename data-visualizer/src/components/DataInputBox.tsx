import { useState } from 'react'

// import uploadIcon from '../img/cloudupload-filled.png'
import uploadIcon from '../img/cloudupload-line.png'
import txtImg from '../img/txt-file.png'
import pdfImg from '../img/pdf-file.png'
// import docImg from '../img/doc-file.png'
// import csvImg from '../img/csv-file.png'
// import xlsImg from '../img/xls-file.png'
// From Icon8

function upFile(file:any, setFileData: any){
     console.log(file)
     let sType = file.type.split('/')[0]
     setFileData('')
     if(file.type === 'application/pdf'){
          let fileRead = new FileReader()
          fileRead.readAsText(file)
          fileRead.onload = () => {
               // if(fileRead.result && typeof(fileRead.result) === 'string'){
               //      setFileData(fileRead.result)
               //      // console.log(fileRead.result)
               //      // alert(fileRead.result)
               // }
          }
     }
     // if(file.type === 'text/plain' ){
     if(sType === 'text'){
          let fileRead = new FileReader()
          fileRead.readAsText(file)
          fileRead.onload = () => {
               console.log(fileRead.result)
               if(fileRead.result && typeof(fileRead.result) === 'string'){
                    setFileData(fileRead.result)
                    // alert(fileRead.result)
               }
          }
     }
}
function typeCheck(type:string){
     let sType = type.split('/')[0]
     if(type === 'application/pdf' 
     // || type === 'text/plain' 
     || sType === 'text')
          return true
}

type EntryProps = {
     dataEntry: { entry: string; entryData: any[] | string },
     setDataEntry : any
}
export const DataInputBox = (props:EntryProps) =>{
     const dataEntryDef = props.dataEntry.entryData
     let dataToEnter = ''
     
     if(dataEntryDef.length > 0 && typeof(dataEntryDef) !== 'string'){
          const keyNames = Object.keys(dataEntryDef[0])
          for (const key of keyNames) {
               dataToEnter += key + ', '
          }
          dataToEnter += ': '
          
          dataEntryDef.map((entry:any) =>{
               const keyNames = Object.keys(entry)
               for (const key of keyNames) {
                    dataToEnter += entry[key]+', '
               }
          })
     }
     if(typeof(dataEntryDef) === 'string')
          dataToEnter = dataEntryDef
     let fileSel : HTMLInputElement
     let dragArea : HTMLDivElement
     const [fileName, setFileName] =  useState('')
     const [fileType, setFileType] =  useState('')
     const [fileData, setFileData] =  useState('')
     const [uploaded, setUploaded] =  useState(false)
     let fileTypeImg =  ''
     
     if('file'){
          fileSel = document.getElementById('file-selector') as HTMLInputElement
          dragArea = document.getElementById('drag-area') as HTMLDivElement
          
          // - { File Browsing }
          if(fileSel){
               fileSel.onchange = () =>{
                    const files = fileSel.files
                    if(files){
                         [...files].forEach((file)=>{
                              if(typeCheck(file.type)){
                                   setUploaded(true)
                                   setFileType(file.type)
                                   setFileName(file.name)
                                   upFile(file, setFileData)
                              }
                         })
                    }
               }
          }
          if(fileType === 'application/pdf')
               fileTypeImg = pdfImg
          if(fileType.split('/')[0] === 'text')
               fileTypeImg = txtImg
          // alert(fileName+': '+fileData)
     }
     
     console.log('Data Entered: '+dataToEnter)
     return(
          <section id="data-entry-sect" className={`${
               props.dataEntry.entry === 'file'
               ?'file-input':'txt-input'} 
          w-full h-full flex items-start justify-center gap-1`}>
               
               {/* Text data input */}
               <label className="pl-8">Enter Data:</label>
               <textarea 
                    name="text"
                    wrap="soft"
                    id='create-dataset-data'
                    className="w-3/4 h-48 px-1 rounded-md border-2 border-teal-500"
                    placeholder="Ex. 1,a 2,b 3,c ..."
                    defaultValue={dataToEnter}
               ></textarea>

               {/* File data input */}
               {/* File upload + loading:  https://www.youtube.com/watch?v=lniUevJnEa4 */}
               {/* File loading: https://www.youtube.com/watch?v=HrK7RFNDTKA */}
               {/* Embed PDF: 
                    - https://www.youtube.com/watch?v=Ll7PA0dtpW0 
                    - https://www.youtube.com/watch?v=b5Vdy4_xWVU
               */}
               {/* Extract Text from PDF: https://www.youtube.com/watch?v=enfZAaTRTKU */}
               
               <div className="file-entry rounded-xl bg-blue-50 w-full ">
                    {/* File Entry Area */}
                    <div className="flex flex-col w-full h-full">
                         <h2 className="px-4 m-0 text-lg">Enter files here</h2>
                         {/* Upload/Drag Area */}
                         <div 
                              id='drag-area' 
                              className="flex px-2 flex-col w-full h-full"
                              onDragOver={(e: React.DragEvent<HTMLDivElement>)=>{
                                   e.preventDefault();
                                   [...e.dataTransfer.items].forEach((item)=>{
                                        if(typeCheck(item.type) && dragArea)
                                             dragArea.classList.add('drag-over-effect')
                                   })
                              }}
                              onDragLeave={()=>{
                                   if(dragArea){
                                        dragArea.classList.remove('drag-over-effect')
                                   }
                              }}
                              onDrop={(e: React.DragEvent<HTMLDivElement>)=>{
                                   e.preventDefault();
                                   dragArea.classList.remove('drag-over-effect');
                                   if(e.dataTransfer.items){
                                        [...e.dataTransfer.items].forEach((item)=>{
                                             if(item.kind === 'file'){
                                                  if(typeCheck(item.type)){
                                                       setUploaded(true)
                                                       setFileType(item.type)
                                                       const file = item.getAsFile()
                                                       if(file)
                                                            setFileName(file.name)
                                                       upFile(file, setFileData)
                                                  }
                                                  // upFile(file, setFileData)
                                             }
                                        })
                                   }
                                   else{
                                        [...e.dataTransfer.files].forEach((file)=>{
                                             if(typeCheck(file.type)){
                                                  setFileType(file.type)
                                                  setFileName(file.name)
                                                  upFile(file, setFileData)
                                             }
                                        })
                                   }
                              }}
                         >
                              <div draggable className="file-drop-zone bg-blue-100 flex flex-col items-center justify-center gap-2.5 w-full h-full rounded-lg">
                                   <img src={uploadIcon} alt="upload here" className='h-28 w-28' />
                                   <span>Drag and Drop your files here</span>
                                   <span>OR</span>
                                   <button id='file-browse'
                                        onClick={()=>{
                                             fileSel.click()
                                        }}
                                   >Browse</button>
                                   <input type="file" id='file-selector'/>
                              </div>
                              {/* Hover View */}
                              <div className="file-hover bg-blue-100 flex items-center justify-center h-full rounded-lg">
                                   <p className='text-4xl'>Drop Here</p>
                              </div>
                         </div>
                         <small className="pl-2 pt-0.5">Allowed files are: .txt, .pdf, .docx, .csv, .xlsx</small>
                    </div>

                    {/* Uploaded File Info */}
                    <div id='uploaded-area' className={`
                         ${uploaded?'active':''}
                         flex flex-col w-full h-full p-2 items-start justify-start gap-2.5
                    `}>
                         <h4 className="px-4 text-lg">Uploaded File</h4>
                         <div className='flex items-center justify-between w-full'>
                              <div className='file-type flex'>
                                   <img src={fileTypeImg} alt="file type" />
                              </div>
                              <div className='file-info flex flex-col w-full'>
                                   <div className="file-name flex-col">
                                        <p>{fileName}</p>
                                        <div className='items-center justify-between'>
                                             <span>50%</span>
                                             <i className='fa fa-times p-0 cursor-pointer text-red-400'
                                                  onClick={()=>{
                                                       setUploaded(false)
                                                  }}
                                             ></i>
                                        </div>
                                        
                                   </div>
                                   <div className="file-progress w-full mt-0.5 rounded-lg bg-blue-200">
                                        <span className='block h-full rounded-lg'></span>
                                   </div>
                                   <small className="file-size">2.2MB</small>
                              </div>
                         </div>
                         <div>{fileData}</div>
                         <button 
                              onClick={()=>{
                                   props.setDataEntry({entry: 'raw', entryData: fileData})
                                   setUploaded(false)
                                   setFileData('')
                                   setFileData('')
                                   setFileType('')
                              }}
                         >Process</button>
                    </div>
               </div>
          </section>
          
     )
     
     
}