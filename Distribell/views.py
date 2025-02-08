from django.shortcuts import render
from django.http import JsonResponse
import json
def demo(request):
    return render(request, 'index.html')

def trydemo(request):
    return render(request, 'try.html')

def calculate(request):
    data = json.loads(request.body)
    print(data)
    return JsonResponse({'result': 'success'})