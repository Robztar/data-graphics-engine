export const delDataRecord = (d:any, setD:any, id:string) =>{
     if (d.length === 0)
          return
     const sliced = d.slice(0, d.length-1)
     console.log("Sliced Data is"+sliced)
     setD(sliced, id)
}