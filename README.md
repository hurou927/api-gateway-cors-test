# Research CORS

keyword
- serverless framework
- plugin
- cors
- mapping template


The plugin in this repo. set response-mapping-template to all OPTIONS methods to set caller origin(in header) to `access-Control-Allow-Origin` respectively.
- mapping-template: `#set($context.responseOverride.header['Access-Control-Allow-Origin'] = $input.params().get('header').get('origin'))` 

Serverless Custom Plugin is in `.serverless_plugin`.

# Deploy
```
$ sls deploy
```

