import React,{useState}  from 'react';
const SelectableGrid =({rows,columns})=>{
    const [isMouseDown,setIsMouseDown] = useState(false);
    const [selectedBox,setSelectedbox]=useState([]);
    const handleMouseUp =()=>{
        setIsMouseDown(false);
    }
    const handleMouseDown = (boxNumber)=>{
        setIsMouseDown(true);
        setSelectedbox([boxNumber])
    }
    const handleMouseEnter = (boxNumber)=>{
        if(isMouseDown)
        {
            const startBox = selectedBox[0];
            const endBox = boxNumber;
            const startRow = Math.floor((startBox-1)/columns);//to fetch the start row
            const startCol = (startBox -1 ) % columns;
            const endRow = Math.floor((endBox-1)/columns);
            const endCol = (endBox-1)%columns;

            const minRow = Math.min(startRow,endRow);
            const maxRow = Math.max(startRow,endRow);
            const minCol = Math.min(startCol,endCol);
            const maxCol = Math.max(startCol,endCol);
 
            const selected =[];
            for(let row=minRow;row<=maxRow;row++)
            {
                for(let col=minCol;col<=maxCol;col++)
                {
                    selectedBox.push(row*columns + col+1)
                }
            }
            setSelectedbox(selectedBox);
        }
    }
    

    return (
        <div className="grid" style={{"--rows":rows,"--cols":columns}} onMouseUp={handleMouseUp}>
            {
                [...Array(rows*columns).keys()].map((value,i)=>{
                    return (<div key={i} className={`box ${selectedBox.includes(i+1)? 'selected':""}`}
                    onMouseDown={()=>handleMouseDown(i+1)}
                    onMouseEnter={()=>handleMouseEnter(i+1)}
                    
                    >{i+1}</div>);
                })
            } 
        </div>
    )
}
export default SelectableGrid;