import pandas as pd
import numpy as np
from scipy.stats import norm

# Betweem -----------------------------------------------------
def round4_between(mean_data,std_dev_data,lower_bound,upper_bound):
    z_lower = round((lower_bound - mean_data) / std_dev_data,2)
    z_upper = round((upper_bound - mean_data) / std_dev_data,2)


    p_lower = round(norm.cdf(z_lower),4)
    p_upper = round(norm.cdf(z_upper),4)


    probability = round((p_upper - p_lower),4)
    
    return probability

def between(mean_data,std_dev_data,lower_bound,upper_bound):
    z_lower = (lower_bound - mean_data) / std_dev_data
    z_upper = (upper_bound - mean_data) / std_dev_data
    p_lower = norm.cdf(z_lower)
    p_upper = norm.cdf(z_upper)


    probability = (p_upper - p_lower)
    
    return probability
# Betweem -----------------------------------------------------

# Greater Than -----------------------------------------------------
def round4_greater_than(mean_data,std_dev_data,bound):
    z = round((bound - mean_data) / std_dev_data,2)
    p = round(norm.cdf(z),4)
    probability = round((1-p),4)
    
    return probability

def greater_than(mean_data,std_dev_data,bound):
    z = (bound - mean_data) / std_dev_data
    p = norm.cdf(z)
    probability = (1-p)
    
    return probability
# Greater Than -----------------------------------------------------

# Greater Than -----------------------------------------------------
def round4_less_than(mean_data,std_dev_data,bound):
    z = round((bound - mean_data) / std_dev_data,2)
    p = round(norm.cdf(z),4)
    probability = round((1-p),4)
    
    return probability

def less_than(mean_data,std_dev_data,bound):
    z = (bound - mean_data) / std_dev_data
    p = norm.cdf(z)
    probability = (1-p)
    
    return probability
# Greater Than -----------------------------------------------------


file_path = "./Datasets/SOCR-HeightWeight.csv" 
df = pd.read_csv(file_path)


print("Available Columns:")
for i, col in enumerate(df.columns):
    print(f"{i}: {col}")


while True:
    try:
        col_index = int(input("Enter the column index to select: "))
        if 0 <= col_index < len(df.columns):
            selected_column = df.columns[col_index]
            print(f"\nYou selected column: {selected_column}")
            break
        else:
            print("Invalid index. Please enter a number from the list.")
    except ValueError:
        print("Invalid input. Please enter a numeric index.")


data = df[selected_column]

print('Minmum Height:',data.min())
print('Maximum Height:',data.max())

mean_data = round(np.mean(data),4)
std_dev_data = round(np.std(data, ddof=0),4)

# lower_bound = 65
# upper_bound = 70

# probability = round4_between(mean_data,std_dev_data,lower_bound,upper_bound)
# probability_acc = accurate_between(mean_data,std_dev_data,lower_bound,upper_bound)

# print(f"Probability of {lower_bound} <= X <= {upper_bound} is {probability} or {probability*100}%")
# print(f"Probability of {lower_bound} <= X <= {upper_bound} is {probability_acc} or {probability_acc*100}%")

bound = 60
probability = round4_greater_than(mean_data,std_dev_data,bound)
probability_acc = greater_than(mean_data,std_dev_data,bound)
print(f"Probability of X >= {bound} is {probability} or {probability*100}%")
print(f"Probability of X >= {bound} is {probability_acc} or {probability_acc*100}%")