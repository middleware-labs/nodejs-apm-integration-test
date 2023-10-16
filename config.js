const tracker = require('@middleware.io/node-apm');
var config = tracker.track();

module.exports = {
    config: config
}