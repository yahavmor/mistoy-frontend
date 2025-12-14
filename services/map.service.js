export const mapService = {
    getBranches
}

const branches = [
    { name: "תל אביב", lat: 32.0853, lng: 34.7818 },
    { name: "ירושלים", lat: 31.7683, lng: 35.2137 },
    { name: "חיפה", lat: 32.7940, lng: 34.9896 },
    { name: "באר שבע", lat: 31.2520, lng: 34.7915 },
    { name: "רמת גן", lat: 32.1093, lng: 34.8555 },
    { name: "נתניה", lat: 32.3215, lng: 34.8532 },
    { name: "הרצליה", lat: 32.1710, lng: 34.8434 },
    { name: "טבריה", lat: 32.7080, lng: 35.2950 },
    { name: "אשדוד", lat: 31.6693, lng: 34.5715 },
    { name: "חולון", lat: 32.0490, lng: 34.7610 }
]

function getBranches() {
    return branches
}
