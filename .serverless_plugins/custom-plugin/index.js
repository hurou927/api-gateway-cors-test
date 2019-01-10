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
      .filter(key => resources[key].Type === 'AWS::ApiGateway::Method')
      .filter(key => resources[key].Properties.HttpMethod === 'OPTIONS')
      .forEach(key => {
        resources[key].Properties.Integration.IntegrationResponses.forEach(ir => {
          ir.ResponseTemplates['application/json'] = `#set($context.responseOverride.header['Access-Control-Allow-Origin'] = $input.params().get('header').get('origin'))`;
        })
      })

  }
}

module.exports = Deploy;