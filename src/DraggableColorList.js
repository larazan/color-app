import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(props => {
    return (
        <div style={{height: "100%", marginTop: "80px"}}>
            {props.colors.map((color,i) => (
                <DraggableColorBox 
                    index={i}
                    key={color.name}
                    color={color.color} 
                    name={color.name} 
                    handleClick={() => props.removeColor(color.name)}
                />
            ))}
        </div>
    )
})

export default DraggableColorList;