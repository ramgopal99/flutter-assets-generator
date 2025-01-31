"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
let watcher;
function activate(context) {
    let watchDisposable = vscode.commands.registerCommand('flutter-assets-generator.watchAssets', () => {
        startWatching();
    });
    let stopWatchDisposable = vscode.commands.registerCommand('flutter-assets-generator.stopWatch', () => {
        stopWatching();
    });
    let generateDisposable = vscode.commands.registerCommand('flutter-assets-generator.generate', () => {
        generateAssets();
    });
    context.subscriptions.push(watchDisposable);
    context.subscriptions.push(stopWatchDisposable);
    context.subscriptions.push(generateDisposable);
}
function startWatching() {
    if (watcher) {
        stopWatching();
    }
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder found');
        return;
    }
    const rootPath = workspaceFolders[0].uri.fsPath;
    const pubspecPath = path.join(rootPath, 'pubspec.yaml');
    if (!fs.existsSync(pubspecPath)) {
        vscode.window.showErrorMessage('No pubspec.yaml found');
        return;
    }
    watcher = fs.watch(rootPath, { recursive: true }, (eventType, filename) => {
        if (filename && filename.includes('assets')) {
            generateAssets();
        }
    });
    vscode.window.showInformationMessage('Flutter Assets: Watching for changes...');
}
function stopWatching() {
    if (watcher) {
        watcher.close();
        watcher = undefined;
        vscode.window.showInformationMessage('Flutter Assets: Stopped watching');
    }
}
function generateAssets() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder found');
        return;
    }
    const rootPath = workspaceFolders[0].uri.fsPath;
    const pubspecPath = path.join(rootPath, 'pubspec.yaml');
    try {
        const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');
        const pubspec = yaml.load(pubspecContent);
        const config = pubspec.flutter_assets;
        if (!config) {
            vscode.window.showErrorMessage('No flutter_assets configuration found in pubspec.yaml');
            return;
        }
        const assetsPaths = Array.isArray(config.assets_path) ? config.assets_path : [config.assets_path];
        const outputPath = path.join(rootPath, config.output_path);
        const filename = config.filename || 'assets.dart';
        const classname = config.classname || 'Assets';
        const fieldPrefix = config.field_prefix === undefined ? 'assets' : config.field_prefix;
        const packageName = config.package_name;
        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }
        let assetPaths = [];
        for (const assetsPath of assetsPaths) {
            const fullAssetsPath = path.join(rootPath, assetsPath);
            if (fs.existsSync(fullAssetsPath)) {
                assetPaths = assetPaths.concat(getAllFiles(fullAssetsPath));
            }
        }
        let output = '// ignore_for_file: prefer_single_quotes\n\n';
        output += `class ${classname} {\n`;
        output += `  ${classname}._();\n\n`;
        for (const assetPath of assetPaths) {
            const relativePath = path.relative(rootPath, assetPath).replace(/\\/g, '/');
            const variableName = generateVariableName(relativePath, fieldPrefix);
            const packagePath = packageName ? `packages/${packageName}/${relativePath}` : relativePath;
            if (!config.ignore_comments) {
                output += `  /// Assets for ${path.basename(assetPath, path.extname(assetPath))}\n`;
                output += `  /// ${packagePath}\n`;
            }
            output += `  static const String ${variableName} = "${packagePath}";\n\n`;
        }
        output += '}\n';
        fs.writeFileSync(path.join(outputPath, filename), output);
        vscode.window.showInformationMessage('Flutter Assets: Generated successfully');
    }
    catch (error) {
        vscode.window.showErrorMessage('Error generating assets: ' + error);
    }
}
function getAllFiles(dirPath) {
    const files = [];
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            files.push(...getAllFiles(fullPath));
        }
        else {
            files.push(fullPath);
        }
    }
    return files;
}
function generateVariableName(path, prefix) {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    const nameWithoutExt = fileName.split('.')[0];
    let variableName = nameWithoutExt
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/^[0-9]/, '_$&');
    if (prefix) {
        variableName = prefix + variableName;
    }
    return variableName;
}
function deactivate() {
    stopWatching();
}
//# sourceMappingURL=extension.js.map