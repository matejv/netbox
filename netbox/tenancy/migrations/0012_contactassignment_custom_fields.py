# Generated by Django 4.2.6 on 2023-11-06 20:23

from django.db import migrations, models
import utilities.json


class Migration(migrations.Migration):
    dependencies = [
        ('tenancy', '0011_contactassignment_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactassignment',
            name='custom_field_data',
            field=models.JSONField(blank=True, default=dict, encoder=utilities.json.CustomFieldJSONEncoder),
        ),
    ]
