#MVP
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

- [ ] Add ability to Archive Cards, lists, boards.
  - DB Migration to add 'archived' attr to lists, boards.
  - no need for API (just update the attr)
  - add button to board view which marks as archived, and saves.

- [ ] Add guided code readings to README.

- [ ] Better test coverage.
  - Integration tests for the API
  - Test some of backbone. http://blog.pamelafox.org/2013/06/testing-backbone-frontends.html

- [ ] Card Modals. Please for the love of god, card modals.
- [ ] Refactor new card view to be reminiscent of new list view.
