// api-mapper.js
import Map from '../utils/map'; // Sesuaikan path dengan lokasi file map.js Anda

export async function reportMapper(story) {
  return {
    id: story.id,
    title: story.description.substring(0, 50) + (story.description.length > 50 ? '...' : ''),
    description: story.description,
    imageUrl: story.photoUrl,
    evidenceImages: story.photoUrl ? [story.photoUrl] : [], // Tambahkan evidenceImages sebagai array
    createdAt: story.createdAt,
    location: {
      latitude: story.lat || 0,
      longitude: story.lon || 0,
      placeName: story.lat && story.lon ?
        await Map.getPlaceNameByCoordinate(story.lat, story.lon) : 'Lokasi tidak tersedia'
    },
    reporter: {
      id: story.id,
      name: story.name
    }
  };
}