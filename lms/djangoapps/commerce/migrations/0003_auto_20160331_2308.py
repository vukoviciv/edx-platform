# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0002_commerceconfiguration'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='commerceconfiguration',
            options={},
        ),
        migrations.AddField(
            model_name='commerceconfiguration',
            name='bulk_purchase_checkout_page',
            field=models.CharField(default=b'/basket/bulk-purchase/', help_text='Path to bulk purhcase checkout page hosted by the E-Commerce service.', max_length=255),
        ),
    ]
