''' controller and routes for tasks '''
import os
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from app import app, mongo
from app.schemas import validate_task, validate_task_update
import logger

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))


@app.route('/task', methods=['GET', 'POST', 'DELETE', 'PATCH'])
# @jwt_required
def task():
    ''' route read tasks '''
    if request.method == 'GET':
        query = request.args
        data = mongo.db.tasks.find_one({'_id': ObjectId(query['id'])})
        return jsonify({'ok': True, 'data': data}), 200

    data = request.get_json()

    if request.method == 'POST':
        user = get_jwt_identity()
        data['email'] = user['email']
        data = validate_task(data)
        if data['ok']:
            db_response = mongo.db.tasks.insert_one(data['data'])
            return_data = mongo.db.tasks.find_one(
                {'_id': db_response.inserted_id})
            return jsonify({'ok': True, 'data': return_data}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400

    if request.method == 'DELETE':
        if data.get('id', None) is not None:
            db_response = mongo.db.tasks.delete_one(
                {'_id': ObjectId(data['id'])})
            if db_response.deleted_count == 1:
                response = {'ok': True, 'message': 'record deleted'}
            else:
                response = {'ok': True, 'message': 'no record found'}
            return jsonify(response), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

    if request.method == 'PATCH':
        data = validate_task_update(data)
        if data['ok']:
            data = data['data']
            mongo.db.tasks.update_one(
                {'_id': ObjectId(data['id'])}, {'$set': data['payload']})
            return jsonify({'ok': True, 'message': 'record updated'}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@app.route('/list/task', methods=['GET'])
# @jwt_required
def list_tasks():
    ''' route to get all the tasks for a user '''
    # user = get_jwt_identity()
    user = {'email': 'riken.mehta03@gmail.com'}
    if request.method == 'GET':
        query = request.args
        data = mongo.db.tasks.find({'email': user['email']})
        if query.get('group', None):
            return_data = {}
            for task in data:
                try:
                    return_data[task['status']].append(task)
                except:
                    return_data[task['status']] = [task]
        else:
            return_data = list(data)
        return jsonify({'ok': True, 'data': return_data})
