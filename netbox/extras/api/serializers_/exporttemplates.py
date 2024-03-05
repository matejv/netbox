from rest_framework import serializers

from core.api.serializers_.data import DataFileSerializer, DataSourceSerializer
from core.models import ContentType
from extras.models import ExportTemplate
from netbox.api.fields import ContentTypeField
from netbox.api.serializers import ValidatedModelSerializer

__all__ = (
    'ExportTemplateSerializer',
)


class ExportTemplateSerializer(ValidatedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='extras-api:exporttemplate-detail')
    content_types = ContentTypeField(
        queryset=ContentType.objects.with_feature('export_templates'),
        many=True
    )
    data_source = DataSourceSerializer(
        nested=True,
        required=False
    )
    data_file = DataFileSerializer(
        nested=True,
        read_only=True
    )

    class Meta:
        model = ExportTemplate
        fields = [
            'id', 'url', 'display', 'content_types', 'name', 'description', 'template_code', 'mime_type',
            'file_extension', 'as_attachment', 'data_source', 'data_path', 'data_file', 'data_synced', 'created',
            'last_updated',
        ]
        brief_fields = ('id', 'url', 'display', 'name', 'description')
