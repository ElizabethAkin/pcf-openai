import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { OpenAIobject } from "./src/OpeanAIObject";
import { App } from "./src/App";
import { EnvironmentVariable } from "./src/EnvironmentVariable";

export class openai implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _openAItext:OpenAIobject;
    private _openAIresult: string;
	private _context: ComponentFramework.Context<IInputs>
	private _container: HTMLDivElement;
	private _notifyOutputChanged:()=> void;


    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.callMakeRequest = this.callMakeRequest.bind(this);
        this._context = context;
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;

        if(this._context.parameters.ResultAttribute && this._context.parameters.ResultAttribute.raw)
        {
            this._openAIresult = this._context.parameters.ResultAttribute.raw;
            ReactDOM.render(React.createElement(App, {openAIResponse: this._openAIresult,refreshHandler:this.callMakeRequest}),this._container);
        }
        else
        {
            this.callMakeRequest();
        }
        
    }
/**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
public updateView(context: ComponentFramework.Context<IInputs>): void
{
    this._context = context;
    if(this._context.parameters.ResultAttribute && this._context.parameters.ResultAttribute.raw)
    {
        this._openAIresult = this._context.parameters.ResultAttribute.raw;
        ReactDOM.render(React.createElement(App, {openAIResponse: this._openAIresult,refreshHandler:this.callMakeRequest}),this._container);
    }
    else
    {
        this.callMakeRequest();
    }
}

public callMakeRequest():void
{
    this.makeRequest(()=>
    {
        this._openAIresult = this._openAItext.choices[0].text;
        ReactDOM.render(React.createElement(App, {openAIResponse: this._openAIresult,refreshHandler:this.callMakeRequest}),this._container);
        this._notifyOutputChanged();
    })
}

/**
 * It is called by the framework prior to a control receiving new data.
 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
 */
public getOutputs(): IOutputs
{
    return {
        ResultAttribute: this._openAIresult
    };
}

/**
 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
 * i.e. cancelling any pending remote calls, removing listeners, etc.
 */
public destroy(): void
{
    // Add code to cleanup control if necessary
}

public makeRequest(callback?:()=>void){
    const envVariable = new EnvironmentVariable(this._context.webAPI); 
    envVariable.getValue(this._context.parameters.VariableOpenAIapiKey.raw).then((KeyValue)=>{

        var data = JSON.stringify({
            "model": "text-davinci-003",
            "prompt": `${this._context.parameters.QuestionText.raw} ${this._context.parameters.QuestionParameter.raw}?`,
            "temperature": 0,
            "max_tokens": 700
        });
        fetch('https://api.openai.com/v1/completions',{
            method:'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + KeyValue
              },
              body : data
        }).then((response)=>{
            response.json().then((result)=>{
                this._openAItext = result;
                console.log(result);
                if(callback){
                    callback();
                }
            })
        })
    })
}
}
