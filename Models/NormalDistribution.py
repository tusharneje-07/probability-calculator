import numpy as np
from scipy.stats import norm

class Normal:
    def __init__(self,data):
        self.data = data
        self.mean = np.mean(data)
        self.std_dev = np.std(data)
        
    def bewteen(self,lower_bound,upper_bound):
        z_lower = (lower_bound - self.mean) / self.std_dev
        z_upper = (upper_bound - self.mean) / self.std_dev
        p_lower = norm.cdf(z_lower)
        p_upper = norm.cdf(z_upper)
        probability = (p_upper - p_lower)
        return probability
    
    def greater_than(self,bound):
        z = (bound - self.mean) / self.std_dev
        p = norm.cdf(z)
        probability = (1-p)
        return probability
    
    def less_than(self,bound):
        z = (bound - self.mean) / self.std_dev
        p = norm.cdf(z)
        return p
    
    def get_mean(self):
        return self.mean

    def get_std_dev(self):
        return self.std_dev
    
    
class Round4Normal:
    def __init__(self,data):
        self.data = data
        self.mean = round(np.mean(data),4)
        self.std_dev = round(np.std(data),4)
        
    def bewteen(self,lower_bound,upper_bound):
        z_lower = round((lower_bound - self.mean) / self.std_dev,4)
        z_upper = round((upper_bound - self.mean) / self.std_dev,4)
        p_lower = round(norm.cdf(z_lower),4)
        p_upper = round(norm.cdf(z_upper),4)
        probability = round((p_upper - p_lower),4)
        return probability
    
    def greater_than(self,bound):
        z = round((bound - self.mean) / self.std_dev,4)
        p = round(norm.cdf(z),4)
        probability = round((1-p),4)
        return probability
    
    def less_than(self,bound):
        z = round((bound - self.mean) / self.std_dev,4)
        p = round(norm.cdf(z),4)
        return p
    
    def get_z_value(self,bound):
        return round(norm.cdf((bound - self.mean) / self.std_dev),4)
    
    def get_mean(self):
        return self.mean

    def get_std_dev(self):
        return self.std_dev
    