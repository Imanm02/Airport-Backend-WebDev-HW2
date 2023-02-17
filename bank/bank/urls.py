from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register(r"transaction", views.TransactionViewSet, basename="transaction")

urlpatterns = [
    path("", include(router.urls)),
    path("payment/<int:pk>/", views.transaction_redirected),
    path("payed/<int:pk>/<int:result>/", views.transaction_completed),
]
