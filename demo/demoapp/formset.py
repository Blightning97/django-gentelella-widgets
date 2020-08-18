from django.forms import formset_factory
from django.shortcuts import render

from demoapp.forms import PersonForm
from djgentelella.forms.forms import GTFormSet


def add_formset(request):
    formset = formset_factory(PersonForm, formset=GTFormSet,
                              extra=0, max_num=2)

    return render(request, 'formset.html', {'formset': formset(prefix='person')})