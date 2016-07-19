from shared import ma
import models

class ComicSchema(ma.ModelSchema):
    class Meta:
        model = models.Comic
