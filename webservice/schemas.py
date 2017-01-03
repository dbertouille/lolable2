from shared import ma
import models

class BlogSchema(ma.ModelSchema):
    class Meta:
        model = models.BlogModel

class ComicSchema(ma.ModelSchema):
    class Meta:
        model = models.ComicModel

class ConfigurationSchema(ma.ModelSchema):
    class Meta:
        model = models.ConfigurationModel

class UserSchema(ma.ModelSchema):
    class Meta:
        model = models.UserModel
