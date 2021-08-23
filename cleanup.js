// Revoke token
// https://docs.github.com/en/rest/reference/apps#delete-an-app-token

const core = require('@actions/core');
const github = require('./github');
const config = require('./config');

(async () => {
  try {
    const response = await github.delete(`/applications/${ config.OAuthClientID }/token`, {
      data: {
        access_token: process.env.GH_TOKEN
      }
    });

    if (response.status !== 204) {
      core.setFailed(`Failed: ${ JSON.stringify(response.data) }`);
    }
  } catch(e) {
    core.setFailed(e);
  }
})();
