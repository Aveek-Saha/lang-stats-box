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

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '…' : str;
};

async function totalLanguages(exclude=['Jupyter Notebook', 'CSS', 'TeX', 'PHP']) {
    getRepos().then((result) => {
        // console.log(result);
        var top5 = Object.entries(result)
            .filter(lang => !exclude.includes(lang[0]))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        var totalCode = top5.reduce((a, b) => a.map((v, i) => v + b[i]))[1]
        var topPercent = top5.map(([a, b]) => [a, Math.round((b/totalCode)*10000)/100])

        var numBars = topPercent.map(([a, b]) => [a, b, Math.round(b/4)])

        var lines = [];
        numBars.forEach(lang => {
            lines.push(` ${truncate(lang[0] + " ", 12).padEnd(12, ' ')} ${ "▓".repeat(lang[2])}${ "░".repeat(25 - lang[2])} ${lang[1] + "%"}`)
        })

        updateGist(lines.join("\n"))
    });
}

async function updateGist(lines) {
    let gist;
    try {
      gist = await octokit.gists.get({ gist_id: gistId });
    } catch (error) {
      console.error(`Unable to get gist\n${error}`);
    }

    const filename = Object.keys(gist.data.files)[0];
  
    try {
      await octokit.gists.update({
        gist_id: gistId,
        description: `👨‍💻 Programming Stats`,
        files: {
          [filename]: {
              content: lines
          }
        }
      });
    } catch (error) {
      console.error(`Unable to update gist\n${error}`);
    }
  }

async function getRepos() {
    var repos = await octokit.repos.listForUser({
        username: githubUsername,
        type: "owner",
        per_page: 100,
        sort: "updated",
        direction: "desc",
    });

    var langTotal = {};

    return Promise.all(repos.data.map((repo) => getRepoLanguage(repo))).then(
        (results) => {
            // console.log(results);
            // return results;
            results.forEach((lang) => {
                let keys = Object.keys(lang);

                keys.map((x) => {
                    if (langTotal[x]) langTotal[x] += lang[x];
                    else langTotal[x] = lang[x];
                });
            });
            return langTotal;
        }
    );
}

async function getRepoLanguage(repo) {
    if (repo.fork) return {};
    var languages = await octokit.repos.listLanguages({
        owner: githubUsername,
        repo: repo.name,
    });

    return languages.data;
}

(async () => {
    await totalLanguages();
})();
