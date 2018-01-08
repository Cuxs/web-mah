import _ from 'lodash';

export default(array, property, value) => (_.filter(array, { [property]: value })).length;

