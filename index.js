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
        type: "owner",
        per_page: 100,
        sort: "updated",
        direction: "desc",
    });

    repos.data.forEach((repo) => {
        getRepoLanguage(repo.name);
    });
}

async function getRepoLanguage(repo) {
  var languages = await octokit.repos.listLanguages({
    owner: githubUsername,
    repo: repo,
  });

  console.log(languages);

}

(async () => {
    await getRepos();
})();
