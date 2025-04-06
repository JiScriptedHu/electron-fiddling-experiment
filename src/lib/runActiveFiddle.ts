import * as vscode from 'vscode';
import { Runner } from '@electron/fiddle-core';

export function runActiveFiddleCommands(context: vscode.ExtensionContext) {
    const runActiveFiddle = vscode.commands.registerCommand('fiddle.runCurrentDirectory', async () => {

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder is open. Please open a folder first.');
            return;
        }

        const electronVersion = await vscode.window.showInputBox({
            prompt: 'Enter Electron version to use',
            placeHolder: 'e.g., 13.1.7'
        });

        if (electronVersion === undefined) {
            vscode.window.showErrorMessage('Operation cancelled');
            return;
        }

        try {
            const fiddleRunner = await Runner.create();

            const result = await fiddleRunner.run(electronVersion, workspaceFolder);

            vscode.window.showInformationMessage(`Fiddle successfully run on electron version ${electronVersion}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run Fiddle: ${error}`);
        }
    });

    context.subscriptions.push(runActiveFiddle);
}