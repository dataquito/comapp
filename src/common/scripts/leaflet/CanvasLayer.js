import { GridLayer, DomUtil } from 'leaflet';
const CanvasLayer = GridLayer.extend({
  createTile: function(coords){
    const { tileIndex, colorScale, dict, tag } = this.options;
    const zoom = this._tileZoom;
    // create a <canvas> element for drawing
    var tile = DomUtil.create('canvas', 'leaflet-tile leaflet-sedesol');
    // setup tile width and height according to the options
    var size = this.getTileSize();
    tile.width = size.x;
    tile.height = size.y;
    // get a canvas context and draw something on it using coords.x, coords.y and coords.z
    var ctx = tile.getContext('2d');
    // return the tile so it can be rendered on screen
    const tileToRender = tileIndex.getTile(coords.z, coords.x, coords.y);
    // console.log(tileToRender, coords.z, coords.x, coords.y);
    // clear canvas
    ctx.clearRect(0, 0, tile.width, tile.height);
    // console.log(coords.z, coords.x, coords.y);
    if (!tileToRender) {
      // not tile to render
      return tile;
    }
    const features = tileToRender.features;
    ctx.strokeStyle = '#fff';
    features.forEach(feature => {
      const geometries = feature.geometry;
      const value = dict[feature.tags[tag]];
      const color = colorScale(value);
      if(zoom < 8) {
        ctx.strokeStyle = 'rgba(0,0,0,0)';
      }
      ctx.globalAlpha = 0.65;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.lineWidth = 0;
      geometries.forEach(geometry => {
        const type = geometry.type;
        geometry.forEach((point, index) => {
          const pad = 0;
          const extent = 4096;
          const x = point[0] / extent * 256;
          const y = point[1] / extent * 256;
          if (index) {
            ctx.lineTo(x  + pad, y   + pad);
          } else {
            ctx.moveTo(x  + pad, y  + pad);
          }
        });
      });
      ctx.fill('evenodd');
      ctx.stroke();
    });
    return tile;
  }
});

export default CanvasLayer;
