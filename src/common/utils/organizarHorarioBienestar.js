
const organizarHorarioBienestar = (e) => {
    const groupBy = (input, key) => {
        return input.reduce((acc, currentValue) => {
            let groupKey = currentValue[key];
            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(currentValue);
            return acc;
        }, {});
    };

    const array2 = [];
    const materias3 = groupBy(e, "fecha");
    for (const x in materias3) {
        let key = x;
        let value = materias3[x];
        array2.push({
            date: key,
            franjas: value,
        });
    }
    let cortes = null;
    let array3 = [];


    array2.forEach((e, index) => {
        cortes = groupBy(e.franjas, "franjasIdFranja");

        for (const key in cortes) {
            array3.push({
                id_horario: key,
                nombre: cortes[key][0].nombreFranja,
            });
        }
        array2[index].franjas = [...array3];
        array3 = [];
    })

    return array2;
}

module.exports = {
    organizarHorarioBienestar
}