#MVP
- [ ] Get rid of new views in board index.
- [ ] New List should be self contained view that handles open/close events.
- [ ] Move 'New Card' and 'New List' items out of their `<ul>`s so they cant be
      dropped after.
- [ ] Trying to save empty card should delete.
- [ ] Add the Pencil to things that are editable
      <i class="fa fa-pencil"></i>
- [ ] Add check and X to anything that's editable.
      <i class="fa fa-check"></i>
      <i class="fa fa-times"></i>

- [ ] Add guided code readings to README.

- [ ] Move nested collections i.e. board.get('cards') to a lazy method: board.cards()
```
      list.cards = function() {
           this._cards || this._cards = new PRO.Collections.Cards([])
        }
```
   - inside of list.parse, I'll have to:
```
    list.cards().set(json.cards, { parse: true })
```

- [ ] Move the managing of edit views out of parent classes and into subviews.
BoardView should have a EditableNameView which has two states, open and close.
When open, render should show the form, when closed: render should show the text.
when click on name, it changes state to open, and calls render.

add list view will also be a similar editable view, which has two states, one as form and one as text(i.e. the add button). We will then have to deal with dropping in the new lists before the add list element.
