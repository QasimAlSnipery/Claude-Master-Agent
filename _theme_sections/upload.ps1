$STORE = '3rnv2d-i3.myshopify.com'
$THEME_ID = 'gid://shopify/OnlineStoreTheme/139682218059'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

$mutContent = @"
mutation ThemeFilesUpsert(`$themeId: ID!, `$files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
  themeFilesUpsert(themeId: `$themeId, files: `$files) {
    upsertedThemeFiles { filename }
    userErrors { field message }
  }
}
"@
$mutFile = "$dir\_mut.graphql"
[System.IO.File]::WriteAllText($mutFile, $mutContent, [System.Text.Encoding]::UTF8)

$files = @("romira-timeline","romira-nerve-stages","romira-comparison","romira-guarantee-banner")

foreach ($f in $files) {
    Write-Host "Uploading sections/$f.liquid..."

    $content = [System.IO.File]::ReadAllText("$dir\$f.liquid", [System.Text.Encoding]::UTF8)

    $varsObj = @{
        themeId = $THEME_ID
        files = @(@{
            filename = "sections/$f.liquid"
            body = @{ type = "TEXT"; value = $content }
        })
    }
    $vars = $varsObj | ConvertTo-Json -Depth 10 -Compress

    Write-Host "  JSON size: $($vars.Length) chars"

    # Use & with splatted args — PowerShell passes each as a separate argument,
    # bypassing both cmd.exe AND PowerShell's own parser for the value content
    $argList = @('store','execute','--store',$STORE,'--query-file',$mutFile,'--variables',$vars,'--allow-mutations')

    $result = & shopify @argList 2>&1
    Write-Host $result
    Write-Host "---"
}

Write-Host "All done."
