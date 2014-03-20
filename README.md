root
======

Example API calls
======

* http://127.0.0.1:3001/api/chapters
* http://127.0.0.1:3001/api/chapters/:chapter_name
* http://127.0.0.1:3001/api/chapters/:chapter_name/:directory

Explicit Examples
=====

* http://127.0.0.1:3001/api/chapters
* http://127.0.0.1:3001/api/chapters/template
* http://127.0.0.1:3001/api/chapters/template/users

data directory structure
======

<pre>
chapters/
└── new_york
    ├── events
    └── users
        ├── brandon.json
        └── jeremy.json
</pre>

Setup
=====

To run the app locally, run

```bash
# This will install a bunch of stuff:
script/bootstrap

# If you are editing SCSS:
cd public && grunt watch

node root.js
```
