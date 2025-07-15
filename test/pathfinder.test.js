const findpath = require('../src/pathFinder.service')

describe('path finder', () => {
    it('find a simple path with no obstacles',()=>{
        const path = findpath({
            start:{x:0,y:0,direction:'NORTH'},
            end:{x:0,y:2},
            obstacles:[]
        })
        expect(path).toBe('FF')
    })

    it('avoid the obstacle',()=>{
        const path = findpath({
           start:{x:0,y:0,direction:'NORTH'},
           end:{x:1,y:1},
           obstacles:[[0,1]]
        })
        expect(typeof path).toBe('string')
        expect(path.length).toBeGreaterThan(0)
    })
});
