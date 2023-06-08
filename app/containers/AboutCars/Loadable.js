import loadable from 'utils/loadable';

const AboutCars = loadable(() => import('./index'));
const AddCar = loadable(() => import('./AddCar'));
const EditCar = loadable(() => import('./EditCar'));

export {
    AboutCars,
    AddCar,
    EditCar
}