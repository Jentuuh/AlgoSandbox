import React from 'react';
import { useState } from 'react';
import Tool from './Tool';
import '../Styling/Toolbox.css';

const ToolBox = () => {
    const [tools, setTools] = useState([
            {
                name: 'Start',
                description: 'Use this tool to mark a cell as the end point of your traject.',
                toolIcon: 'https://image.flaticon.com/icons/svg/495/495499.svg'
            },
            {
                name: 'Finish',
                description: 'Use this tool to mark a cell as the end point of your traject.',
                toolIcon: 'https://image.flaticon.com/icons/svg/783/783470.svg'
            }
    ]);
    const [equipedTool, setEquipedTool] = useState(null);

    const equipTool = (toolToEquip) => {
        setEquipedTool(toolToEquip);
        console.log("Tool Equiped:" + equipedTool.name);
    }


    return (
            <div className="toolbox">
                <h2 className="h2">Tools:</h2>
                {tools.map((tool, index) =>(
                        <Tool
                            key={index}
                            index={index}
                            tool={tool}
                            onClick={(tool) => { equipTool(tool)}}
                        />
                    ))}
            </div>);
}
 
export default ToolBox;