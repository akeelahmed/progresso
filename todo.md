#MVP

- [ ] Fancy up Splash page.
- [ ] Fancy up the Boards index.
- [x] Refactor to not include serialized children of Boards and Lists.
- [x] write `Board#` / `List#set_child_cardinalities`
      takes array of child IDs, sets the proper cardinalities.
      - If the attribute `child_ids` is present during save,
        call this method.
      - SQL may look like this:

```SQL
UPDATE
  lists AS l
SET
  cardinality = c.cardinality
    FROM
      (values #{values}) as c (id, cardinality)
where c.id = l.id and l.board_id = ?;
-- Where values = "(id, cardinality), (id, cardinality)"
```

- [x] When dropping card/list on board, just save the model with
      the special `ordered_child_ids` attribute.
- [ ] New List should just be a plus button.
- [ ] New List should be self contained view that handles open/close events.
- [ ] Draggable area should be more clear.
- [ ] Droppable area should be more clear.
- [ ] Move 'New Card' and 'New List' items out of their `<ul>`s so they cant be
      dropped after.
- [ ] Trying to save empty card should delete.
- [ ] Fix pointers.
- [ ] Make it clearer when things are click-to-edit.
- [ ] Make it clearer when things are in edit state.
- [ ] Add Back button to Board.
- [ ] Favicon
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

- [ ] Think about making child views thing more general to deal with heterogeneous view classes. i.e. children that aren't just list view classes.
