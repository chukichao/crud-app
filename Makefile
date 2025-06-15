eslint:
	npx eslint src/

typescript:
	npx vue-tsc -b

prettier:
	npx prettier --write src/

stylelint:
	npx stylelint --fix "src/*.{css,scss,vue}"