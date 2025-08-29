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

def get_estimated_price(brand, year, fuel_type, transmission, km_driven, owner):
    
    # Predicts the car price using a structure similar to your real estate project.
    # It creates a Pandas DataFrame to match the model's expected input format.
    
    # Construct the correct one-hot encoded column names from user input
    brand_col = "brand_" + brand.lower()
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

    # Predict the price and convert from log scale using np.exp()
    # The result is rounded to 2 decimal places
    prediction = __model.predict(input_df)[0]
    return round(prediction, 2)

def load_saved_artifacts():

    # Loads the saved model and column information from their respective files.
    # This function populates the global variables used by the prediction function.
    
    print("Loading saved artifacts...start")
    global __data_columns
    global __brands
    global __fuel_types
    global __transmissions
    global __model

    # Load column names from the JSON file
    with open("./artifacts/columns.json", "r") as f:
        data = json.load(f)
        __data_columns = data['data_columns']

        # Dynamically extract unique categories from the column list
        __brands = sorted([col.replace('brand_', '') for col in __data_columns if col.startswith('brand_')])
        __fuel_types = sorted([col.replace('fuel_', '') for col in __data_columns if col.startswith('fuel_')])
        # Based on the dataset, 'automatic' is the opposite of 'manual'
        __transmissions = ['manual', 'automatic']

    # Load the trained model from the pickle file
    if __model is None:
        with open("./artifacts/car_price_prediction.pickle", "rb") as f:
            __model = pickle.load(f)

    print("Loading saved artifacts...done")

def get_brand_names():
    return __brands

def get_fuel_types():
    return __fuel_types

def get_transmission_types():
    return __transmissions

# This will run once when the module is imported by app.py
load_saved_artifacts()