# webpack plugin template

A simple repo template to create new webpack plugins

Configured with:
- ESLint
- Prettier
- Jest (with code coverage)

## Instructions

### Clone this repo
```
$ git clone git@github.com:AnujRNair/webpack-plugin-template.git
```

### Update necessary items in `package.json`
- Fields to update:
  - Name
  - Main script
  - Git repository and urls
  - Keywords
  - Author
- Optionally remove `html-webpack-plugin` dependency
- Update all dependencies to their latest versions
  - `npm i -g npm-check-updates && ncu -u`

### Rename your folder
- Rename folder: `cd .. && mv webpack-plugin-template <new-name>`

### Reinitialize git and push new repo
- `cd <new name>`
- `rm -rf .git`
- `git init`
- `git add . && git commit -m'My first commit'`
- `git remote add origin <new github uri>`
- `git push -u --force origin master` 

### Setup `npm`
- `npm i`

**Now you're good to go!**
