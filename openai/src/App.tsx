import * as React from "react";
import { Stack } from '@fluentui/react';

export interface IAppProps{
    openAIResponse: string;
    refreshHandler:()=>void;
}

export const App: React.FC<IAppProps>=props=>{
    return (
        <div>
            <Stack tokens={{ childrenGap: 8}} horizontal>
                <p>{props.openAIResponse}</p>
            </Stack>
        </div>
    )
    
}
