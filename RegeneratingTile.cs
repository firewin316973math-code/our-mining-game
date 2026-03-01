using UnityEngine;
using UnityEngine.Tilemaps;

[CreateAssetMenu(fileName = "NewRegeneratingTile", menuName = "Tiles/Regenerating Tile")]
public class RegeneratingTile : BreakableTile
{
    [Header("Regeneration")]
    public float regenTime = 5f; // seconds until tile respawns
}