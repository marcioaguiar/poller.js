# poller.js

poll multiple http resources and report to librato.

```shell
node index.js  [configuration file path]
```

## formato do arquivo
```json
{
	"email": "librato@email.com",
	"token": "librato-token",
	
	"polls": [
		{
			"key": "metric.key",
			"url": "http://www.google.com",
			"interval": 60		
		},

		{
			"key": "metric.key.2",
			"url": "http://www.url2.com",
			"interval": 600
		}
	]
	
}
```
