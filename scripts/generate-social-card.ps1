Add-Type -AssemblyName System.Drawing

$outputPath = Join-Path (Resolve-Path (Join-Path $PSScriptRoot "..\public")).Path "social-card.png"
$bitmap = New-Object System.Drawing.Bitmap 1200, 630
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$background = [System.Drawing.Color]::FromArgb(245, 240, 232)
$foreground = [System.Drawing.Color]::FromArgb(41, 33, 38)
$muted = [System.Drawing.Color]::FromArgb(102, 92, 96)
$accent = [System.Drawing.Color]::FromArgb(101, 45, 60)
$rose = [System.Drawing.Color]::FromArgb(183, 122, 131)
$rule = [System.Drawing.Color]::FromArgb(222, 212, 208)
$graphics.Clear($background)

$foregroundBrush = New-Object System.Drawing.SolidBrush $foreground
$mutedBrush = New-Object System.Drawing.SolidBrush $muted
$accentBrush = New-Object System.Drawing.SolidBrush $accent
$rulePen = New-Object System.Drawing.Pen $rule, 1
$accentPen = New-Object System.Drawing.Pen $rose, 3
$labelFont = New-Object System.Drawing.Font "Arial", 15, ([System.Drawing.FontStyle]::Bold)
$displayFont = New-Object System.Drawing.Font "Georgia", 57, ([System.Drawing.FontStyle]::Regular)
$roleFont = New-Object System.Drawing.Font "Arial", 24, ([System.Drawing.FontStyle]::Regular)
$stackFont = New-Object System.Drawing.Font "Arial", 17, ([System.Drawing.FontStyle]::Regular)

$graphics.DrawRectangle($rulePen, 42, 42, 1116, 546)
$graphics.DrawLine($accentPen, 88, 120, 132, 120)
$graphics.DrawString("MAHENOOR SHAIKH", $labelFont, $mutedBrush, 88, 78)
$graphics.DrawString("Full Stack", $displayFont, $foregroundBrush, 84, 182)
$graphics.DrawString("Developer", $displayFont, $foregroundBrush, 84, 256)
$graphics.DrawLine($rulePen, 88, 390, 1112, 390)
$graphics.DrawString("React.js  |  Node.js  |  Express.js", $roleFont, $foregroundBrush, 88, 430)
$graphics.DrawString("MySQL  |  MongoDB  |  REST APIs", $stackFont, $mutedBrush, 90, 488)
$graphics.DrawString("NAVSARI, INDIA", $labelFont, $accentBrush, 88, 544)

$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$labelFont.Dispose()
$displayFont.Dispose()
$roleFont.Dispose()
$stackFont.Dispose()
$foregroundBrush.Dispose()
$mutedBrush.Dispose()
$accentBrush.Dispose()
$rulePen.Dispose()
$accentPen.Dispose()
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Created $outputPath (1200 x 630)."
