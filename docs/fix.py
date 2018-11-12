import fnmatch
import os
import re
from bs4 import BeautifulSoup

dir = "./"
extension = "*.md"

subdir = [x[0] for x in os.walk(dir)]

oldContent = "```"
newContent = ""

for _ in subdir:
    for file in os.listdir(_):
        if fnmatch.fnmatch(file, extension):
            filedir = _ + '/' + file

            with open(filedir, 'r') as f:
                data = f.read()
                # data = data.replace(oldContent, newContent)

                # data = f.readlines()
                # data = data[4:]
                # data = ''.join(data)

                if oldContent in data:
                    print(file)
               
            # with open(filedir, 'w') as f:
                # f.write(data)

                # soup = BeautifulSoup(data)

                # for a in soup.find_all('div'):
                    # a.string = a.string.replace('\\_', '_')

            # with open(filedir, 'w') as f:
                # f.write(str(soup))
                # f.write(data)