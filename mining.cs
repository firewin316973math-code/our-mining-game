using UnityEngine;
using UnityEngine.Tilemaps;
using UnityEngine.InputSystem; // for new Input System

public class Mining : MonoBehaviour
{
    [Header("Tilemap")]
    public Tilemap tilemap;  // Drag the Tilemap object from Hierarchy here

    [Header("Respawner")]
    public TileRespawner tileRespawner; // Drag the TileManager object here

    [Header("Mining Settings")]
    public float toolSpeed = 1f; // Multiplier for mining speed

    private Vector3Int currentTilePos;
    private float breakTimer;

    void Update()
    {
        if (tilemap == null) return; // safety check

        // check if left mouse button is pressed
        if (!Mouse.current.leftButton.isPressed)
        {
            breakTimer = 0f; // reset timer if not holding
            return;
        }

        // get mouse position in world space
        Vector2 mousePos = Mouse.current.position.ReadValue();
        Vector3 worldPos = Camera.main.ScreenToWorldPoint(mousePos);
        worldPos.z = 0f;

        // convert to tile coordinates
        Vector3Int cellPos = tilemap.WorldToCell(worldPos);

        // get the tile at that position
        TileBase tile = tilemap.GetTile(cellPos);
        if (tile == null) return;

        BreakableTile breakable = tile as BreakableTile;
        if (breakable == null) return;

        // reset timer if moved to a new tile
        if (cellPos != currentTilePos)
        {
            breakTimer = 0f;
            currentTilePos = cellPos;
        }

        // increment mining timer
        breakTimer += Time.deltaTime * toolSpeed;

        // break the tile if timer exceeds breakTime
        if (breakTimer >= breakable.breakTime)
        {
            tilemap.SetTile(cellPos, null); // remove tile
            breakTimer = 0f;

            // if it's a regenerating tile, notify the TileRespawner
            RegeneratingTile regenTile = breakable as RegeneratingTile;
            if (regenTile != null && tileRespawner != null)
            {
                tileRespawner.RegisterBrokenTile(cellPos, regenTile);
            }
        }
    }
}