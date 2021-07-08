class Rover {
   // Write code here!
  constructor(position = 0) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    this.message = message;
    let steps = message.commands;
    let results = [];
    let roverStatus = {
      mode: this.mode,
      generatorWatts: this.generatorWatts,
      position: this.position
    };

      for (let i = 0; i < steps.length; i++) {
        let currentCommand = steps[i];
        if (currentCommand != 'STATUS_CHECK') {
          let returnObject = {
            completed: true
          }
          results[i] = returnObject;
        }
        else {
          let returnObject = {
            completed: true,
            roverStatus: this.roverStatus
          };
          results[i] = returnObject;


        }
      }
      let response = {
        message: message.name,
        results
      };
      return response;
  }
}

module.exports = Rover;