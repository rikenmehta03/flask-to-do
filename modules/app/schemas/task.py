from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

task_schema = {
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "status": {
            "type": "string",
            "enum": ["todo", "doing", "done"]
        },
        "email": {
            "type": "string",
            "format": "email"
        }
    },
    "required": ["email", "status", "title"],
    "additionalProperties": False
}

task_update_schema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "payload": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "status": {
                    "type": "string",
                    "enum": ["todo", "doing", "done"]
                }
            },
            "additionalProperties": False
        }
    },
    "required": ["id", "payload"],
    "additionalProperties": False
}


def validate_task_update(data):
    try:
        validate(data, task_update_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}


def validate_task(data):
    try:
        validate(data, task_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}
