import fnmatch
import os

dir = "./"
extension = "*.md"

subdir = [x[0] for x in os.walk(dir)]

for _ in subdir:
    for file in os.listdir(_):
        if fnmatch.fnmatch(file, extension):
            filedir = _ + '/' + file

            # lines = open(filedir).readlines()
            # open(filedir, 'w').writelines(lines[15:])
            
            with open(filedir, 'r') as readfile:
                data = readfile.read()
                
                kramed = 'markup: kramed'
                pandoc = 'markup: pandoc'
                data = data.replace(kramed, pandoc)

                escape_us = '\\_'
                us = '_'
                data = data.replace(escape_us, us)

                escape_star = '\\*'
                star = '*'
                data = data.replace(escape_star, star)

                escape_left = '\\{'
                left = '{'
                data = data.replace(escape_left, left)

                escape_right = '\\}'
                right = '}'
                data = data.replace(escape_right, right)

            with open(filedir, 'w') as writefile:
                writefile.write(data)
            
            # with open(filedir, 'r+') as writefile:
            #     content = writefile.read()
            #     writefile.seek(0, 0)
            #     writefile.write('---\ntitle: "' + file.strip(".md") + '"\n---\n' + content)

