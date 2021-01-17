function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +  Math.ceil(min)
}

class User {
    constructor(name = undefined, money = Nan) {
      this.name = name
      if(money > 0) {
          this.money = money
      }
    }

    takeMoney(money) {
        if(this.money >= money) {
            this.money = this.money - money
        }
            return money
    }

    putMoney(money) {
        this.money += money
    }

    play(money, machine) {
        this.takeMoney(money)
        let win = machine.play(money)
        this.putMoney(win)
       return  win
    }
}
  
class GameMachine 
  {
    
    constructor(number) {
      this._money = number
    }

    get getMoney() {
      return this._money
    }

    takeMoney(number) {
        if(this._money >= number) {
            this._money -= number
        }
        return number
    }

    putMoney(number) {
        if(number >= 0) {
            this._money += number
        }
    }

    play(number) {
        if(number<=this.getMoney) {
            this.putMoney(number)
            let randomNum = String(getRandomInt(100,999)).split("")
            let prize = 0
            let tempPrizeX = 1
            let prizeX = 0
            for(let i = 0;i < randomNum.length - 1;i++) {
                    for(let j = 1; j < randomNum.length; j++) {
                            if(randomNum[i] == randomNum[j]) {
                                tempPrizeX++
                            }
                        }
                    if(prizeX < tempPrizeX) {
                        prizeX = tempPrizeX
                    }
                    tempPrizeX = 0
                }
            prizeX === 1 ? number = 0 : number = number*prizeX

            this.takeMoney(number)

            return number
        }
    }
}

class Casino {
    constructor(name) {
        this.name = name
        this.machines = []
    }

    get getMoney() {
        let sum = 0
        this.machines.forEach(element => sum += element.getMoney)
        return sum
    }

    get getMachineCount() {
        return this.machines.length
    }
}

class SuperAdmin extends User {
    constructor(name,money) {
        super(name,money)
    }

    createCasino(name) {
        this.casino = new Casino(name)
    }

    addMachine(startValue) {
        if (this.casino != null) {
            let machine = new GameMachine(startValue)
            this.casino.machines.push(machine)
            this.takeMoney(startValue)
        }
    }

    putMoneyCasinoGM(numberOfMachine,number) {
        if(this.casino!=null) {
                this.takeMoney(number)
                this.casino.machines[numberOfMachine].putMoney(number)
        }
    }

    deleteMachine(i) {
        if (this.casino.machines.length != 0 && i < this.casino.machines.length && i >= 0)  {
            let cash = Math.floor((this.casino.machines[i].getMoney) / (this.casino.machines.length - 1))
            this.casino.machines.splice(i, 1)
            this.casino.machines.forEach(element => element.putMoney(cash))
        }
    }   

    takeMoneyFromCasino(number) {
        if(number <= this.casino.getMoney) {
            let tempnum = number
            this.casino.machines.sort((a,b) => b.getMoney - a.getMoney)

            for(let i=0; i < ad.casino.machines.length; i++) {
                if(tempnum >= this.casino.machines[i].getMoney) {
                    tempnum = tempnum - this.casino.machines[i].getMoney
                    this.casino.machines[i].takeMoney(this.casino.machines[i].getMoney)
                }
                else {
                    this.casino.machines[i].takeMoney(tempnum)
                    break
                }
            }
            this.putMoney(number)
            return number
        }
    }
}

const admin=new SuperAdmin("Roman",1000)
const client= new User("Barak",100)
//I create SuperAdmin and User for other tests press f12 and use console)
