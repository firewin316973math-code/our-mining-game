import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { BuildingType, Grid } from '../game/types';

const BUILDING_COLORS: Record<BuildingType, string> = {
  solar: '#f4d35e',
  garden: '#63c76b',
  farm: '#9bdc5d',
  recycle: '#49b7d0',
  rain: '#6eb8ff',
  bike: '#64d29a',
  transit: '#7a7ef9',
};

const BuildingBlock = ({ type, position }: { type: BuildingType; position: [number, number, number] }) => {
  const color = BUILDING_COLORS[type];

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[0.84, 0.76, 0.84]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[0, 0.92, 0]}>
        <boxGeometry args={[0.42, 0.2, 0.42]} />
        <meshStandardMaterial color="#dfeefc" />
      </mesh>
    </group>
  );
};

const GridTile = ({
  row,
  col,
  value,
  onClick,
}: {
  row: number;
  col: number;
  value: BuildingType | null;
  onClick: (row: number, col: number) => void;
}) => {
  if (value) {
    return (
      <group position={[col - 2.5, 0, row - 2.5]}>
        <BuildingBlock type={value} position={[0, 0, 0]} />
      </group>
    );
  }

  return (
    <mesh onClick={() => onClick(row, col)} position={[col - 2.5, -0.06, row - 2.5]} receiveShadow>
      <boxGeometry args={[0.92, 0.12, 0.92]} />
      <meshStandardMaterial color="#dfe8d8" />
    </mesh>
  );
};

export function CityScene({ grid, onCellClick }: { grid: Grid; onCellClick: (row: number, col: number) => void }) {
  return (
    <div className="city-wrap">
      <Canvas shadows camera={{ position: [9, 9, 9], fov: 38 }}>
        <color attach="background" args={['#dff7ff']} />
        <ambientLight intensity={1.2} />
        <directionalLight castShadow position={[7, 11, 6]} intensity={1.4} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#d8f0be" />
        </mesh>

        <group rotation={[0, Math.PI / 4, 0]}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <GridTile key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} value={cell} onClick={onCellClick} />
            )),
          )}
        </group>

        <OrbitControls enablePan enableZoom minDistance={7} maxDistance={16} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
