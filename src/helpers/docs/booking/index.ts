import create from './create';
import all from './all-bookings';
import byId from './booking-by-id';
import byReference from './booking-by-reference';

export default {
    '/booking': {
        ...create
    },
    '/booking(get all bookings)': {
        ...all
    },
    '/booking/{id}':  {
        ...byId
    },
    '/booking/{reference}/reference':  {
        ...byReference
    }
}