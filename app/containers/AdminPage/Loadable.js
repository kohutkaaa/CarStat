import loadable from 'utils/loadable';

const AdminPage = loadable(() => import('./index'));
const PaymentsPage = loadable(() => import('./PaymentsPage'));

export { AdminPage, PaymentsPage };
