import * as React from "react";
import { IIconProps, IContextualMenuProps, Stack, Link } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';

export interface IAppProps{
    openAIResponse: string;
    refreshHandler:()=>void;
}

const refreshIcon: IIconProps = { iconName: 'Refresh' };

export const App: React.FC<IAppProps>=props=>{
    return (
        <div>
            <Stack tokens={{ childrenGap: 8}} horizontal>
                <p>{props.openAIResponse}</p>
            </Stack>
        </div>
    )
    
}
