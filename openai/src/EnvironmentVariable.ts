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

export class EnvironmentVariable {

    constructor(private _webAPI: ComponentFramework.WebApi) { }

    async getValue(schemaName: string | null): Promise<any> {
        if (!schemaName)
            return null;
        const environmentVar = await this.getEnvironmentVariable(schemaName);
        return environmentVar;
    }

    async getEnvironmentVariable(schemaName: string): Promise<string | undefined> {
        const relationshipName = "environmentvariabledefinition_environmentvariablevalue";
        let options = "?";
        options += "$select=schemaname,defaultvalue,type";
        options += `&$filter=statecode eq 0 and schemaname eq '${schemaName}'`;
        options += `&$expand=${relationshipName}($filter=statecode eq 0;$select=value)`;
        const response
            = await this._webAPI.retrieveMultipleRecords("environmentvariabledefinition", options);
        const environmentVarEntity = response.entities.shift();
        if (environmentVarEntity) {
            const environmentVarValueEntity
                = (<any[]>environmentVarEntity[relationshipName]).shift();
            const environmentVarValue
                = environmentVarValueEntity?.value ?? environmentVarEntity.defaultvalue;
            return environmentVarValue;
        }
    }
}