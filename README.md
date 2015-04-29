# poller.js

consulta uma lista de URL periodicamente e envia
os status para librato.

node index.js  urls.json

## formato do arquivo

{
	"email": "librato@email.com",
	"token": "librato-token",
	
	"polls": [
		"metric.key": {
			"url": "http://www.google.com",
			"interval": 60		
		},

		"metric.key.2": {
			"url": "http://www.url2.com",
			"interval": 600
		}
	]
	
}