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

const rotation = {
    L:direction => directions[(directions.indexOf(direction)+3)%4],
    R:direction => directions[(directions.indexOf(direction)+1)%4]
}

const move = {
    F:(x,y,direction)=>{
        const [dx,dy] = steps[direction]
        return [x + dx , y + dy]
    },

    B:(x,y,direction)=>{
        const [dx,dy]= steps[direction]
        return [x - dx , y - dy]
    }
}

function simulateMove(state,command){

    const {x,y,direction} = state

    const isRotate= command==='L' || command === 'R'

    const newRotate = isRotate?rotation[command](direction):direction

    const [newX,newY] = move[command] ? move[command](x,y,direction):[x,y]

    return{x:newX,y:newY,direction:newRotate}
}

function pathFinder({start,end,obstacles}){
    const queue = [{...start,path:''}] //this will always have our current position

    const visited = new Set() //this will store all the places that we have been at before

    while(queue.length){
        const current = queue.shift()

        const key = `${current.x},${current.y},${current.direction}`
        
        if(!visited.has(key)){
            visited.add(key)
        }

        if(current.x === end.x && current.y === end.y){
            return current.path
        }

        //here we will loop through each command , and store the simulatedmoves , and the obstacles and also the new position 
        //then we will check , if there's no obstacles and the new key isn't registered before 
        //then we will push the new position in the queue , so that will be used to actually move the rover

        ['F','B','L','R'].forEach(comm=>{ 
            const next = simulateMove(current,comm)
            const obstacle = isObstacle(next.x,next.y,obstacles)
            const newKey = `${next.x},${next.y},${next.direction}`

            if(!obstacle && !visited.has(newKey)){
                queue.push({...next,path:current.path + comm})
            }
        })
    }

    return null

}

module.exports = pathFinder