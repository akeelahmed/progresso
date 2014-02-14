#MVP
- [x] Get rid of new views in board index.
- [x] Add Plus Button to header.
- [x] Write Modal View class.
- [x] Write add new board Modal view class.
- [x] Pressing Plus button should open new board modal.
- [x] submitting new board modal should open new board.
- [ ] Refactor new card view to be reminiscent of new list view.

- [ ] Editing existing card to have empty name should be the same as canceling editing.

- [ ] Add the Pencil button to things that are editable
      Show pencil when hovering over editable thing.
      <i class="fa fa-pencil"></i>

- [ ] Add check and X to anything that's being edited.
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
