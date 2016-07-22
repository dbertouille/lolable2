from shared import ma
import models

class ComicSchema(ma.ModelSchema):
    class Meta:
        model = models.ComicModel

class ConfigurationSchema(ma.ModelSchema):
    class Meta:
        model = models.ConfigurationModel
