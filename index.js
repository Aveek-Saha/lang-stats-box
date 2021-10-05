require("dotenv").config();
const { Octokit } = require("@octokit/rest");

const {
    GIST_ID: gistId,
    GH_TOKEN: githubToken,
    GH_USERNAME: githubUsername,
} = process.env;

const octokit = new Octokit({
    auth: `token ${githubToken}`,
});

async function getRepos() {
    var repos = await octokit.repos.listForUser({
        username: githubUsername,
    });

    console.log(repos);
}

(async () => {
    await getRepos();
})();
