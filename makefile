run:
	mkdocs gh-deploy
	git add .
	git commit -m 'update master'
	git push origin master
	git checkout gh-pages
	rm -rf site
	git checkout master
