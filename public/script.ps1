param (
    [string]$urlPath
)

# Define la ruta local
$localPath = "C:\BootDrv\YourAppName" # Ruta local en tu computadora

# Función para descargar archivos de la URL
function Get-FilesFromURL {
    param (
        [string]$url
    )
    try {
        Invoke-WebRequest -Uri $url -OutFile $destination -ErrorAction Stop
        Write-Host "Archivo descargado exitosamente desde $url" -ForegroundColor Green
    } catch {
        Write-Host "No se pudo descargar el archivo desde $url" -ForegroundColor Red
    }
}

# Comprobar si la carpeta en la URL existe
try {
    $response = Invoke-WebRequest -Uri $urlPath -Method Head -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "La carpeta en la URL existe. Procediendo con el proceso..." -ForegroundColor Green

        # Si la carpeta local existe, elimínala
        if (Test-Path -Path $localPath) {
            Remove-Item -Path $localPath -Recurse -Force
            Write-Host "Se eliminó la carpeta local existente: $localPath" -ForegroundColor Yellow
        } else {
            Write-Host "La carpeta local no existe, creando nueva carpeta..." -ForegroundColor Yellow
        }

        # Crear la carpeta local
        New-Item -ItemType Directory -Path $localPath

        # Descarga de archivos (puedes ajustar esta parte según la estructura de la URL)
        # Aquí puedes procesar el listado de archivos si la URL los provee
        $fileList = @("archivo1.txt", "archivo2.txt") # Reemplazar con lógica dinámica según la URL
        foreach ($file in $fileList) {
            $fileUrl = "$urlPath/$file"
            $destinationPath = Join-Path -Path $localPath -ChildPath $file
            Get-FilesFromURL -url $fileUrl -destination $destinationPath
        }

    } else {
        Write-Host "La carpeta en la URL no existe o no está disponible." -ForegroundColor Red
    }
} catch {
    Write-Host "Error al verificar la carpeta en la URL: $_" -ForegroundColor Red
}
