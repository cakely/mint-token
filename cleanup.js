// Revoke token
// https://docs.github.com/en/rest/reference/apps#delete-an-app-token

const core = require('@actions/core');
const github = require('./github');
const config = require('./config');

(async () => {
  core.info(`Revoking ${ process.env.GH_TOKEN }`);
})();
