import pandas as pd
import json
from numpy import int64

def get_demographics_report(event, _):
    body = json.loads(event['body'])
    # Access the 'data' and 'timeframe' from the parsed body
    data = body['data'] 
    year = body['year'] #added year and month inputs
    month = body['month']
    activity_data = json.dumps(data)
    activity_df = pd.read_json(activity_data)
    zones = pd.DataFrame({
    "Zone": ["City", "City", "South", "South", "West", "City", "City", "Central", "Central", "Central", 
             "Central", "Central", "East", "East", "East", "East", "East", "East", "North", "North",
             "West", "West", "West", "West", "North", "North", "North", "North"],
    "District": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    "PostalBeginsWith": [
        "01, 02, 03, 04, 05, 06", "07, 08", "14, 15, 16", "09, 10", "11, 12, 13", "17", "18, 19", 
        "20, 21", "22, 23", "24, 25, 26, 27", "28, 29, 30", "31, 32, 33", "34, 35, 36, 37", "38, 39, 40, 41",
        "42, 43, 44, 45", "46, 47, 48", "49, 50, 81", "51, 52", "53, 54, 55, 82", "56, 57", "58, 59", 
        "60, 61, 62, 63, 64", "65, 66, 67, 68", "69, 70, 71", "72, 73", "77, 78", "75, 76", "79, 80"
    ]})
    # Extract the first two digits for mapping
    zones['PostalBeginsWith'] = zones['PostalBeginsWith'].apply(lambda x: [y[:2] for y in x.split(', ')])
    zones_exploded = zones.explode('PostalBeginsWith')

    activity_df['startTime'] = pd.to_datetime(activity_df['startTime'])
    activity_df['year'] = activity_df['startTime'].dt.year
    activity_df['month'] = activity_df['startTime'].dt.month
    activity_df['postalCodeFirstTwo'] = activity_df['postalCode'].astype(str).str.zfill(6).str[:2]
    activity_df = activity_df.merge(zones_exploded, how='left', left_on='postalCodeFirstTwo', right_on='PostalBeginsWith')
    activity_df['rowCount'] = 1


    # Convert boolean columns to integer type
    activity_df['drivingLicence'] = activity_df['drivingLicence'].astype(int)
    activity_df['pwdTrained'] = activity_df['pwdTrained'].astype(int)

    # Get dummies for categorical columns
    attendance_dummies = pd.get_dummies(activity_df['attendanceStatus'], prefix='attendance')
    tags_dummies = activity_df['tags'].str.get_dummies(sep=',')
    citizenship_dummies = pd.get_dummies(activity_df['citizenshipType'], prefix='citizenship')
    employment_dummies = pd.get_dummies(activity_df['employmentStatus'], prefix='employment')
    gender_dummies = pd.get_dummies(activity_df['gender'], prefix='gender')
    zone_dummies = pd.get_dummies(activity_df['Zone'], prefix='zone')

    current_year = pd.Timestamp('now').year
    activity_df['dateOfBirth'] = pd.to_datetime(activity_df['dateOfBirth'])
    activity_df['age'] = current_year - activity_df['dateOfBirth'].dt.year

    # Group age into categories and get dummies
    bins = [0, 13, 21, 50, 65, float('inf')]
    labels = ['under13', 'under21', 'under50', 'under65', 'over65']
    activity_df['ageGroup'] = pd.cut(activity_df['age'], bins=bins, labels=labels, right=False)
    age_group_dummies = pd.get_dummies(activity_df['ageGroup'])
    # Concatenate all dummies and the original DataFrame (excluding original categorical columns)
    final_df = pd.concat([
        activity_df.drop(['attendanceStatus','tags', 'citizenshipType', 'employmentStatus', 'gender', 'age', 'ageGroup', 'Zone'], axis=1),
        attendance_dummies, tags_dummies, citizenship_dummies, employment_dummies, gender_dummies, age_group_dummies, zone_dummies
    ], axis=1)
    # Group by year and month, and sum the numHours and other one-hot encoded columns
    
    final_df = final_df.groupby(['year', 'month'])

    summary = final_df.agg({
        'rowCount': 'count', #count number of records
        'numHours': 'sum',  # Sum numHours for total hours
        **{col: 'sum' for col in attendance_dummies.columns},  # Sum for each attendance status
        **{col: 'sum' for col in tags_dummies.columns},  # Sum for each tag column
        'averageSentiment': 'mean',
        'drivingLicence': 'sum',
        'pwdTrained': 'sum',
        **{col: 'sum' for col in citizenship_dummies.columns},  # Sum for each citizenship status
        **{col: 'sum' for col in employment_dummies.columns},  # Sum for each employment status
        **{col: 'sum' for col in gender_dummies.columns},  # Sum for each gender
        **{col: 'sum' for col in age_group_dummies.columns},  # Sum for each age group
        **{col: 'sum' for col in zone_dummies.columns},  # Sum for each zone
    }).reset_index()

    selected_row = summary[(summary['year'] == year) & (summary['month'] == month)]
    if selected_row.empty:
        return "No data found for the specified year and month."
    
    # Convert numpy.int64 to int for JSON serialization
    def convert_int64(val):
        return int(val) if isinstance(val, int64) else val

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

    return summary.to_json(orient='records')