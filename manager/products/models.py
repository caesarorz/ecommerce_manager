from django.db import models

# Create your models here.

class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    image = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.CharField(max_length=200, null=True, blank=True)
    # EC
    # user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    # name = models.CharField(max_length=200, null=True, blank=True)
    # image = models.ImageField(null=True, blank=True)
    # brand = models.CharField(max_length=200, null=True, blank=True)
    # category = models.CharField(max_length=200, null=True, blank=True)
    # description = models.TextField(null=True, blank=True)
    # rating = models.DecimalField(validators=[MinValueValidator(1), MaxValueValidator(5)], max_digits=7, decimal_places=1, null=True, blank=True)
    # numReviews = models.IntegerField(default=0, null=True, blank=True)
    # price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    # countInStock = models.IntegerField(null=True, blank=True, default=0)
    # timestamp = models.DateTimeField(auto_now_add=True, auto_now=False) # a created at field
    # modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
