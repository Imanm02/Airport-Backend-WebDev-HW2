from rest_framework import serializers

from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = (
            "id",
            "receipt_id",
            "amount",
            "time_create",
            "result",
            "callback",
        )
