//added these two lines to fix error, 'localStorage is not defined'
import 'localstorage-polyfill';
global['localStorage'] = localStorage;

export { AppServerModule as default } from './app/app.module.server';


