from flask import Flask, render_template, request

import tensorflow as tf
import cv2
from PIL import Image
import numpy as np
import sys
import json
import ast

# app = Flask (__name__)

model = tf.keras.models.load_model("./3F5LCone.keras")

data_to_pass_back = "Send this to node process."

#String
#input = sys.argv[1]
#output = data_to_pass_back
#print(output)

#list
input = ast.literal_eval(sys.argv[1])
output = input
output.append(data_to_pass_back)
print(json.dumps(output))

#dict
input = ast.literal_eval(sys.argv[1])
output = input
output['data_returned'] = data_to_pass_back

sys.stdout.flush()

@app.route('/', methods=['GET'])
def hello_world():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def predict():
    imagefile = request.files['imagefile']
    image_path = "./scanImages/" + imagefile.filename
    imagefile.save(image_path)

    #LOAD MODEL AND PREDICT
    image = cv2.imread("C:/Users/holsh/Documents/GitHub/hackathon-2024-HacksAI/hackathon-2024-HacksAI/Website Files/scanImages/" + imagefile.filename)
    image = Image.fromarray(image, 'RGB')
    image = image.resize((128, 128))

    l = []
    l.append(image)
    pred = model.predict(np.array([image]))
    print(pred)

    return render_template('index.html', prediction=pred)

if __name__ == '__main__':
    app.run(port=3000, debug=True)