const axios = require("axios").default;

const config = require("./config");

const pkg = require("./package.json");

const github = axios.create({
  baseURL: `https://api.github.com/`,
  auth: {
    username: config.OAuthClientID,
    password: config.OAuthClientSecret
  },
  headers: {
    accept: `application/vnd.github.v3+json`,
    "user-agent": `${pkg.name}/${pkg.version}`,
  },
});

module.exports = github;
