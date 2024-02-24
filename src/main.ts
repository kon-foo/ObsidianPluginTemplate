import { App, Modal, Plugin } from 'obsidian';
import { PluginTemplateSettingTab } from './settings/settingsTab';
import { defaultSettings, PluginTemplateSettings } from './settings/pluginSettings';


export default class PluginTemplate extends Plugin {
	settings: PluginTemplateSettings;

	async onload() {
		console.log('loading plugin');
		await this.loadSettings();
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new PluginTemplateSettingTab(this.app, this));
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, defaultSettings, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}