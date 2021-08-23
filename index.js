// Create token
// https://docs.github.com/en/rest/reference/apps#create-a-scoped-access-token

const core = require('@actions/core');
const github = require('./github');
const config = require('./config');

(async () => {
  const token = core.getInput(`token`);
  const target = core.getInput(`target`);
  const repositories = core.getInput(`repositories`).split(`,`).map(repo => repo.trim());
  const permissions = Object.fromEntries(core.getInput(`permissions`).split(`,`).map(perm => perm.trim().split(':')));

  core.setSecret(token);
  core.info(`target: ${ target }`);
  core.info(`repositories: ${ JSON.stringify(repositories) }`);
  core.info(`permissions: ${ JSON.stringify(permissions) }`);

  const { data: { token: scopedToken } } = await github.post(`/applications/${ config.OAuthClientID }/token/scoped`, {
    access_token: token,
    target,
    repositories,
    permissions
  });

  core.setSecret(scopedToken);
  core.setOutput('access-token', scopedToken);
  core.exportVariable('GH_TOKEN', scopedToken);
})();
