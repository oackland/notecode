from flask import Blueprint, render_template

# Define the Blueprint unless it's already defined elsewhere
apiInfo = Blueprint('apiInfo', __name__)


@apiInfo.route('/apiAuth')
def auth_api():
    return render_template('authentication.html')
