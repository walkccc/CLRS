run:
	git add .
	git commit -m 'update master'
	git push origin master
	mkdocs gh-deploy
