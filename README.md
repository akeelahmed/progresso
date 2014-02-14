# Progres.so

[Progres.so](http://progres.so) is a Way to manage tasks. It is a clone of my favorite app,
[Trello](https://trello.com/). It is responsive, and should work on most devices.

Create boards, add lists to the boards, and add cards to the lists.
Drag the lists and cards around to rearrange them, click things to edit them.

## Tech

Progresso is a Backbone.js app built on top of a Rails API.
It uses GitHub OAuth for login, jQuery UI for dragging stuff around,
and has stylesheets loosely based off of the Skeleton framework.

## Take a Look...
* at app/assets/javascripts/_parent.js for my parent view class. Which was inspired
by Backbone Marionette.

* at app/assets/javascripts/routers/board_router.js for my swapping router.
