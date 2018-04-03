import fnmatch
import os
import re
from bs4 import BeautifulSoup

dir = "./"
extension = "*.md"

subdir = [x[0] for x in os.walk(dir)]

for _ in subdir:
    for file in os.listdir(_):
        if fnmatch.fnmatch(file, extension):
            filedir = _ + '/' + file

            with open(filedir, 'r') as readfile:
                data = readfile.read()
                if '\\tag' in data:
                    print(file)
                # data = data.replace('&lt;', '<')

                # soup = BeautifulSoup(data)

                # for a in soup.find_all('div'):
                #     a.string = a.string.replace('\\_', '_')

            # with open(filedir, 'w') as writefile:
                # writefile.write(str(soup))
                # writefile.write(data)
