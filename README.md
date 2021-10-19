<p align="center">
  <img width="450" src="https://user-images.githubusercontent.com/31800695/138593031-536f9b8c-714c-4c4f-8725-63ea105fcca0.png">
  <h3 align="center">lang-stats-box</h3>
  <p align="center">💻 Update a pinned gist to show your most used programming languages</p>
</p>

---

> 📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## Setup

### Prep work

1. Create a new public GitHub Gist (https://gist.github.com/)
1. Create an access token with the `gist` scope and copy it. (https://github.com/settings/tokens/new)

### Project setup

1. Fork this repo
1. Go to the repo **Settings > Secrets**
1. Add the following environment variables:
   - **GH_TOKEN:** The GitHub access token generated above.
   - **GIST_ID:** The ID portion from your gist url: `https://gist.github.com/Aveek-Saha/`**`8335e85451541072dd25fda601129f7d`**.
   - **GH_USERNAME:** Your `GitHub` account username.
   - **EXCLUDE:** A comma separated list of languages you want to exclude from the gist. <br> Eg: *Jupyter Notebook,CSS,TeX,PHP*

## Credits
This code was inspired by [@matchai's bird-box](https://github.com/matchai/bird-box).