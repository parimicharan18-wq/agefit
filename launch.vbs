Set WshShell = CreateObject("WScript.Shell")
strDir = WshShell.CurrentDirectory

' Run start-app.bat completely hidden (0 = hide window)
WshShell.Run """" & strDir & "\start-app.bat""", 0, False
