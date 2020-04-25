import os
import json
from shutil import move


def renameToPng(path):
    rt = path
    if path.endswith("PNG"):
        fileName = path.split(".")[0]
        move(fileName + ".PNG", fileName + ".png")
        print("renamed file ", path)
        rt = fileName + ".png"
    split = rt.split("/")
    orgFile = split[-1]
    striped = split[-1].replace(" ", "")
    split.pop(-1)
    move("/".join(split + [orgFile]), "/".join(split + [striped]))
    return "/".join(split + [striped])


data = []
for dir in os.listdir("graphics/"):
    entry = {"language": dir, "graphics": []}
    for subDir in os.listdir("graphics/" + dir):
        if os.path.isdir("graphics/" + dir + "/" + subDir):
            for file in os.listdir("graphics/" + dir + "/" + subDir):
                if file.endswith("png") or file.endswith("PNG"):
                    reNamed = renameToPng("graphics" + "/" + dir + "/" + subDir + "/" + file)
                    entry["graphics"].append({"info": {"name": subDir, "src": reNamed, "translation": ""}})
    if len(entry["graphics"]) != 0:
        data.append(entry)

t = sorted(data, key=lambda k: k['language'])
# print(t)
print(json.dumps(t))
