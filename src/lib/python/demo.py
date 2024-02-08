import pandas as pd
from datetime import datetime
import folium
from folium.plugins import HeatMap
import matplotlib.pyplot as plt

def demofunction():
    #try loading stuff
    postalcodes = pd.read_csv('postal_codes.csv') 
    return "hi"
