import create from './create';
import all from './all-modality';
import byId from './modality-by-id';

export default {
    '/modality': {
        ...create
    },
    '/modality(get all modality)': {
        ...all
    },
    '/modality/{id}':  {
        ...byId
    }
}