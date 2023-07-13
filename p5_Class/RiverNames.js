class RiverNames {
  constructor(array) {
    this.locNamesArr = [];
    this.checkSpillCount = 1;
    this.spills = array.outflows;

    //check theres spill count then add names to an array
    for (const element of this.spills) {
      if (element.spillCount >= checkSpillCount && element.recWaterName !="") {
        this.locNamesArr.push(element.recWaterName);
      }
    }
    
  }

  getName(i) {
    return this.locNamesArr[i];
  }
  
  saveNames(){
save(this.locNamesArr, 'my.txt');
  }
}
