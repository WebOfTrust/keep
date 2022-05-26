import EXTERNAL_GAR from './external-gar';
import GENERIC from './generic';
import INTERNAL_GAR from './internal-gar';
import LAR from './lar';
import PERSON from './person';
import QAR from './qar';
import ROOT_GAR from './root-gar';

const tasks = {
    'external-gar': EXTERNAL_GAR,
    'generic': GENERIC,
    'internal-gar': INTERNAL_GAR,
    'lar': LAR,
    'person': PERSON,
    'qar': QAR,
    'root-gar': ROOT_GAR,
};

module.exports = tasks;
