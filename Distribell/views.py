from django.shortcuts import render
from django.http import JsonResponse
import json
from Models.DataExtractor import CSVtoDataFrame
from Models.NormalDistribution import Normal, Round4Normal
import os
from django.conf import settings
import numpy as np
def demo(request):
    try:
        csv_path = os.path.join(settings.BASE_DIR, "Datasets", "District_PGI_Table_4.csv")
        csv_to_df = CSVtoDataFrame(csv_path)
        csv_to_df.select_column(3)
        data = csv_to_df.get_selected_data_frame()
        mean = csv_to_df.get_mean()
        std_dev = np.std(data)
        data = {
            'min':csv_to_df.get_min(),
            'max':csv_to_df.get_max(),
            'dataset' : csv_to_df.get_selected_column()['name'],
            'mean':mean,
            'std_dev':std_dev
        }
        return render(request, 'index.html',data)
    except Exception as e:
        pass

def trydemo(request):
    return render(request, 'try.html')

def calculate(request):
    data = json.loads(request.body)
    if not data.get('y'):
        return JsonResponse({'result': 'error'})

    y, x, option, state = data['y'], data['x'], data['option'], data['state']
    csv_path = os.path.join(settings.BASE_DIR, "Datasets", "District_PGI_Table_4.csv")
    df = CSVtoDataFrame(csv_path)
    df.select_column(3)
    data_frame = df.get_selected_data_frame()

    normal = Round4Normal(data_frame) if state else Normal(data_frame)

    if option == 'greaterthan':
        p = normal.greater_than(y)
    elif option == 'lessthan':
        p = normal.less_than(y)
    elif option == 'between':
        p = normal.bewteen(x, y)
    else:
        return JsonResponse({'result': 'error'})

    per = round(p * 100, 4) if state else p * 100
    return JsonResponse({
        'result': 'success',
        'data': list(data_frame),
        'p': p,
        'per': per,
        'mean': normal.get_mean(),
        'std_dev': normal.get_std_dev()
    })
