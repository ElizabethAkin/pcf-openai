export class EnvironmentVariable {
    constructor(private _webAPI: ComponentFramework.WebApi) { 

    }
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