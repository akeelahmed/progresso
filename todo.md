#MVP

- [ ] Fancy up Splash page.
- [ ] Fancy up the Boards index.
- [ ] Refactor to not include serialized children of Boards and Lists.
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

- [ ] When dropping card/list on board, just save the model with
      the special `child_ids` attribute.
- [ ] New List should just be a plus button.
- [ ] Draggable area should be more clear.
- [ ] Droppable area should be more clear.
- [ ] Move 'New Card' and 'New List' items out of their `<ul>`s so they cant be
      dropped after.
- [ ] Fix pointers.
- [ ] Make it clearer when things are click-to-edit.
- [ ] Make it clearer when things are in edit state.
- [ ] Add Back button to Board.
- [ ] Favicon
- [ ] Add guided code readings to README.
