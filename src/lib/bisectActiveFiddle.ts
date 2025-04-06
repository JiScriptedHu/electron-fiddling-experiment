import * as vscode from 'vscode';
import { Runner } from '@electron/fiddle-core';

export function bisectActiveFiddleCommands(context: vscode.ExtensionContext) {
    const bisectActiveFiddle = vscode.commands.registerCommand('fiddle.bisectCurrentDirectory', async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder is open. Please open a folder first.');
            return;
        }

        const startVersion = await vscode.window.showInputBox({
            prompt: 'Enter Electron version to use',
            placeHolder: 'e.g., 13.1.7'
        });

        if (startVersion === undefined) {
            vscode.window.showErrorMessage('Operation cancelled');
            return;
        }

        const endVersion = await vscode.window.showInputBox({
            prompt: 'Enter Electron version to use',
            placeHolder: 'e.g., 13.1.7'
        });

        if (endVersion === undefined) {
            vscode.window.showErrorMessage('Operation cancelled');
            return;
        }

        try {
            const fiddleRunner = await Runner.create();

            const result = await fiddleRunner.bisect(startVersion, endVersion, workspaceFolder);

            /* Currently due to some error, or mistake resulting is coming as failed everytime
            which is needed to be fix

            will fix it soon
            */

            vscode.window.showErrorMessage(`Fiddle: ${result}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run Fiddle: ${error}`);
        }
    });

    context.subscriptions.push(bisectActiveFiddle);
}