from django.urls import path
from django.utils.module_loading import import_string
from django.views.generic import View

from extras.registry import registry


def get_model_urls(app_label, model_name):
    """
    Return a list of URL paths for detail views registered to the given model.

    Args:
        app_label: App/plugin name
        model_name: Model name
    """
    paths = []

    # Retrieve registered views for this model
    try:
        views = registry['views'][app_label][model_name]
    except KeyError:
        # No views have been registered for this model
        views = []

    for config in views:
        # Import the view class or function
        if type(config['view']) is str:
            view_ = import_string(config['view'])
        else:
            view_ = config['view']
        if issubclass(view_, View):
            view_ = view_.as_view()
        # Create a path to the view
        paths.append(
            path(f"{config['name']}/", view_, name=f"{model_name}_{config['name']}", kwargs=config['kwargs'])
        )

    return paths
