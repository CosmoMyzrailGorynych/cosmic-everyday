# DON'T MOVE! Filled by build scripts. These three must be integers
!define VERSIONMAJOR 0
!define VERSIONMINOR 6
!define VERSIONBUILD 3

!define APPNAME "Cosmic Everyday"
!define AppExec "CosmicEveryday.exe"
!define COMPANYNAME "Cosmo Myzrail Gorynych"
!define DESCRIPTION "A short description goes here"
# These will be displayed by the "Click here for support information" link in "Add/Remove Programs"
# It is possible to use "mailto:" links in here to open the email client
!define HELPURL "https://comigo.itch.io/cosmic-everyday/community" # "Support Information" link
!define UPDATEURL "https://comigo.itch.io/cosmic-everyday/" # "Product Updates" link
!define ABOUTURL "https://comigo.itch.io/" # "Publisher" link

RequestExecutionLevel admin ;Require admin rights on NT6+ (When UAC is turned on)

InstallDir "$PROGRAMFILES\${APPNAME}"

# This will be in the installer/uninstaller's title bar
Name "${APPNAME} by ${COMPANYNAME}"
Icon ".\..\ico.ico"
outFile ".\..\..\_cosmicEverydayBuilds\CosmicEveryday_v${VERSIONMAJOR}.${VERSIONMINOR}.${VERSIONBUILD}_x86.exe"
 
!include LogicLib.nsh
 
page directory
Page instfiles
 
!macro VerifyUserIsAdmin
UserInfo::GetAccountType
pop $0
${If} $0 != "admin" ;Require admin rights on NT4+
        messageBox mb_iconstop "Administrator rights required!"
        setErrorLevel 740 ;ERROR_ELEVATION_REQUIRED
        quit
${EndIf}
!macroend
 
function .onInit
    setShellVarContext all
    !insertmacro VerifyUserIsAdmin
functionEnd
 
section "install"
    # Files for the install directory - to build the installer, these should be in the same directory as the install script (this file)
    setOutPath $INSTDIR
    # Files added here should be removed by the uninstaller (see section "uninstall")
    file /r ".\..\..\_cosmicEverydayBuilds\CosmicEveryday-${VERSIONMAJOR}.${VERSIONMINOR}.${VERSIONBUILD}-win-x86\*"
 
    # Uninstaller - See function un.onInit and section "uninstall" for configuration
    writeUninstaller "$INSTDIR\uninstall.exe"
 
    # Start Menu
    createShortCut "$SMPROGRAMS\${APPNAME}.lnk" "$INSTDIR\${AppExec}" "" "$INSTDIR\logo.ico"
 
    # Registry information for add/remove programs
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "DisplayName" "${COMPANYNAME} - ${APPNAME} - ${DESCRIPTION}"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "QuietUninstallString" "$\"$INSTDIR\uninstall.exe$\" /S"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "InstallLocation" "$\"$INSTDIR$\""
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "DisplayIcon" "$\"$INSTDIR\logo.ico$\""
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "Publisher" "$\"${COMPANYNAME}$\""
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "HelpLink" "$\"${HELPURL}$\""
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "URLUpdateInfo" "$\"${UPDATEURL}$\""
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "URLInfoAbout" "$\"${ABOUTURL}$\""
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "DisplayVersion" "$\"${VERSIONMAJOR}.${VERSIONMINOR}.${VERSIONBUILD}$\""
    WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "VersionMajor" ${VERSIONMAJOR}
    WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "VersionMinor" ${VERSIONMINOR}
    # There is no option for modifying or repairing the install
    WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "NoModify" 1
    WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}" "NoRepair" 1
sectionEnd
 
# Uninstaller
 
function un.onInit
    SetShellVarContext all
 
    #Verify the uninstaller - last chance to back out
    MessageBox MB_OKCANCEL "Permanantly remove ${APPNAME}?" IDOK next
    Abort
    next:
    !insertmacro VerifyUserIsAdmin
    ExecShell "open" "https://goo.gl/forms/lPo7s3zHxicETNZR2" SW_SHOWNORMAL
functionEnd
 
section "uninstall"
    # Remove Start Menu launcher
    delete "$SMPROGRAMS\${APPNAME}.lnk"
    # Try to remove the Start Menu folder - this will only happen if it is empty
    rmDir "$SMPROGRAMS\${COMPANYNAME}"
 
    # Remove files
    rmDir /R $INSTDIR
 
    # Remove uninstaller information from the registry
    DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME} by ${COMPANYNAME}"
sectionEnd