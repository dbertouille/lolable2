from flask import jsonify

def json_response(f):
    def wrap(*args, **kwargs):
        status, data = f(*args, **kwargs)
        resp = jsonify(data)
        resp.status_code = status
        return resp
    return wrap
