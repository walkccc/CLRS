run:
	mkdocs gh-deploy
	git add .
	git commit -m 'update master'
	git push origin master