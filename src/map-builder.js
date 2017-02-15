import Door from './door'

const mapBuilder = (mapData, doors) => {
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

    return {
        data: map,
        width: map[0].length,
        height: map.length
    }
}

export default mapBuilder;