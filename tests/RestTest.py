"""
Integration tests that check the REST API.
"""

import unittest
import requests
import json


BASE_URL = 'http://localhost:5000'


def get_list():
    """
    Requests the list of notes.
    :return: A dictionary with the result.
    """
    return json.loads(requests.get(BASE_URL + '/notes').text)

def get_note(note_title):
    """
    Requests the contents of a single note.
    :return: A dictionary with the result.
    """
    return json.loads(requests.get(BASE_URL + '/note/' + note_title).text)

def post_note(title, content):
    """
    Post a new note.
    """
    return json.loads(requests.post(BASE_URL + '/note/' + title, {'text': content}).text) == 'OK'


class TestRest(unittest.TestCase):

    def test_rest_api(self):
        self.assertEqual({}, get_list())
        self.assertEqual(True, post_note('a', 'Contents of a'))
        self.assertEqual({'a': 'Contents of a'}, get_list())
        self.assertEqual(True, post_note('b', 'Contents of b'))
        self.assertEqual({'a': 'Contents of a', 'b': 'Contents of b'}, get_list())
        self.assertEqual('Contents of a', get_note('a'))
        self.assertEqual('Contents of b', get_note('b'))


if __name__ == '__main__':
    unittest.main()
