// Revoke token
// https://docs.github.com/en/rest/reference/apps#delete-an-app-token

const core = require('@actions/core');
const github = require('./github');
const config = require('./config');

(async () => {
  core.info(`Revoking ${ process.env.GH_TOKEN }`);

  const response = await github.delete(`/applications/${ config.OAuthClientID }/token`, {
    access_token: process.env.GH_TOKEN
  });

  if (response.status !== 204) {
    core.setFailed(`Failed: ${ JSON.stringify(response.data) }`);
  }
})();
