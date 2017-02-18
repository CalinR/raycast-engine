import Door from './door'

const mapBuilder = (mapData, doors, enemyData, canvas) => {
    let map = mapData.map((rows) => {
        return rows.map((tile) => {
            if(doors.indexOf(tile) > -1){
                return new Door({ tile })
            }
            else {
                return tile;
            }
        });
    })

    let context = canvas.getContext('2d');

    let enemies = enemyData.map((enemy) => {
        enemy.canvas = canvas;
        enemy.context = context;
        return enemy;
    })

    return {
        data: map,
        enemies: enemies,
        width: map[0].length,
        height: map.length
    }
}

export default mapBuilder;