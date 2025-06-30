on run argv
    try
        set promptText to item 1 of argv
        set modelName to ""
        
        if (count of argv) > 1 then
            set modelName to item 2 of argv
        end if
        
        set appPath to "/Users/superabundant/Github/t3chat-macos/T3Chat-darwin-x64/T3Chat.app"
        
        tell application "System Events"
            set appRunning to (name of processes) contains "T3Chat"
        end tell
        
        if appRunning then
            tell application "T3Chat"
                activate
            end tell
            
            delay 1
            
            tell application "System Events"
                tell process "T3Chat"
                    key code 15 using {command down}
                    delay 0.5
                    keystroke promptText
                    delay 0.3
                    key code 36
                end tell
            end tell
        else
            do shell script "open '" & appPath & "'"
            
            delay 2
            
            tell application "System Events"
                tell process "T3Chat"
                    keystroke promptText
                    delay 0.3
                    key code 36
                end tell
            end tell
        end if
    on error errMsg
        display dialog "Error: " & errMsg
    end try
end run

on urlencode(str)
    set str to str as string
    set encoded to ""
    repeat with i from 1 to length of str
        set c to character i of str
        if c is in "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~" then
            set encoded to encoded & c
        else
            set encoded to encoded & "%" & my hex(id of c)
        end if
    end repeat
    return encoded
end urlencode

on hex(n)
    set hex_chars to "0123456789ABCDEF"
    set high_nibble to (n div 16) + 1
    set low_nibble to (n mod 16) + 1
    return (character high_nibble of hex_chars) & (character low_nibble of hex_chars)
end hex