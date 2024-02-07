import pandas as pd

def get_attendance_report(user_ids, data, timeframe='monthly'):
    activity_df = pd.read_json(data)

    # Filter DataFrame for the given user IDs
    activity_df = activity_df[activity_df['userId'].isin(user_ids)]
    
    user_details_columns = ['userId', 'fullName', 'employmentStatus', 'contactNumber', 'gender', 
                            'occupation', 'skills', 'declarations', 'drivingLicence', 'address', 
                            'pwdTrained', 'dateOfBirth']
    user_details_df = activity_df[user_details_columns].drop_duplicates(subset=['userId'])
    # Calculate age from dateOfBirth
    current_year = pd.Timestamp('now').year
    user_details_df['dateOfBirth'] = pd.to_datetime(user_details_df['dateOfBirth'])
    user_details_df['age'] = current_year - user_details_df['dateOfBirth'].dt.year

    # Ensure startTime is in datetime format
    activity_df['startTime'] = pd.to_datetime(activity_df['startTime'])
    activity_df['year'] = activity_df['startTime'].dt.year
    activity_df['month'] = activity_df['startTime'].dt.month
    activity_df['quarter'] = activity_df['startTime'].dt.quarter
    activity_df['day'] = activity_df['startTime'].dt.day

    # Convert attendanceStatus to dummies
    attendance_status_dummies = pd.get_dummies(activity_df['attendanceStatus'], prefix='attendanceStatus')

    # Get dummies for tags
    tags_dummies = activity_df['tags'].str.get_dummies(sep=',')

    # Add a row count column for counting the number of events signed up
    activity_df['eventSignUpCount'] = 1

    # Concatenate dummies and the original DataFrame
    activity_df = pd.concat([
        activity_df[['userId', 'year', 'month', 'quarter', 'day', 'numHours', 'eventSignUpCount']],
        attendance_status_dummies,
        tags_dummies
    ], axis=1)

    # Define group by columns based on timeframe
    group_by_columns = ['userId', 'year', 'month', 'quarter', 'day']
    if timeframe == 'annual':
        group_by_columns = ['userId', 'year']
    elif timeframe == 'quarterly':
        group_by_columns = ['userId', 'year', 'quarter']
    elif timeframe == 'monthly':
        group_by_columns = ['userId', 'year', 'month']
    elif timeframe == 'daily':
        group_by_columns = ['userId', 'year', 'month', 'day']
    else:
        raise ValueError('Invalid timeframe specified')

    # Group by and summarize
    grouped_df = activity_df.groupby(group_by_columns).agg({
        'eventSignUpCount': 'sum',
        'numHours': 'sum',
        **{col: 'sum' for col in attendance_status_dummies.columns},
        **{col: 'sum' for col in tags_dummies.columns},
    }).reset_index()

    return grouped_df.to_json(orient='records'), user_details_df.to_json(orient='records')
