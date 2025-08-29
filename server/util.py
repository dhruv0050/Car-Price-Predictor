import pickle
import json
import numpy as np
import pandas as pd

# Global variables to hold model and column information
__brands = None
__fuel_types = None
__transmissions = None
__data_columns = None
__model = None
__scaler = None

def get_estimated_price(brand, year, fuel_type, transmission, km_driven, owner):
    """
    Predicts the car price. The 'owner' parameter is now an integer.
    """
    # Construct the correct one-hot encoded column names from user input
    brand_col = "brand_" + brand
    fuel_col = "fuel_" + fuel_type.lower()
    transmission_col = "transmission_" + transmission.lower()

    # Create a DataFrame with the correct columns, initialized to zero
    input_df = pd.DataFrame(np.zeros((1, len(__data_columns))), columns=__data_columns)

    # Set the values for the numerical features
    input_df['year'] = year
    input_df['km_driven'] = km_driven

    input_df['owner'] = owner
    
    # For the categorical features, set the corresponding column to 1
    if brand_col in input_df.columns:
        input_df[brand_col] = 1
    if fuel_col in input_df.columns:
        input_df[fuel_col] = 1
    if transmission_col in input_df.columns:
        input_df[transmission_col] = 1

    # Scale the numerical features before prediction
    numerical_features = ['year', 'km_driven', 'owner']
    input_df[numerical_features] = __scaler.transform(input_df[numerical_features])

    prediction = __model.predict(input_df)[0]
    return round(prediction, 2)

def load_saved_artifacts():
    """
    Loads the saved model, column information, and scaler from their respective files.
    """
    print("Loading saved artifacts...start")
    global __data_columns, __brands, __fuel_types, __transmissions, __model, __scaler

    # Define paths to artifact files
    columns_path = "./artifacts/columns.json"
    scaler_path = "./artifacts/scaler.pickle"
    model_path = "./artifacts/car_price_prediction.pickle"
    
    # Load column names from the JSON file
    with open(columns_path, "r") as f:
        data = json.load(f)
        __data_columns = data['data_columns']
        __brands = sorted([col.replace('brand_', '') for col in __data_columns if col.startswith('brand_')])
        __fuel_types = sorted([col.replace('fuel_', '') for col in __data_columns if col.startswith('fuel_')])
        __transmissions = ['manual', 'automatic']

    # Load the scaler
    with open(scaler_path, "rb") as f:
        __scaler = pickle.load(f)

    # Load the trained model
    with open(model_path, "rb") as f:
        __model = pickle.load(f)

    print("Loading saved artifacts...done")

def get_brand_names():
    return __brands

def get_fuel_types():
    return __fuel_types

def get_transmission_types():
    return __transmissions

if __name__ == '__main__':
    load_saved_artifacts()