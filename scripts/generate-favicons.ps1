Add-Type -AssemblyName System.Drawing

$publicPath = (Resolve-Path (Join-Path $PSScriptRoot "..\public")).Path
$scale = 4

function New-BrandIcon {
    param(
        [int]$Size,
        [string]$Path
    )

    $renderSize = $Size * $scale
    $unitScale = $renderSize / 64.0
    $source = New-Object System.Drawing.Bitmap $renderSize, $renderSize
    $sourceGraphics = [System.Drawing.Graphics]::FromImage($source)
    $sourceGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $sourceGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $sourceGraphics.Clear([System.Drawing.ColorTranslator]::FromHtml("#652D3C"))

    $coordinates = @(
        @(14, 50), @(14, 16), @(18, 16), @(32, 39), @(46, 16), @(50, 16), @(50, 50)
    )
    $points = [System.Drawing.PointF[]]::new($coordinates.Count)

    for ($index = 0; $index -lt $coordinates.Count; $index++) {
        $points[$index] = [System.Drawing.PointF]::new(
            [single]($coordinates[$index][0] * $unitScale),
            [single]($coordinates[$index][1] * $unitScale)
        )
    }

    $letterPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#F5F0E8")), ([single](5 * $unitScale))
    $underlinePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#B77A83")), ([single](2 * $unitScale))
    $sourceGraphics.DrawLines($letterPen, $points)
    $sourceGraphics.DrawLine($letterPen, [single](8 * $unitScale), [single](13 * $unitScale), [single](26 * $unitScale), [single](13 * $unitScale))
    $sourceGraphics.DrawLine($letterPen, [single](38 * $unitScale), [single](13 * $unitScale), [single](56 * $unitScale), [single](13 * $unitScale))
    $sourceGraphics.DrawLine($letterPen, [single](8 * $unitScale), [single](52 * $unitScale), [single](20 * $unitScale), [single](52 * $unitScale))
    $sourceGraphics.DrawLine($letterPen, [single](44 * $unitScale), [single](52 * $unitScale), [single](56 * $unitScale), [single](52 * $unitScale))
    $sourceGraphics.DrawLine(
        $underlinePen,
        [single](24 * $unitScale),
        [single](57 * $unitScale),
        [single](40 * $unitScale),
        [single](57 * $unitScale)
    )

    $result = New-Object System.Drawing.Bitmap $Size, $Size
    $resultGraphics = [System.Drawing.Graphics]::FromImage($result)
    $resultGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $resultGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $resultGraphics.DrawImage($source, 0, 0, $Size, $Size)
    $result.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

    $resultGraphics.Dispose()
    $result.Dispose()
    $underlinePen.Dispose()
    $letterPen.Dispose()
    $sourceGraphics.Dispose()
    $source.Dispose()
    Write-Output "Created $Path ($Size x $Size)."
}

New-BrandIcon -Size 32 -Path (Join-Path $publicPath "favicon-32.png")
New-BrandIcon -Size 180 -Path (Join-Path $publicPath "apple-touch-icon.png")
