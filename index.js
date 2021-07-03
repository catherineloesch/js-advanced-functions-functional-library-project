const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    // Collection Functions (Arrays or Objects):
    each: function(collection, cb) {
        if (Array.isArray(collection)) {
          for (const element of collection){
            cb(element, collection.indexOf(element), collection)
          }
        } else if (typeof collection === "object") {
          for (const key in collection) {
            cb(collection[key], key, collection)
          }
        }
      return collection
    },

    map: function(collection, cb) {
      let newArray = []
      if (Array.isArray(collection)) {
        for (const element of collection){
          newArray.push(cb(element, collection.indexOf(element), collection))
        }
      
      } else if (typeof collection === "object") {
        for (const key in collection) {
          newArray.push(cb(collection[key], key, collection))
        }
      }
    return newArray
    },

    reduce: function(collection, cb, accumulator) { 
      let acc = accumulator
      let collectionCopy
      if (Array.isArray(collection)) {
        collectionCopy = [...collection]
      } else if (typeof collection === "object") {
        collectionCopy = Object.values(collection)
      }
      if (acc === undefined) {
         acc = collectionCopy[0]
         collectionCopy.shift()
       }
      for (const element of collectionCopy) {
          acc = cb(acc, element, collectionCopy)
      }
      return acc
    },

    find: function(collection, cb){
      if (!Array.isArray(collection)) {
        collection = Object.values(collection)
      }

      let i = 0
      while (!cb(collection[i]) && (i<collection.length)) {
        i++
      }
      if (cb(collection[i])) {
        return collection[i]
      } else {
        return undefined
      }

    },

    filter: function(collection, cb) {
      if (!Array.isArray(collection)) {
        collection = Object.values(collection)
      }

      let newCollection = []
      for (const element of collection){
        if (cb(element)) {
          newCollection.push(element)
        }
      }
      return newCollection  
  
    },

    size: function(collection) {
      if (!Array.isArray(collection)) {
        collection = Object.keys(collection)
      }
      let size = 0
      for (const element of collection) {
        size++
      }
      return size
    },

    // Array Functions:
    first: function(arr, num=1){
      
      if (num === 1) {
        return arr[0]
      } else {
        let newArr = []
        for (let i = 0; i < num; i++) {
          newArr.push(arr[i])
        }
        return newArr
      }
      
    },

    last: function(arr, num=1){
      
      if (num === 1) {
        return arr[this.size(arr)-1]
      } else {
        let newArr = []
        for (let i = this.size(arr)-num; i < this.size(arr) ; i++) {
          newArr.push(arr[i])
        }
        return newArr
      }
      
    },

    compact: function(arr){
      return this.filter(arr, function(element) {return !!element})
    },

    sortBy: function(arr, cb) {
      const sortedArray = [...arr]
      sortedArray = sortedArray.sort(function(a, b){
        return (cb(a) - cb(b))
      })
      return sortedArray
    },

    looseBrackets: function(arr, newArr=[]) {
      for (const element of arr)
        newArr.push(element)
    },

    flatten: function(arr, shallow, newArr=[]) {
      if (!Array.isArray(arr)) return newArr.push(arr)
      if (shallow) {
        for (const element of arr)
          if (Array.isArray(element)) {
            this.looseBrackets(element, newArr)
          } else {
            newArr.push(element)
          }
      } else {
        for (const element of arr) {
          this.flatten(element, false, newArr)
        }
      }
      return newArr
    },

    uniq: function(arr, isSorted=false, cb) {
      let newArr = []
      if (!isSorted) {
        for (const element of arr) {
          if(newArr.indexOf(element) === -1){
            newArr.push(element)
          }
        }

      } else if (isSorted) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] !== arr[i+1]) {
            newArr.push(arr[i])
          }
        }
      }

      if (!!cb) {
        let modifiedElements = []
        let keptElements = []
        for (const element of newArr) {
          const modElement = cb(element)
          if ((modifiedElements.indexOf(modElement)) === -1) {
            modifiedElements.push(modElement)
            keptElements.push(element)
          } 
        }
        newArr = [...keptElements]
      }
      return newArr
    },

    //Object Functions
    keys: function(obj) {
      const keys = []
      for (const key in obj) {
        keys.push(key)
      }
      return keys
    },
    
    values: function(obj) {
      const values = []
      for (const key in obj) {
        values.push(obj[key])
      }
      return values
    },

    functions: function(obj){
      let functionNames = []
      for (const key in obj) {
        if (typeof obj[key] === "function") {
          functionNames.push(key)
        }
      }
      return functionNames
    }
  }
})()

fi.libraryMethod()
