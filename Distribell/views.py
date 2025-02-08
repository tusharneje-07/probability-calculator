from django.shortcuts import render

def demo(request):
    return render(request, 'index.html')

def trydemo(request):
    return render(request, 'try.html')