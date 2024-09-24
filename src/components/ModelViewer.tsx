'use client';

import {Canvas, useFrame} from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {FC, useRef} from 'react';
import * as THREE from 'three';

interface ModelProps {
    url: string;
}

const Model: FC<ModelProps> = ({ url }) => {
    const { scene } = useGLTF(url); // useGLTF hook을 사용해 .glb 파일 로드
    const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);

    useFrame(() => {
        if (materialRef.current && materialRef.current.map) {
            materialRef.current.map.offset.x += 0.01; // 텍스처를 X축으로 이동
        }
    });

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            const mesh = object as THREE.Mesh;
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
                materialRef.current = mesh.material;
                if (mesh.material.map) {
                    // 텍스처의 반복 설정 (필수)
                    mesh.material.map.wrapS = THREE.RepeatWrapping;
                    mesh.material.map.wrapT = THREE.RepeatWrapping;
                }
            }
        }
    });

    const gridHelper = new THREE.GridHelper( 20, 20 );
    scene.add( gridHelper );

    return <primitive object={scene} />;
};

const ModelViewer: FC = () => {
    return (
        <Canvas className="model-canvas">
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            <OrbitControls enableZoom={true} />
            <Model url="/model/noin.glb" /> {/* .glb 파일 경로 지정 */}
        </Canvas>
    );
};

export default ModelViewer;
