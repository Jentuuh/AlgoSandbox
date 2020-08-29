import React from 'react';
import '../Styling/ToolIcon.css'

const Tool = ({tool, index}) => {

    return (
        <img className="toolIcon" src={tool.toolIcon} alt={tool.name} />  
    );
}
 
export default Tool;