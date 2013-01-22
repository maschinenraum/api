dev:
	export SPC_APIHOST=dev && forever --watch app.js

dev-log:
	forever logs

beta:
	git push beta master

beta-log:
	heroku logs --app maschinenraum-api-beta --tail

prod:
	git push deploy master

prod-log:
	heroku logs --app maschinenraum-api --tail
