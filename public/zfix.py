import fnmatch
import os
import re

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

                old = '$$\\begin{aligned}'                
                new = '$$\n\\begin{aligned}'

                if old in data:
                    print(file)
                
                data = data.replace(old, new)

                # pandoc = 'markup: pandoc\n'
                # blank = ''
                # data = data.replace(pandoc, blank)

                # a = '\\begin{align}'
                # aa = '<div>\n$$\\begin{aligned}'
                # data = data.replace(a, aa)

                # b = '\\end{align}'
                # bb = '\\end{aligned}\n$$\n</div>'
                # data = data.replace(b, bb)

                # c = '\\begin{equation}'
                # cc = '<div>\n$$'
                # data = data.replace(c, cc)

                # d = '\\end{equation}'
                # dd = '$$\n</div>'
                # data = data.replace(d, dd)

                # mbox = '\\mbox'                
                # text = '\\text'
                # data = data.replace(mbox, text)

                # a2 = '\\begin{array}'
                # aa2 = '<div>\n$$\\begin{array}'
                # data = data.replace(a2, aa2)

                # b2 = '\\end{array}'
                # bb2 = '\\end{array}\n$$\n</div>'
                # data = data.replace(b2, bb2)

                # hline = '\hline\n'
                # data = data.replace(hline, '')



            with open(filedir, 'w') as writefile:
                writefile.write(data)
            
            # with open(filedir, 'r+') as writefile:
            #     content = writefile.read()
            #     writefile.seek(0, 0)
            #     writefile.write('---\ntitle: "' + file.strip(".md") + '"\n---\n' + content)

