using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;

public class TileRespawner : MonoBehaviour
{
    [Header("Tilemap to respawn on")]
    public Tilemap tilemap;

    private class BrokenTile
    {
        public Vector3Int position;
        public RegeneratingTile tile;
        public float respawnTime;
    }

    private List<BrokenTile> brokenTiles = new List<BrokenTile>();

    void Update()
    {
        for (int i = brokenTiles.Count - 1; i >= 0; i--)
        {
            brokenTiles[i].respawnTime -= Time.deltaTime;
            if (brokenTiles[i].respawnTime <= 0f)
            {
                // respawn the tile
                tilemap.SetTile(brokenTiles[i].position, brokenTiles[i].tile);
                brokenTiles.RemoveAt(i);
            }
        }
    }

    // Call this from Mining.cs when a tile breaks
    public void RegisterBrokenTile(Vector3Int position, RegeneratingTile tile)
    {
        brokenTiles.Add(new BrokenTile
        {
            position = position,
            tile = tile,
            respawnTime = tile.regenTime
        });
    }
}