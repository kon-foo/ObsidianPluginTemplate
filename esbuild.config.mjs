import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import fs from 'fs';
import path from 'path';

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const copyToVault = () => {
	const targetDir = path.join('testVault/.obsidian/plugins', pluginDirName);

	// Check if the target directory exists, create it if not
	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir, { recursive: true });
		fs.writeFileSync(path.join(targetDir, '.hotreload'), '');
		console.log(`Created plugin directory: ${targetDir}`);
	}

	// Copy main.js, style.css & manifest.json to the target directory
	fs.copyFileSync('main.js', path.join(targetDir, 'main.js'));
	fs.copyFileSync('manifest.json', path.join(targetDir, 'manifest.json'));
	fs.copyFileSync('src/styles.css', path.join(targetDir, 'styles.css'));
	console.log('🔥 Files copied to test vault.');
  };

const prod = (process.argv[2] === "production");
const manifestJson = JSON.parse(fs.readFileSync(path.resolve('manifest.json'), 'utf8'));
const pluginDirName = manifestJson.id;

const context = await esbuild.context({
	banner: {
		js: banner,
	},
	entryPoints: ["./src/main.ts"],
	bundle: true,
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtins],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile: "main.js",
	plugins: [
		{
			name: "copy-to-vault",
			setup(build) {
				build.onEnd(() => {
					copyToVault();
				});
			},
		},
	],

});

if (prod) {
	await context.rebuild();
	process.exit(0);
} else {
	await context.watch();
}