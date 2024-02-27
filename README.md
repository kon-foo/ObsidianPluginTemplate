## Obsidian Plugin Template
This is a template for creating an Obsidian plugin. It extends the [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin) with a [VSCode DevContainer](https://github.com/kon-foo/ObsidianPluginDevContainer), a [Test Vault](https://github.com/kon-foo/ObsidianPluginTestVault) and some utility scripts and smart presets. After setting things up you should have a fully functional development environment with a test vault, your enabled plugin and hot reloading (cudos to [pjeby](https://github.com/pjeby/hot-reload)). 

## How to use this template
1. Clone this repository into to a new Plugin directory:
```bash
git clone https://github.com/kon-foo/ObsidianPluginTemplate.git MyNewPlugin && cd MyNewPlugin
```

2. Detach the repository from the remote origin:
```bash
git remote remove origin
```

3. Add [ObsidianPluginDevContainer](https://github.com/kon-foo/ObsidianPluginDevContainer) and [ObsidianPluginTestVault](https://github.com/kon-foo/ObsidianPluginTestVault). In most cases you would want them to be part of your repository. You can simply clone them:
```bash
git clone https://github.com/kon-foo/ObsidianPluginDevContainer.git .devcontainer
git clone https://github.com/kon-foo/ObsidianPluginTestVault.git testVault
```
If you want to keep them up to date, you can add them as submodules:
```bash
git submodule add https://github.com/kon-foo/ObsidianPluginDevContainer.git .devcontainer
git submodule add https://github.com/kon-foo/ObsidianPluginTestVault.git testVault
git add .gitmodules .devcontainer
git add .gitmodules testVault
```
To later update the submodules (DevContainer and TestVault) to the latest version:
`git submodule update --remote --merge`


4. Let VSCode do its magic and build the DevContainer. You need the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed and of course [Docker](https://www.docker.com/products/docker-desktop) up and running.

- Open the repository in VSCode
- Press `Ctrl+Shift+P` and select `Dev-Containers: Reopen in Container`
- After a successfule build, the `setup.js` script will be executed and guides you through the customization. (TBH: At the moment it just asks for your plugin name an replaces it everywhere. Remember to change the other field in the manifest.json)
- Afterwards the watcher starts. On every code change, a new `main.js` file gets build, copied to the test vault and the "Hot Reload" plugin should refresh your Obsidian instance.

5. Open your vault in Obsidian and start developing your plugin. To distinguish visually between the test vault and your real vault, the window frame has an awful yellow title bar. You can change this in [`devVaultSnippet.css`](testVault/snippets/devVaultSnippet.css). 


## What's included

### A setup script
After running the `setup.js` script, you should be have a fully functional development environment. You can just open your Obsidian app, opent the new vault and should find you plugin included, enabled and live-updating.

### Better version bumping and releasing:
This repos comes with an upgraded version of the `version-bum.mjs` script from the [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin). It does the following:
1. Takes `--patch`, `--minor`, `--major` or `---version` as input
2. Reads the current version form `package.json`
3. Use the `semver` package to update the version according to the Semantic Versioning Specs
4. Updates the `package.json`, `manifest.json` and `version.json`
5. Creates a git tag
6. Adds the updated files to a comit.

Afterwards you got to push the changes with `git push --follow-tags`. From there, the GitHub Action will take over and build a draft release, which you got o publish manually. Refer to the [Obsidian Plugin Documentation](https://docs.obsidian.md/Plugins/Releasing/Release+your+plugin+with+GitHub+Actions) for more information on how to release a plugin.

### ESLint and Prettier
This template uses ESLint and Prettier to enforce a consistent code style. VSCode is configured to run Prettier on save. ESLint (with a Prettier plugin) can be run manually with `npm run lint`. I just got into JavaScript and TypeScript development and haven't settled on an opionion yet, so feel free to suggest better settings.


## Obsidian Plugin Development Resources
- [Obsidian Plugin Documentation](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [The Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)

Feel free to add your own resources to this list.

## Support Me!
If you find these repositories helpful, I would be grateful if you would buy me some time to do more like this:
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/kon.foo)