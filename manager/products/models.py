from django.db import models


class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    image = models.CharField(null=True, blank=True, max_length=300)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.title
