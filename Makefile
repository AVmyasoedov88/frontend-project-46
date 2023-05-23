install:
	npm ci

lint:
	npx eslint 


rec:
	asciinema rec

 publish:
	npm publish --dry-run

test:
	npm test