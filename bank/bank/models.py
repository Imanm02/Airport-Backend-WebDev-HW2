from django.db import models


class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    receipt_id = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    time_create = models.DateTimeField(auto_now_add=True)
    result = models.IntegerField(default=0)
    callback = models.CharField(max_length=255)

    class Meta:
        ordering = ["id"]
