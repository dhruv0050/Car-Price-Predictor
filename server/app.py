from flask import Flask, jsonify, request
import util

app = Flask(__name__)

@app.route('/get_brand_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['POST'])

def predict_car_price():
    kilometres_driven = float(request.form['km_driven'])
    year = int(request.form['year'])
    owner = int(request.form['owner'])
    fuel_type = request.form['fuel type']
    brand = request.form['brand']
    transmission = request.form['transmission']

    response = jsonify({
        'estimated_price': util.get_estimated_price(brand, year, fuel_type, transmission, kilometres_driven, owner)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    print("Starting Flask server of Real Estate Price Predictor")
    app.run(debug=True)