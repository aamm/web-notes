"""
Web application for note taking.
"""


from flask import Flask, send_from_directory
from flask_api import status
from flask_restful import Resource, Api, reqparse

###############################################################################
# CONSTANTS
###############################################################################

MAX_TITLE_LENGTH = 256
MAX_TEXT_LENGTH = 1024

RESPONSE_OK = ('OK', status.HTTP_200_OK)
# Provides a vague feedback to the client to avoid giving away too much
# information that could be used to attack the application.
RESPONSE_BAD_REQUEST = ('Bad request', status.HTTP_400_BAD_REQUEST)
RESPONSE_NOT_FOUND = ('Not Found', status.HTTP_404_NOT_FOUND)
RESPONSE_PAYLOAD_TOO_LARGE = ('Payload Too Large',
                              status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)

TEXT_ARGUMENT_NAME = 'text'

APP = Flask(__name__)
API = Api(APP)
PARSER = reqparse.RequestParser()
PARSER.add_argument(TEXT_ARGUMENT_NAME)

###############################################################################
# IN MEMORY DATA
###############################################################################

NOTES = {}

###############################################################################
# URL HANDLERS
###############################################################################

@APP.route('/')
def root():
    """
    Handler to the base URL

    :return: index.html contents
    """
    return send_from_directory('.', "index.html")


@APP.route('/<path:filename>')
def root_files(filename):
    """
    Handler to all static files

    :param filename: The file path.
    :return: File contents.
    """
    return send_from_directory('.', filename)


class Notes(Resource):
    """
    Handler for the GET verb on /notes URL.
    """

    @staticmethod
    def get():
        return NOTES


API.add_resource(Notes, '/notes')


class Note(Resource):
    """
    Handler for the GET and POST verbs on /note/<note_title> URLs.
    """

    @staticmethod
    def get(title):
        return NOTES[title] if title in NOTES else RESPONSE_NOT_FOUND

    @staticmethod
    def post(title):
        if not title or len(title) > MAX_TITLE_LENGTH:
            return RESPONSE_BAD_REQUEST
        args = PARSER.parse_args()
        text = args[TEXT_ARGUMENT_NAME]
        if text:
            if len(text) > MAX_TEXT_LENGTH:
                return RESPONSE_PAYLOAD_TOO_LARGE
            NOTES[title] = text
            return RESPONSE_OK
        else:
            return RESPONSE_BAD_REQUEST


API.add_resource(Note, '/note/<title>')

# Starts the server, accepting connections on any interface.
APP.run(host='0.0.0.0')
