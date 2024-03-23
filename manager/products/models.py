from django.db import models

import uuid
import os

def recipe_image_file_path(instance, filename):
    """Generate file path for new recipe image."""
    ext = os.path.splitext(filename)[1]
    filename = f'{uuid.uuid4()}{ext}'

    return os.path.join('uploads', 'recipe', filename)


class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    image = models.ImageField(null=True, upload_to=recipe_image_file_path)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.title
