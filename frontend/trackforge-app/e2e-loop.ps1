$start = Get-Date
$end = $start.AddHours(2)
$iteration = 0
$failures = 0
$log = Join-Path $PSScriptRoot "test-results" "e2e-loop.log"
New-Item -ItemType Directory -Path (Split-Path $log) -ErrorAction SilentlyContinue | Out-Null

while ((Get-Date) -lt $end) {
    $iteration++
    $now = Get-Date
    Add-Content -Path $log -Value "[$now] Iteration $iteration started"

    try {
        $proc = Start-Process -FilePath "npx" -ArgumentList "playwright", "test" -NoNewWindow -PassThru -Wait -WorkingDirectory "$PSScriptRoot"
        if ($proc.ExitCode -ne 0) {
            $failures++
            Add-Content -Path $log -Value "[$now] Iteration $iteration FAILED (exit $($proc.ExitCode))"
        } else {
            Add-Content -Path $log -Value "[$now] Iteration $iteration PASSED"
        }
    } catch {
        $failures++
        Add-Content -Path $log -Value "[$now] Iteration $iteration ERROR: $_"
    }

    # Stop if 2 hours elapsed, otherwise wait 30s before next run
    if ((Get-Date) -ge $end) { break }
    Start-Sleep -Seconds 30
}

Add-Content -Path $log -Value "[$now] 2-hour loop completed. Iterations: $iteration, Failures: $failures"
Write-Output "Loop complete. Iterations: $iteration, Failures: $failures"
