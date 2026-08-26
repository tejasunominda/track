$start = Get-Date
$end = $start.AddHours(2)
$iteration = 0
$failures = 0
$log = Join-Path $PSScriptRoot "test-results\e2e-loop.log"
$resultsDir = Split-Path $log -Parent
New-Item -ItemType Directory -Path $resultsDir -ErrorAction SilentlyContinue | Out-Null

function Write-Log($message) {
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $log -Value "[$ts] $message"
    Write-Output "[$ts] $message"
}

Write-Log "2-hour loop starting"

while ((Get-Date) -lt $end) {
    $iteration++
    Write-Log "Iteration $iteration started"

    try {
        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = "cmd.exe"
        $psi.Arguments = "/c npx playwright test"
        $psi.WorkingDirectory = $PSScriptRoot
        $psi.UseShellExecute = $false
        $psi.RedirectStandardOutput = $true
        $psi.RedirectStandardError = $true
        $psi.CreateNoWindow = $true

        $proc = [System.Diagnostics.Process]::Start($psi)
        if ($null -eq $proc) {
            throw "Could not start process"
        }
        $proc.WaitForExit()

        if ($proc.ExitCode -ne 0) {
            $failures++
            Write-Log "Iteration $iteration FAILED (exit $($proc.ExitCode))"
        } else {
            Write-Log "Iteration $iteration PASSED"
        }

        $proc.StandardOutput.ReadToEnd() | ForEach-Object { Write-Log "OUT: $_" }
        $proc.StandardError.ReadToEnd() | ForEach-Object { Write-Log "ERR: $_" }
    } catch {
        $failures++
        Write-Log "Iteration $iteration ERROR: $_"
    }

    if ((Get-Date) -ge $end) { break }
    Start-Sleep -Seconds 30
}

Write-Log "2-hour loop completed. Iterations: $iteration, Failures: $failures"
