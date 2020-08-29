import React from 'react';
import '../Styling/ToolIcon.css'

const Tool = ({tool, index, clickOnTool}) => {

    return (
        <img className="toolIcon" src={tool.toolIcon} onClick={() => clickOnTool(tool)} alt={tool.name} />  
    );
}
 
export default Tool;