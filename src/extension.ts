import * as vscode from 'vscode';
import { registerPathCommands } from './lib/getPath';
import { runActiveFiddleCommands } from './lib/runActiveFiddle';
import { bisectActiveFiddleCommands } from './lib/bisectActiveFiddle';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "fiddle" is now active!');

	registerPathCommands(context);
	
	runActiveFiddleCommands(context);

	bisectActiveFiddleCommands(context);

	helloWorld(context);
}

function helloWorld(context: vscode.ExtensionContext) {
	const printHello = vscode.commands.registerCommand('fiddle.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Fiddle!');
	});

	context.subscriptions.push(printHello);
};

export function deactivate() {}
