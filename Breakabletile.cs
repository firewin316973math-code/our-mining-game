using UnityEngine;
using UnityEngine.Tilemaps;

[CreateAssetMenu(fileName = "NewBreakableTile", menuName = "Tiles/Breakable Tile")]
public class BreakableTile : Tile
{
    public float breakTime = 1f;
}