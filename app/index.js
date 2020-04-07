var fs = require('fs');
 
/** 
 * @summary Application constructor, which is executed only once, 
 *                      when there is a request to directory with default index.js 
 *                      script inside. Then it's automatically created an instance 
 *                      of `module.exports` content. Then it's executed 
 *                      `handleHttpRequest` method on that instance. 
 *                      This is the way, how is directory request handled with 
 *                      default `index.js` file inside. 
 *                      If there is detected any file change inside this file 
 *                      (or inside file included in this file), the module 
 *                      `web-deb-server` automaticly reloads all necesssary 
 *                      dependent source codes and creates this application 
 *                      instance again. The same realoding procedure is executed, 
 *                      if there is any unhandled error inside method 
 *                      `handleHttpRequest` (to develop more comfortably).
 * @param {http}           http           Used node http module instance.
 * @param {express}        express        Used node express module instance.
 * @param {expressSession} expressSession Used node expressSession module instance.
 * @param {request}        request        Current http request object.
 * @param {response}       response       Current http response object.
 * @return void
 */
var App = function (http, express, expressSession, request, response) {
   // Any initializations:
   
};
App.prototype = {
   /**
    * @summary Requests counter.
    * @var {number} 
    */
   counter: 0,
   /**
    * @summary This method is executed each request to directory with 
    *          `index.js` script inside (also executed for first time 
    *          immediately after constructor).
    * @param {request}  request  Current http request object.
    * @param {response} response Current http response object.
    * @return {Promise} 
    */
    handleHttpRequest: function (request, response) {
      return new Promise(function (resolve, reject) {
         
         // try to uncomment line bellow to see rendered error in browser:
         //throw new Error("Unhandled test error.");
 
         // let's do anything asynchronous:
         fs.readdir(__dirname, {}, function (err, files) {
        
            if (err) {
               console.log(err);
               return reject();
            }
        
            this.counter++;
            response.send("Hello world (" + this.counter.toString() + "×)");
            resolve();
           
         }.bind(this));
            
      }.bind(this));
   }
};
module.exports = App;