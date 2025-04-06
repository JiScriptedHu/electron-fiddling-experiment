import * as vscode from 'vscode';

export function registerPathCommands(context: vscode.ExtensionContext) {
    const currentDirectory = vscode.commands.registerCommand('fiddle.getCurrentDirectory', () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        
        if (workspaceFolder) {
            vscode.window.showInformationMessage(`Current workspace: ${workspaceFolder}`);
        } else {
            vscode.window.showWarningMessage('No workspace folder is currently open.');
        }
    });
    
    context.subscriptions.push(currentDirectory);
}