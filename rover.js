class Rover {
   // Write code here!
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let response = {
    message: message.name,
    results: []
    }
    let roverStatus={
      mode: this.mode,
      generatorWatts: this.generatorWatts,
      position: this.position
    }
   let cmdarray = message.commands;

   for(let i=0; i<cmdarray.length; i++) {
     if(message.commands[i].commandType === 'STATUS_CHECK'){
       response.results.push({completed:true,roverStatus:{mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
     }
     else if (message.commands[i].commandType === 'MODE_CHANGE') {
       this.mode = message.commands[i].value;
       response.results.push({completed:true})
     }
     else if (message.commands[i].commandType === 'MOVE'){
       if(this.mode === 'LOW_POWER') {
         response.results.push({completed:false});
       } else {
        this.position = message.commands[i].value;
        response.results.push({completed:true})
       }
     }
   }
   return response; 
  }
  
}

module.exports = Rover;