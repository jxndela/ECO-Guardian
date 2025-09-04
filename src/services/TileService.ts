import { Location, MapTile } from '@/types';

/**
 * Utility service for working with slippy map tiles.
 * This mimics the grid based world navigation used in games like Pokémon GO.
 */
export class TileService {
  private readonly defaultZoom = 15;

  /**
   * Convert a geographic location to a map tile coordinate.
   * @param location Geographic coordinates.
   * @param zoom Zoom level for the tile grid.
   */
  getTileFromLocation(location: Location, zoom: number = this.defaultZoom): MapTile {
    const latRad = location.latitude * Math.PI / 180;
    const n = 2 ** zoom;
    const x = Math.floor((location.longitude + 180) / 360 * n);
    const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
    return { x, y, zoom };
  }

  /**
   * Get surrounding tiles around a location within a given range.
   * @param location Center location.
   * @param range Number of tiles around the center tile to include.
   * @param zoom Zoom level.
   */
  getSurroundingTiles(location: Location, range: number = 1, zoom: number = this.defaultZoom): MapTile[] {
    const center = this.getTileFromLocation(location, zoom);
    const tiles: MapTile[] = [];
    for (let dx = -range; dx <= range; dx++) {
      for (let dy = -range; dy <= range; dy++) {
        tiles.push({ x: center.x + dx, y: center.y + dy, zoom });
      }
    }
    return tiles;
  }
}

