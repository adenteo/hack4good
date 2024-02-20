# import json
# import pandas as pd
# from numpy import int64 
# monthly_summary = pd.read_csv('monthly_summary.csv')
# json_data = monthly_summary.to_json(orient='records')

def get_month_summary_grouped(data, year, month):
    # Convert the JSON data to a dataframe
    df = pd.DataFrame(json.loads(data))
    
    # Select the row for the given year and month
    selected_row = df[(df['year'] == year) & (df['month'] == month)]
    
    # If no matching row found, return a message
    if selected_row.empty:
        return "No data found for the specified year and month."
    
    # Convert numpy.int64 to int for JSON serialization
    def convert_int64(val):
        return int(val) if isinstance(val, int64) else val

    # Dictionary to hold the grouped categories
    grouped_categories = {
        'Year': convert_int64(selected_row['year'].values[0]),
        'Month': convert_int64(selected_row['month'].values[0]),
        'Number of Activities': convert_int64(selected_row['rowCount'].values[0]),
        'Total Hours': convert_int64(selected_row['numHours'].values[0]),
        'Skills': selected_row[['drivingLicence', 'pwdTrained']].applymap(convert_int64).to_dict('records')[0],
        'Attendance': selected_row.filter(regex='attendance_').applymap(convert_int64).to_dict('records')[0],
        'Theme Prevalence': selected_row.iloc[:, 7:33].applymap(convert_int64).to_dict('records')[0],
        'Citizenship': selected_row.filter(regex='citizenship_').applymap(convert_int64).to_dict('records')[0],
        'Employment': selected_row.filter(regex='employment_').applymap(convert_int64).to_dict('records')[0],
        'Gender': selected_row.filter(regex='gender_').applymap(convert_int64).to_dict('records')[0],
        'AgeGroups': selected_row.filter(regex='^under|^over').applymap(convert_int64).to_dict('records')[0],
        'Zones': selected_row.filter(regex='zone_').applymap(convert_int64).to_dict('records')[0]
    }
    
    # Convert the grouped categories dictionary to JSON
    return grouped_categories

