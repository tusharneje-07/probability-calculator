import pandas as pd
import numpy as np

class CSVtoDataFrame:
    def __init__(self, path):
        self.path = path
        self.df = pd.read_csv(path)
        self.columns = []
        self.max_columns = len(self.df.columns)
        self.selected_column = None
        self.selected_data_frame = None
        for i, col in enumerate(self.df.columns):
            self.columns.append({"index":i,"name":col})
    
    def get_columns(self):
        return self.columns
    
    def select_column(self,index):
        if 0 <= index < self.max_columns:
            self.selected_column = self.columns[index]
            self.selected_data_frame = self.df[self.columns[index]["name"]]
            return self.columns[index]
        else:
            return None
        
    def get_selected_column(self):
        return self.selected_column
    
    def get_selected_data_frame(self):
        return self.selected_data_frame
    
    def get_min(self):
        try:
            return self.selected_data_frame.min()
        except Exception as e:
            return "No column selected"
    
    def get_max(self):
        try:
            return self.selected_data_frame.max()
        except Exception as e:
            return "No column selected"
    
    def get_mean_rounded(self):
        try:
            return round(np.mean(self.selected_data_frame),4)
        except Exception as e:
            return "No column selected"
    
    def get_mean(self):
        try:
            return np.mean(self.selected_data_frame)
        except Exception as e:
            return "No column selected"
        
    def get_data_count(self):
        try:
            return len(self.selected_data_frame)
        except Exception as e:
            return "No column selected"
    
    
        