import os
import json
from shutil import move


def renameToPng(path):
    if path.endswith("PNG"):
        fileName = path.split(".")[0]
        move(fileName + ".PNG", fileName + ".png")
        print("renamed file ", path)
        return fileName + ".png"
    return file


data = []
for dir in os.listdir("graphics/"):
    for subDir in os.listdir("graphics/" + dir):
        if os.path.isdir("graphics/" + dir + "/" + subDir):
            for file in os.listdir("graphics/" + dir + "/" + subDir):
                if file.endswith("png") or file.endswith("PNG"):
                    reNamed = renameToPng("graphics" + "/" + dir + "/" + subDir + "/" + file)
                    entry = {"language": "",
                             "graphics": [
                                 {
                                     "info": {
                                         "name": "",
                                         "translation": "",
                                         "src": ""
                                     }
                                 }
                             ]}
                    path = "graphics" + "/" + dir + "/" + subDir + "/" + reNamed
                    #             path.strip()
                    #             os.rename("graphics"+"/"+dir+"/"+file,path)
                    entry["language"] = dir
                    entry["graphics"][0]["info"]["name"] = subDir
                    entry["graphics"][0]["info"]["src"] = path
                    data.append(entry)

t = sorted(data, key=lambda k: k['language'])
# print(t)
print(json.dumps(t))
