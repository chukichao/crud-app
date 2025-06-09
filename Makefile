eslint:
	npx eslint src

prettier:
	npx prettier --write src/**/*

stylelint:
	npx stylelint "src/**/*.{css,scss,vue}"