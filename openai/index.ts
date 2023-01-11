/**
 * MIT License
 *
 * Copyright (c) 2023 Elizabeth Akinfiieva, Serhii Kokhan, Tetiana Nizdropa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { OpenAIObject } from "./src/OpeanAIObject";
import { App } from "./src/App";
import { EnvironmentVariable } from "./src/EnvironmentVariable";

export class openai
    implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
    private _openAIText: OpenAIObject;
    private _openAIResult: string;
    private _context: ComponentFramework.Context<IInputs>;
    private _container: HTMLDivElement;
    private _notifyOutputChanged: () => void;

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.callMakeRequest = this.callMakeRequest.bind(this);
        this._context = context;
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;

        if (
            this._context.parameters.ResultAttribute &&
            this._context.parameters.ResultAttribute.raw
        ) {
            this._openAIResult = this._context.parameters.ResultAttribute.raw;
            ReactDOM.render(
                React.createElement(App, {
                    openAIResponse: this._openAIResult,
                    refreshHandler: this.callMakeRequest,
                }),
                this._container
            );
        } else {
            this.callMakeRequest();
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._context = context;
        if (
            this._context.parameters.ResultAttribute &&
            this._context.parameters.ResultAttribute.raw
        ) {
            this._openAIResult = this._context.parameters.ResultAttribute.raw;
            ReactDOM.render(
                React.createElement(App, {
                    openAIResponse: this._openAIResult,
                    refreshHandler: this.callMakeRequest,
                }),
                this._container
            );
        } else {
            this.callMakeRequest();
        }
    }

    public callMakeRequest(): void {
        this.makeRequest(() => {
            this._openAIResult = this._openAIText.choices[0].text;
            ReactDOM.render(
                React.createElement(App, {
                    openAIResponse: this._openAIResult,
                    refreshHandler: this.callMakeRequest,
                }),
                this._container
            );
            this._notifyOutputChanged();
        });
    }

    public getOutputs(): IOutputs {
        return {
            ResultAttribute: this._openAIResult,
        };
    }

    public destroy(): void { }

    public makeRequest(callback?: () => void) {
        const envVariable = new EnvironmentVariable(this._context.webAPI);
        envVariable
            .getValue(this._context.parameters.VariableOpenAIapiKey.raw)
            .then((KeyValue) => {
                var data = JSON.stringify({
                    model: this._context.parameters.OpenAIModel.raw,
                    prompt: `${this._context.parameters.QuestionText.raw} ${this._context.parameters.QuestionParameter.raw}?`,
                    temperature: this._context.parameters.OpenAITemperature.raw,
                    max_tokens: this._context.parameters.OpenAIMaxTokens.raw,
                });
                fetch("https://api.openai.com/v1/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + KeyValue,
                    },
                    body: data,
                }).then((response) => {
                    response.json().then((result) => {
                        this._openAIText = result;
                        console.log(result);
                        if (callback) {
                            callback();
                        }
                    });
                });
            });
    }
}
