from django.shortcuts import render
from django.http import JsonResponse
import json
from Models.DataExtractor import CSVtoDataFrame
from Models.NormalDistribution import Normal, Round4Normal
import os
from django.conf import settings

def demo(request):
    try:
        csv_path = os.path.join(settings.BASE_DIR, "Datasets", "SOCR-HeightWeight.csv")
        csv_to_df = CSVtoDataFrame(csv_path)
        csv_to_df.select_column(1)
        data = csv_to_df.get_selected_data_frame()
        data = {
            'min':csv_to_df.get_min(),
            'max':csv_to_df.get_max(),
            'dataset' : csv_to_df.get_selected_column()['name'],
        }
        return render(request, 'index.html',data)
    except Exception as e:
        pass

def trydemo(request):
    return render(request, 'try.html')

def calculate(request):
    data = json.loads(request.body)
    if data['y'] == '':
        return JsonResponse({'result': 'error'})
    else:
        y = data['y']
        x = data['x']
        option = data['option']
        state = data['state']
        csv_path = os.path.join(settings.BASE_DIR, "Datasets", "SOCR-HeightWeight.csv")
        csv_to_df = CSVtoDataFrame(csv_path)
        csv_to_df.select_column(1)
        data = csv_to_df.get_selected_data_frame()
        
        if state:
            normal = Round4Normal(data)
        else:
            normal = Normal(data)
        
        if option == 'greaterthan':
            p = normal.greater_than(y)
        elif option == 'lessthan':
            p = normal.less_than(y)
        elif option == 'between':
            p = normal.bewteen(x,y)
        else:
            return JsonResponse({'result': 'error'})
        
        if state:
            per = round(p*100,4)
        else:
            per = p*100
        return JsonResponse({
            'result': 'success',
            'data': list(data),
            'p' : p,
            'per' : per,
            'mean' : normal.get_mean()
            })
    return JsonResponse({'result': 'success'})