var flatiron = require('flatiron'),
    requestHandlers = require("./lib/requestHandlers"),
    path = require('path'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);

// ROUTES ////////////////////////////////////////////
app.router.get('/', requestHandlers.home);
app.router.get('/status', requestHandlers.spaceStatus);

// SERVER ////////////////////////////////////////////
app.start(process.env.PORT || app.config.get('port') || 3000);
