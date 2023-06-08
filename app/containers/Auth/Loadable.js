import loadable from 'utils/loadable';

const Auth = loadable(() => import('./index'));

export {
    Auth
}