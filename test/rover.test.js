const process = require('../src/rover.service')

describe('mars rover',()=>{
    it('moves',()=>{
        const result = process({x:0,y:0,direction:'NORTH',obstacles:[],commands:'FF'}) 
        expect(result).toEqual({x:0,y:2,direction:'NORTH',message:'OK'})
    })
    it('meets obstacle',()=>{
        const result = process({x:0,y:0,direction:'NORTH',obstacles:[[0,1]],commands:'F'})
        expect(result).toEqual({x:0,y:0,direction:'NORTH',message:'STOPPED'})
    })
})

