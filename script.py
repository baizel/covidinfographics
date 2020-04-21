import os
import json

data = []
for dir in os.listdir("graphics/"):
    for file in os.listdir("graphics/" + dir):
        if file.endswith("png") or file.endswith("PNG"):
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
            path = "graphics"+"/"+dir+"/"+file
            path.strip()
            os.rename("graphics"+"/"+dir+"/"+file,path)
            entry["language"] = dir
            entry["graphics"][0]["info"]["name"] = "Overview"
            entry["graphics"][0]["info"]["src"] = path
            data.append(entry)
            print(path)
        else:
            print(file.split(".")[-1])
print(json.dumps(data))
