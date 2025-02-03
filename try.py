from DataExtractor import CSVtoDataFrame
from NormalDistribution import Normal,Round4Normal
csv_to_df = CSVtoDataFrame("./Datasets/SOCR-HeightWeight.csv")
csv_to_df.select_column(1)

data = csv_to_df.get_selected_data_frame()
print(csv_to_df.get_min())
print(csv_to_df.get_max())

normal = Normal(data)

print(normal.less_than(76))


