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
            
            switch (result.status) {
                case 'test_passed':
                    vscode.window.showInformationMessage(
                        `Fiddle successfully run on electron version ${electronVersion}`
                    );
                    break;
                case 'test_failed':
                    vscode.window.showWarningMessage(
                        `Fiddle failed with exit code 1 on electron version ${electronVersion}`
                    );
                    break;
                case 'test_error':
                    vscode.window.showErrorMessage(
                        `Fiddle encountered a test error on electron version ${electronVersion}`
                    );
                    break;
                case 'system_error':
                    vscode.window.showErrorMessage(
                        `System error occurred while running fiddle on electron version ${electronVersion}`
                    );
                    break;
                default:
                    vscode.window.showErrorMessage(
                        `Unknown result status while running fiddle on electron version ${electronVersion}`
                    );
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run Fiddle: ${error}`);
        }
    });

    context.subscriptions.push(runActiveFiddle);
}