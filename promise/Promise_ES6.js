/*
自定义Promise函数模块 ES6 class
*/
(function (window) {

  const PENDING = 'pending';
  // 以前是resolved
  const RESOLVED = 'fulfilled';
  const REJECTED = 'rejected';

  class Promise {
    constructor(excutor) {
      const self = this     // ES5将当前promise保存起来
      this.status = PENDING; //status状态属性，初始为pending
      this.data = undefined;  //一个用于存储数据的属性
      this.callbacks = [];//存储回调函数的每个元素机构：{onResolved(){},onRejected(){}}
      
      // 如果是 function resolve(vlue){}  这个在外面调用的时候this指代的是window
      // function resolve(value){
      //   //如果当前状态不是pending，直接结束
      //   if (self.status !== PENDING) {
      //     return
      //   }
      //   // 将状态改为resolved
      //   self.status = RESOLVED;
      //   // 保存value数据
      //   self.data = value;
      //   // 如果有待执行的callback函数，立即异步执行回调函数
      //   if (self.callbacks.length > 0) {
      //     setTimeout(() => { //放入队列执行所有成功的回调。  不太准确 可以模拟
      //       self.callbacks.forEach(callbacksObj => {
      //         callbacksObj.onResolved(value)
      //       })
      //     })
      //   }
      // }

      // 使用箭头函数  使用箭头函数要相当小心才行
      const resolve = (value)=>{
        //如果当前状态不是pending，直接结束
        if (this.status !== PENDING) {
          return
        }
        // 将状态改为resolved
        this.status = RESOLVED;
        // 保存value数据
        this.data = value;
        // 如果有待执行的callback函数，立即异步执行回调函数
        if (this.callbacks.length > 0) {
          setTimeout(() => { //放入队列执行所有成功的回调。  不太准确 可以模拟
            this.callbacks.forEach(callbacksObj => {
              callbacksObj.onResolved(value)
            })
          })
        }
      }

      function reject(reason) {
        //如果当前状态不是pending，直接结束
        if (self.status !== PENDING) {
          return
        }
        // 将状态改为rejected
        self.status = REJECTED;
        // 保存reason数据
        self.data = reason;
        // 如果有待执行的callback函数，立即异步执行回调函数
        if (self.callbacks.length > 0) {
          setTimeout(() => { //放入队列执行所有成功的回调。  不太准确 可以模拟
            self.callbacks.forEach(callbacksObj => {
              callbacksObj.onRejected(reason)
            })
          })
        }
      }

      // 立即同步执行excutor
      try {
        excutor(resolve, reject)
      } catch (error) {  //如果执行器抛出异常，执行失败reject，promise变为rejected
        reject(error)
      }
    }

    /*
  Promise原型对象的then()
  指定成功和失败的回调函数
  返回一个新的promise对象
   */
    then(onResolved = value => value, onRejected = reason => { throw reason }) {

      const self = this;
      // 指定或掉函数的默认值  也可以在传参上如上直接写
      // // 向后传递成功的value
      // onResolved = typeof onResolved==='function' ? onResolved : value => value
      // // 异常传透
      // onRejected = typeof onRejected==='function' ? onRejected : reason=>{throw reason}

      // 返回一个新的Promise对象
      return new Promise((resolve, reject) => {

        // 调用指定回调函数处理，根据执行结果，改变return的promise的状态
        function handle(callback) {
          /*
            1. 如果抛出异常，return的promise就会失败，reason是error
            2. 如果回调函数执行返回的不是promise，return的promise就会成功，value就是返回的值
            3. 如果返回的是promise，return的promise就是这个新promise的结果
            */
          try {
            const result = callback(self.data)
            if (result instanceof Promise) {
              // 如果返回的是promise，return的promise就是这个新promise的结果
              // result.then(
              //   value => { resolve(value) },
              //   reason => { reject(reason) }
              // )
              result.then(resolve, reject);
            } else {
              // 如果回调函数执行返回的不是promise，return的promise就会成功，value就是返回的值
              resolve(result)
            }
          } catch (error) {
            // 如果抛出异常，return的promise就会失败，reason是error
            reject(error)
          }
        }

        if (self.status === PENDING) {
          // 当前状态还是pending状态，将回调函数保存起来
          self.callbacks.push({
            onResolved() {
              handle(onResolved);
            },
            onRejected() {
              handle(onRejected)
            }
          })
        } else if (self.status === RESOLVED) {
          // 当前状态是resolved状态，执行onResolved回调并且改变return的promise的状态
          setTimeout(() => {
            handle(onResolved)
          })
        } else {
          // 当前状态是rejected状态，执行onRejected回调并且改变return的promise的状态
          setTimeout(() => {
            handle(onRejected)
          })
        }
      })
    }

    /*
    Promise原型对象的catch()
    指定失败的回调函数
    返回一个新的promise对象
     */
    catch(onRejected) {
      return this.then(undefined, onRejected)
    }

    /*
    Promise函数对象的方法resolve()
    参数可以是值，promise，thenable对象
    返回一个成功或失败的promise
     */
    static resolve = function (value) {
      return new Promise((resolve, reject) => {
        // 判断value的类型
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      })
    }

    /*
    Promise函数对象的方法reject()
    指定被拒绝的原因reason
    返回一个失败的promise
     */
    static reject = function (reason) {
      return new Promise((resolve, reject) => {
        reject(reason)
      })
    }

    /*
    Promise函数对象的方法All()
    指定promise的可迭代对象或者一个值
    返回一个新的promise
    只有当所有promise都成功才成功，有一个失败就失败
     */
    static all = function (promises) {
      // 用来来保存所有成功value的数组
      const values = new Array(promises.length)
      // 用来计数是否所有promise都成功
      let resolveCount = 0
      return new Promise((resolve, reject) => {
        // 遍历获取每一个promise的结果
        // 遍历按照顺序遍历的
        promises.forEach((p, index) => {
          // 将这个p包装成一个promise
          Promise.resolve(p).then(
            value => {
              resolveCount++   // 成功的数量加1
              // p成功 将成功的value保存到values，  按照遍历的顺序将值存到相应的位置上
              values[index] = value
              // 如果全部成功，才return成功的promise
              if (resolveCount === promises.length) {
                resolve(values)
              }
            },
            reason => {
              reject(reason)
            }
          )
        })
      })
    }

    /*
    Promise函数对象的方法race()
    指定promise的可迭代对象或者一个值
    返回一个新的promise
    第一个完成的promise就是最终的结果
     */
    static race = function (promises) {
      return new Promise((resolve, reject) => {
        promises.forEach((p, index) => {
          Promise.resolve(p).then(
            value => {   // 一旦有成功，就return成功
              resolve(value)
            },
            reason => {   //一旦失败，就return 失败
              reject(reason)
            }
          )
        })
      })
    }

    /*
    返回一个promise，在指定事件后才确定结果
    */
    static resolveDelay = function (value, time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 判断value的类型
          if (value instanceof Promise) {
            value.then(resolve, reject)
          } else {
            resolve(value)
          }
        }, time);
      })
    }

    /*
    返回一个promise对象，在指定时间后才确定失败
    */
    static rejectDelay = function (reason, time) {

    }
  }

  window.Promise = Promise
})(window)