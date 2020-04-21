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
            entry["language"] = dir
            entry["graphics"][0]["info"]["name"] = "Overview"
            entry["graphics"][0]["info"]["src"] = dir+"/"+file
            data.append(entry)
        else:
            print(file.split(".")[-1])
print(json.dumps(data))
