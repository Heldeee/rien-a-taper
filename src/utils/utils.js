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

// Fonction pour trier les stations en fonction de leurs adjacences
function sortByAdjacency(stations) {
    const sortedStations = [];
    // Définir une liste temporaire pour stocker les stations déjà triées
    const temp = [];

    // Fonction récursive pour trier les stations
    function sort(station) {
        if (!temp.includes(station.id)) {
            // Ajouter la station à la liste triée
            sortedStations.push(station);
            temp.push(station.id);

            // Récupérer les stations adjacentes de la station actuelle
            const adjacentStations = station.adj.map(adj => stations.find(s => s.id === adj));

            // Trier les stations adjacentes et les trier récursivement
            adjacentStations.sort((a, b) => a.id.localeCompare(b.id));
            adjacentStations.forEach(adjStation => sort(adjStation));
        }
    }

    // Trier les stations initiales
    stations.forEach(station => {
        console.log("id:", station.id, "station: ", station);
        if (!temp.includes(station.id)) {
            sort(station);
        }
    });

    return sortedStations;
}


module.exports = {
    findStationById,
    calculatePresenceScore,
    sortByAdjacency
};

