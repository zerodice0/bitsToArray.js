function bitsToArrays(param_options) {
  //values
  this._max = 32;
  this._array = [0, 0];
  
  if((param_options != undefined) && (param_options.max != undefined)) {
    this._max = param_options.max;
  }
}

bitsToArrays.prototype = {
  getArray: function(param_array_index){
    if(param_array_index == undefined) {
      return this._array;
    } else if(param_array_index < this._array.length){
      return this._array[param_array_index];
    } 

    return null;
  },
  getMax: function(){
    return this._max;
  },
  get: function(param_bit_index) {
    var array_index = parseInt(param_bit_index / this._max);
    var bits_index = parseInt(param_bit_index % this._max);

    if(array_index > 2) {
      return -1;
    }

    return this._array[array_index] &= (1<<bits_index);
  },
  set: function(param_bit_index) {
    var array_index = parseInt(param_bit_index / this._max);
    var bits_index = parseInt(param_bit_index % this._max);
    
    if(array_index > 2) {
      return -1;
    }

    this._array[array_index] |= (1<<bits_index);

    return true;
  },
  del: function(param_bit_index) {

  }
}