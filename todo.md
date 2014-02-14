#MVP
- [ ] Add guided code readings to README.
- [ ] Better test coverage.
- [ ] Archive Cards, lists, boards.

- [ ] Card Modals. Please for the love of god, card modals.
- [ ] Refactor new card view to be reminiscent of new list view.


- [ ] Move nested collections i.e. board.get('cards') to a lazy method: board.cards()
```
      list.cards = function() {
           this._cards || this._cards = new PRO.Collections.Cards([])
        }
```
   - NB: inside of list.parse, I'll have to:
```
    list.cards().set(json.cards, { parse: true })
```
