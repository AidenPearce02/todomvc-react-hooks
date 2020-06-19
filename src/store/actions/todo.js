import { ACTION_TYPES } from '../../constants/action-type';

export const onLoad = todos => ({ type: ACTION_TYPES.load, todos });
export const onCreate = (name, finishTo) => ({ type: ACTION_TYPES.create, name, finishTo });
export const onRemove = id => ({ type: ACTION_TYPES.remove, id });
export const onUpdate = values => ({ type: ACTION_TYPES.update, values });
export const onCompleteAll = () => ({ type: ACTION_TYPES.completeAll });
