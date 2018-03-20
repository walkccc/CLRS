gulp.task('compile-md', function() {
    gulp.src('_content/**/*.{md,html}')
        // extract front matter as a string
        .pipe(data(function(file) {
          var contents = file.contents.toString();
          var content = contents.replace(/(---[\s\S]*?\n---\n)/m, function($1) {
            file.frontMatter = $1;
            return '';
          });
  
          var tweetUrls = content.match(/(https?:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/([0-9]+)\/?)/g);
  
          // convert all tweet urls into tweet cards
          if (tweetUrls !== null) {
            for (var url of tweetUrls) {
              var id = /\/([0-9]+)\/?/g.exec(url)[1];
              var res = request('GET', 'https://api.twitter.com/1/statuses/oembed.json?id=' + id);
  
              var tweetCard = JSON.parse(res.getBody('utf8')).html;
              content = content.replace(url, tweetCard);
            }
          }
  
          file.contents = new Buffer(content);
        }))
  
        // convert markdown content into html (except for the front matter)
        .pipe(kramdown())
  
        // insert the extracted front matter at the head of the converted html
        .pipe(wrapper({ header: function(file){ return file.frontMatter + '\n'; } }))
  
        .pipe(gulp.dest('content/'));
  });