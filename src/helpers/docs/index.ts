import basicInfo from './basicInfo.doc'
import components from './components.doc';
import servers from './servers';
import tags from './tags.doc';
import auth from './auth';
import places from './places';
import modality from './modality';
import booking from './booking';

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...auth,
    ...places,
    ...modality,
    ...booking
  },
};