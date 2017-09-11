import { User, Product } from './models';
import { config } from './config/config';

console.log('Application name is: ', config.appName);

const Bob = new User();
const Bread = new Product();
