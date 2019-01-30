run:
	mkdocs gh-deploy
	git add .
	git commit -m 'Update master'
	git push origin master
	git checkout gh-pages
	rm -rf site
	git checkout master
