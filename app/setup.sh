#!/bin/bash

# please make sure this file is marked as an executable, ok?

home_local=$HOME/.local/share
icon_dir=$home_local/icons/hicolor/64x64/apps

myapp_desktop=$home_local/applications/CosmicEveryday.desktop
myapp_dir=$PWD
myapp=$myapp_dir/CosmicEveryday
myapp_icon=$myapp_dir/data/CosmicEveryday.png

echo "[Desktop Entry]" > $myapp_desktop
echo "Name=Cosmic Everyday" >> $myapp_desktop
echo "GenericName=Organizer" >> $myapp_desktop
echo "Comment=A personal organizer with superpowers" >> $myapp_desktop
echo "Exec=$myapp" >> $myapp_desktop
echo "Icon=CosmicEveryday.png" >> $myapp_desktop
echo "Terminal=false" >> $myapp_desktop
echo "Type=Application" >> $myapp_desktop
echo "Categories=Office;Development" >> $myapp_desktop

chmod +x $myapp_desktop
chmod +x $myapp

GREEN='\033[0;32m'
NC='\033[0m' # No Color
BOLD=$(tput bold)
NORMAL=$(tput sgr0)

mkdir -p "$icon_dir"
cp "$myapp_icon" "$icon_dir"
echo ""
echo ""
echo "  :ysyddddmmmmmmdmmmdddddddddddddddddddddhhysos/"
echo "  .+dddyo+++++++++++++++++++++++++++++++/+ohhy/-"
echo "  -ddh-\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`.syy."
echo "  +dd+\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`/yy:"
echo "  +dd+\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`.:+/.\`\`\`\`\`\`\`\`\`\`\`\`\`/ss:"
echo "  +dd+\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`-/syyyy+\`\`\`\`\`\`\`\`\`\`\`  :ss:"
echo "  +dd+\`\`\`\`\`\`\`\`\`\`\`\`\`.:+yyyyyo/.\`\`\`\`\`-:-\`\`\`   :ss:"
echo "  +mm+\`\`\`\`\`\`\`\`\`\`-/oyyyys+:.\`\`\`\`.:/oooo:\`\`   /yy:"
echo "  +dd+\`\`\`\`\`\`.:+syyyyo/-\`\`\`\`\`-/+oooo+:.\`\`    /yy:"
echo "  +dd+\`\`\`-/oyyyys+:.\`\`\`\`.:/ooooo/-\`\`\`\`\`\`    /yy/"
echo "  +dd+\`\`/yyyyo/-\`\`\`\`\`-:+oooo+:.\`\`\`\`\`.\`      /hh/"
echo "  /dd+\`\`./+:.\`\`\`\`.-/ooooo/:.\`\`\`\`./sddh.     /hh/"
echo "  /hh+\`\`\`\`\`\`\`\`\`\`/oooo+:-\`\`\`\`\`:ohddddh+\`     /dd/"
echo "  /hh/\`\`\`\`\`\`\`\`\`\`.//:.\`\`\`\`./sddddds/.        +dd+"
echo "  /yy/\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`:ohddddho:\`           +dd+"
echo "  /yy/\`\`\`\`\`\`\`\`\`\`\`\`./sddddds/.               +mm+"
echo "  :yy/\`\`\`\`\`\`\`\`\`\`+yddddho:\`                  +mm+"
echo "  :yy/\`\`\`\`\`\`  \`\`hddy/.                      +mm+"
echo "  :sy/          \`.\`                         +md+"
echo "  :yy/                                      odd/"
echo "   oyy+.\`                                 -oddy\`"
echo "    /yhhhhhhdddddddddmmmmmmmmmmmmmmmmmdmddddh+  "
echo "      .://////+++++++++++++++++++++++++++/:.   \` "
echo ""
echo ""
echo -e "${GREEN}${BOLD}I've just created a shortcut in your app directory.${NORMAL}${NC}\nYou can find it in the ${BOLD}\"Office\"${NORMAL} category."
echo ""
echo ""