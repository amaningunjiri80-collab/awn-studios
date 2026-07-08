Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd.exe /c start /B C:\Users\valer\AppData\Local\node\node-v24.18.0-win-x64\npm.cmd run dev --prefix ""C:\Users\valer\OneDrive\Documents\New OpenCode Project\awn-studios""", 0, False
WScript.Sleep 10000
WshShell.Run "cmd.exe /c start /B C:\Users\valer\AppData\Local\cloudflared.exe tunnel --url http://localhost:3000", 0, False
