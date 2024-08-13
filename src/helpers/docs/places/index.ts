import create from './create';
import allPlaces from './all-places';
import placeById from './place-by-id';

export default {
    '/places': {
        ...create
    },
    '/places(get all places)': {
        ...allPlaces
    },
    '/places/{id}':  {
        ...placeById
    }
}