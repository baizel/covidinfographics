#!/usr/bin/python3
import os
import json
from shutil import move

rootDir = "graphics"
forAutoGen = ["Languages", "local_resources"]


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


data = {
    "Languages": [],
    "local_resources": [],
    "Public_Advice": []
}

for paths in forAutoGen:
    toProcPath = os.path.join(rootDir, paths)
    for lvl1Dir in os.listdir(toProcPath):
        entry = {"language": lvl1Dir, "graphics": []}
        for lvl2Dir in os.listdir(os.path.join(toProcPath, lvl1Dir)):
            dirOrFilePath = os.path.join(toProcPath, lvl1Dir, lvl2Dir)
            if os.path.isdir(dirOrFilePath):
                for file in os.listdir(dirOrFilePath):
                    if (len(os.listdir(dirOrFilePath))) > 1:
                        raise Exception("Too many files in dir " + dirOrFilePath)
                    if file.endswith("png"):
                        entry["graphics"].append({"info": {"name": str.title(lvl2Dir), "src": os.path.join(dirOrFilePath, file)}})
                    elif file.endswith("PNG"):
                        reNamed = renameToPng(os.path.join(dirOrFilePath, file))
                        entry["graphics"].append({"info": {"name": str.title(lvl2Dir), "src": reNamed}})
        if len(entry["graphics"]) != 0:
            data[paths].append(entry)

t = sorted(data["Languages"], key=lambda k: k['language'])
data["Languages"] = t
print(json.dumps(data))
