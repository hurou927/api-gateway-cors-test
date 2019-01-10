'use strict';

class Deploy {
    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;
        this.hooks = {
            'after:deploy:compileEvents': this.setResponseMapping.bind(this),
        };
    }

    setResponseMapping() {
        this.serverless.cli.log('Set response mapping template to all OPTIONS methods');
        const resources = this.serverless.service.provider.compiledCloudFormationTemplate.Resources;
        Object.keys(resources)
            .filter(r => resources[r].Type === 'AWS::ApiGateway::Method')
            .filter(r => resources[r].Properties.HttpMethod === 'OPTIONS')
            .forEach(r=>{
                resources[r].Properties.Integration.IntegrationResponses.forEach(ir=>{
                    ir.ResponseTemplates['application/json'] = `#set($context.responseOverride.header['Access-Control-Allow-Origin'] = $input.params().get('header').get('origin'))`;
                })
            })
        
    }
}

module.exports = Deploy;