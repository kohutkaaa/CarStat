import loadable from 'utils/loadable';

const AdminStatistics = loadable(() => import('./index'));
const FuelStatistics = loadable(() => import('./FuelStatistics'));

export {
    AdminStatistics,
    FuelStatistics
}