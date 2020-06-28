# Cosmic Everyday's Changelog

## v0.6.1 — Smashing Linux bugs + Import/Export feature

### Improvements

* Some error messages became more human-friendly, and notifications became more talkative.

### New features

* Importing and exporting your data is now available. Search for export tools in the Settings panel.
* Now you can tell Cosmic Everyday to launch minimised. This option can be found in the Settings panel.

### Bug Fixes

* **Kanbans**: Tasks in new cards can be added again.
* **Kanbans**: Imported wallpapers now work correctly on Linux/Mac.
* **Painter**: Saved sketch now does load on Linux/Mac.

## v0.6.0 — Docker & Updater for non-itch.io users

### Improvements

* Better sounds thanks to [loubitek54](https://loubitek54.itch.io/)

### New features

* Introducing **Docker** – it allows you to embed web pages into Cosmic Everyday, providing quick access and better focus while working;
* **Kanbans**: Card filter added.

### Bug Fixes

* **Jumbles**: Fixed a bug when dragging a new jumble's wallpaper with mouse resulted into adding an image as a jumble item, but not as a wallpaper;
* linux-specific startup bugs that prevented linux users to update to v0.5.2 were *fixed*, and now they can upgrade to 0.5.2 and higher.

BTW I added a simple update notifier for non-itch.io users.

## v0.5.2 — Small improvements and fixes

This small release contains general improvements to Cosmic Everyday, making it more polished and stable.

### Improvements

* **Homepage:** More hints about Jumbles
* The app can now be reopened with quick launch bar on Windows/Linux and a task bar on Mac
* From now, if some phrase is not present in the current language file, it will fallback to English language
* Cosmic Everyday now switches languages on-the-fly, without delays and dirty reloads that led to errors.
* Now Cosmic Everyday will ask new users to activate auto-launch

### Bug Fixes

* Clicking "Open Cosmic Everyday" in tray's context menu now actually opens Cosmic Everyday

### Misc

* Removed an importer for legacy DB from Help section

## v0.5.1 — Task creation bugfix and mini-tasks improvement

This update is a quick bugfix, but it also comes with a little handy feature!

### Bug fixes

* **Notebooks:** Adding new tasks to the card works again (I definitely need to write more tests :/ )

### New features

* **Homepage:** The mini-tasks widget now has two additional buttons:
    * the first one allows to delete all the tasks in the lists;
    * the second one allows to uncheck all items. Very handy for everyday tasks!

![The mini-tasks widget](https://img.itch.zone/aW1nLzc3NzQzMy5qcGc=/original/umTFCn.jpg)

If you wonder how to enable such widget on your homepage, go to the settings panel (a little gear at the bottom-left corner) and move 'Quick Tasks' to the right column:

![Quick Tasks](https://img.itch.zone/aW1nLzc3NzQzNi5wbmc=/original/Nf%2F4lG.png)

Happy coding!

## v0.5.0 — Quick tasks widget & Customization

Today a first itch.io update for Cosmic Everyday comes, with these changes:

### New features

* Now you can disable the components you don't use in the settings panel
* New homepage widget — Quick tasks for everyday checklists and just the tasks that need to be in sight
* Now you can customize which widgets are shown on your homepage and in which order they are place

### Cosmetic improvements

* Now the app can squeeze down to 480 pixels wide, meaning that now it can fit into any desktop layout!

![Squeezy image](https://img.itch.zone/aW1nLzc3NDc2OS5naWY=/original/fARflR.gif)

### Bug fixes

* **Notebooks:** Occasionally deleted icons for reordering tasks in a card are now back

## v0.4.0 — Moving to itch.io & Kanban improvements

From now, Cosmic Everyday is hosted on itch.io too!

### New features

* **Kanbans:** attached files now have a small icon for copying its embed code – you can put it directly into card's text editor!
* **Kanbans:** you can now drop files into a card by dragging them from your file manager;
* **Kanbans:** cards' text editor got a toolbar with special symbols;
* **Kanbans:** you can now copy card's title from its context menu;
* you can set reader's speed in Settings panel.

### Bug fixes

* The menu on the left can now be scrolled, if something doesn't fit in its size;
* Added welcome gifs for English language.
