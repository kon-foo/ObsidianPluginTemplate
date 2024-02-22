
import { PluginSettingTab, Setting, App } from "obsidian";
import PluginTemplate from "main";

export class PluginTemplateSettingTab extends PluginSettingTab {
	plugin: PluginTemplate;

	constructor(app: App, plugin: PluginTemplate) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
