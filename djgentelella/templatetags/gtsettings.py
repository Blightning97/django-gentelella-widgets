from django import template
from django.utils.safestring import mark_safe
from django.conf import settings
from django.utils.translation import get_language
from djgentelella.utils import get_settings as get_settings_utils
import uuid

register = template.Library()

@register.simple_tag(takes_context=True)
def get_settings(context,  name, **kwargs):
    settings=get_settings_utils(name)
    if settings:
        return mark_safe(settings)
    return ""

@register.simple_tag
def get_random_uuid():
    return str(uuid.uuid4())


@register.simple_tag(takes_context=True)
def get_dataset_translation(context):
    lang = get_language()
    if lang:
        if lang in settings.DATASETS_SUPPORT_LANGUAGES:
            return settings.DATASETS_SUPPORT_LANGUAGES[lang]
    return "//cdn.datatables.net/plug-ins/1.10.20/i18n/English.json"
