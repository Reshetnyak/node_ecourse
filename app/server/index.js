import { User, Product } from './models';
import * as config from './config/config.json';

console.log('Application name is: ', config.appName);

const Bob = new User();
const Bread = new Product();
