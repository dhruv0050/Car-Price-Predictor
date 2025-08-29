from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import util

app = Flask(__name__)
CORS(app)  
util.load_saved_artifacts()


@app.route('/get_brand_names', methods=['GET'])
def get_brand_names():
    """Endpoint to get the list of car brand names for UI dropdowns."""
    response = jsonify({
        'brands': util.get_brand_names()
    })
    return response

@app.route('/get_fuel_types', methods=['GET'])
def get_fuel_types():
    """Endpoint to get the list of fuel types."""
    response = jsonify({
        'fuel_types': util.get_fuel_types()
    })
    return response

@app.route('/get_transmission_types', methods=['GET'])
def get_transmission_types():
    """Endpoint to get the list of transmission types."""
    response = jsonify({
        'transmission_types': util.get_transmission_types()
    })
    return response

@app.route('/predict_car_price', methods=['POST'])
def predict_car_price():
    """Endpoint to predict car price based on form data."""
    try:
        brand = request.form.get('brand')
        year_str = request.form.get('year')
        fuel_type = request.form.get('fuel_type')
        transmission = request.form.get('transmission')
        km_driven_str = request.form.get('km_driven')
        owner_str = request.form.get('owner')

        required_fields = [brand, year_str, fuel_type, transmission, km_driven_str, owner_str]
        if not all(required_fields):
            return jsonify({'error': 'Missing one or more required fields'}), 400

        year = int(year_str)
        km_driven = float(km_driven_str)
        owner = int(owner_str) # The owner is already a number (1, 2, etc.)

        estimated_price = util.get_estimated_price(brand, year, fuel_type, transmission, km_driven, owner)

        response = jsonify({
            'estimated_price': estimated_price
        })

    except (ValueError, TypeError) as e:
        return jsonify({'error': f'Invalid data type for a field: {e}'}), 400

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Car Price Prediction...")
    app.run(debug=True)