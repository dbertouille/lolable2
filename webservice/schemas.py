from shared import ma
from marshmallow import fields
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

class MediaSchema(ma.ModelSchema):
    class Meta:
        model = models.MediaModel

class UserSchema(ma.ModelSchema):
    class Meta:
        model = models.UserModel

class ArchiveItemSchema(ma.Schema):
    item_type = fields.String()
    comic = fields.Nested(ComicSchema)
    media = fields.Nested(MediaSchema)