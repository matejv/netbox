# Generated by Django 4.2.9 on 2024-01-20 09:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('vpn', '0003_ipaddress_multiple_tunnel_terminations'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ikepolicy',
            name='mode',
            field=models.CharField(blank=True),
        ),
    ]
