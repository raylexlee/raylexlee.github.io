import {  outputHTML, Album } from './utilm.js';
if (document.readyState !== 'loading' ) {
  outputHTML();
} else {
  document.addEventListener( 'DOMContentLoaded', outputHTML);  
}  