from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Betting Backend Running"

@app.route("/prediction")
def prediction():
    return jsonify({
        "match": "Arsenal vs Chelsea",
        "tip": "Over 2.5",
        "odds": 1.85
    })

app.run(host="0.0.0.0", port=5000)

