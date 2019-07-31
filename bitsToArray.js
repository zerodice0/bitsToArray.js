function bitsToArray(paramOption) {
  //values
  var _max = 32;
  var _array = [0, 0];
  
  if((paramOption != undefined) && (paramOption.max != undefined)) {
    _max = paramOption.max;
  }

  return {
    getArray:function(paramArrayIndex){
      if(paramArrayIndex == undefined) {
        return _array;
      } else if(paramArrayIndex < _array.length){
        return _array[paramArrayIndex];
      } 
  
      return null;
    }, 
    getMax:function(){
      return _max;
    },
    get:function(paramBitIndex) {
      var arrayIndex = parseInt(paramBitIndex / _max);
      var bitsIndex = parseInt(paramBitIndex % _max);
  
      if(arrayIndex > 2) {
        return -1;
      }
  
      return _array[arrayIndex] & (1<<bitsIndex);
    },
    getBoolean:function(paramBitIndex) {
      var arrayIndex = parseInt(paramBitIndex / _max);
      var bitsIndex = parseInt(paramBitIndex % _max);
  
      if(arrayIndex > 2) {
        return -1;
      }
  
      return (_array[arrayIndex] & (1<<bitsIndex)) != 0;
    },
    set:function(paramBitIndex) {
      var arrayIndex = parseInt(paramBitIndex / _max);
      var bitsIndex = parseInt(paramBitIndex % _max);
      
      if(arrayIndex > 2) {
        return -1;
      }
  
      _array[arrayIndex] |= (1<<bitsIndex);
  
      return {
        index: arrayIndex,
        bitmask: _array[arrayIndex]
      };
    },
    del:function(paramBitIndex) {
      var arrayIndex = parseInt(paramBitIndex / _max);
      var bitsIndex = parseInt(paramBitIndex % _max);
  
      if(arrayIndex > 2) {
        return -1;
      }
  
      _array[arrayIndex] &= ~(1<<bitsIndex);
  
      return {
        index: arrayIndex,
        bitmask: _array[arrayIndex]
      }
    }
  };

}

