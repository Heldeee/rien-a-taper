function findStationById(jsonData, stationId) {
    for (const key in jsonData.rer) {
        const station = jsonData.rer[key].find(station => station.id === stationId);
        if (station) {
            return station;
        }
    }
    return null;
}

const calculatePresenceScore = (station, signalType) => {
    // Seuil minimum pour considérer l'information comme vraie
    if (signalType === "presence") {
        station.control_level = station.control_level + 1;
    }
    else if (signalType === "absence") {
        station.control_level = station.control_level - 1;
    }
};



module.exports = {
    findStationById,
    calculatePresenceScore
};

