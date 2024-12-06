import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.window.registerCustomEditorProvider(
    "kt3k.bwBlock",
    new BlockEdit(context),
  ))
}

class BlockEdit {
  constructor(private readonly context: vscode.ExtensionContext) {}
}
