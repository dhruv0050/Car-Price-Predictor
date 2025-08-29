from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_brand_names', methods=['GET'])
def get_brand_names():
    """Endpoint to get the list of car brand names for UI dropdowns."""
    response = jsonify({
        'brands': util.get_brand_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get_fuel_types', methods=['GET'])
def get_fuel_types():
    """Endpoint to get the list of fuel types."""
    response = jsonify({
        'fuel_types': util.get_fuel_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get_transmission_types', methods=['GET'])
def get_transmission_types():
    """Endpoint to get the list of transmission types."""
    response = jsonify({
        'transmission_types': util.get_transmission_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_car_price', methods=['POST'])
def predict_car_price():
    """Endpoint to predict car price based on form data."""
    try:
        # Get all form data first
        brand = request.form.get('brand')
        year_str = request.form.get('year')
        fuel_type = request.form.get('fuel_type')
        transmission = request.form.get('transmission')
        km_driven = request.form.get('km_driven')
        owner_str = request.form.get('owner')

        # **NEW**: Check if any of the required fields are missing
        required_fields = [brand, year_str, fuel_type, transmission, km_driven, owner_str]
        if not all(required_fields):
            # If any field is None or empty, return an error
            return jsonify({'error': 'Missing one or more required fields'}), 400

        # Now that we know the fields exist, we can safely convert them
        year = int(year_str)
        km_driven = float(km_driven)
        owner = int(owner_str)

        estimated_price = util.get_estimated_price(brand, year, fuel_type, transmission, km_driven, owner)

        # On success, prepare a success response
        response = jsonify({
            'estimated_price': estimated_price
        })

    except (ValueError, TypeError) as e:
        # Catches errors from int() or float() if data is not a number
        response = jsonify({'error': f'Invalid data type for a field: {e}'})
        response.status_code = 400

    # Add the CORS header to the response
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server for Used Car Price Prediction...")
    app.run()

