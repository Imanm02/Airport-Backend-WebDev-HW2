from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

from .models import Transaction
from .serializers import TransactionSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


@csrf_exempt
def transaction_redirected(request, pk):
    transaction = Transaction.objects.get(pk=pk)
    return render(request, "index.html", {"transaction": transaction})


@csrf_exempt
def transaction_completed(request, pk, result):
    transaction = Transaction.objects.get(pk=pk)
    transaction.result = result
    transaction.save()
    callback = transaction.callback + "/" + str(pk) + "/" + str(result)
    return redirect(callback)
