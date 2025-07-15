const directions = ['NORTH','EAST','SOUTH','WEST'] 
                //    0        1      2       3    clockwise direction 

const steps = {
    NORTH:[0,1],
    EAST:[1,0],
    SOUTH:[0,-1],
    WEST:[-1,0]
}

function isObstacle(x,y,obstacles){
    return obstacles.some(([ox,oy])=> ox === x && oy === y)

}

function process ({x,y,direction,obstacles=[],commands}){

    let stopped=false

    const handler ={
        F:()=>{
            const [dx,dy]=steps[direction]
            const nextX = dx + x
            const nextY = dy + y

            if(isObstacle(nextX,nextY,obstacles)){
                stopped=true
                return
            }
            x = nextX 
            y = nextY
        },

        B:()=>{
            const [dx,dy]=steps[direction]
            const nextX = x - dx
            const nextY = y - dy
            if(isObstacle(nextX,nextY,obstacles)){
                stopped = true
                return
            }
            x = nextX
            y = nextY
        },
        
        R:()=>{
            const index = directions.indexOf(direction)
            direction = directions[(index+1)%4]
        },

        L:()=>{
            const index = directions.indexOf(direction)
            direction = directions[(index+3)%4]
        }
    }

    for(const command of commands){
        if(stopped) break
        handler[command]?.()
    }

    return {x,y,direction,message:stopped ? "STOPPED" : "OK"}
}

module.exports = process