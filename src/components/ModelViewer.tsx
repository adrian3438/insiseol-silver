'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {FC, useEffect, useRef, useState} from 'react';
import * as THREE from 'three';

interface ModelProps {
    url: string;
    floorName?: string;
}

const Model: FC<ModelProps> = ({ url, floorName }) => {
    const { scene, animations } = useGLTF(url); // useGLTF hook을 사용해 .glb 파일 로드
    const [roofTopMeshes, setRoofTopMeshes] = useState<THREE.Mesh[]>([]);
    const [f5Meshes, setF5Meshes] = useState<THREE.Mesh[]>([]);
    const [f4Meshes, setF4Meshes] = useState<THREE.Mesh[]>([]);
    const [f3Meshes, setF3Meshes] = useState<THREE.Mesh[]>([]);
    const [f2Meshes, setF2Meshes] = useState<THREE.Mesh[]>([]);
    const [f1Meshes, setF1Meshes] = useState<THREE.Mesh[]>([]);
    const [b1Meshes, setB1Meshes] = useState<THREE.Mesh[]>([]); // b1로 시작하는 Mesh들 저장



    const mixer = useRef<THREE.AnimationMixer | null>(null);



    useEffect(() => {

        // AnimationMixer 초기화


        if (scene) {
            if (animations.length) {
                mixer.current = new THREE.AnimationMixer(scene); // AnimationMixer 생성

                animations.forEach((clip) => {
                    const action = mixer.current?.clipAction(clip); // 각 애니메이션에 대한 Action 생성
                    action?.play(); // 애니메이션 재생
                });
            }

            const roofTopMeshesArray: THREE.Mesh[] = [];
            const f5MeshesArray: THREE.Mesh[] = [];
            const f4MeshesArray: THREE.Mesh[] = [];
            const f3MeshesArray: THREE.Mesh[] = [];
            const f2MeshesArray: THREE.Mesh[] = [];
            const f1MeshesArray: THREE.Mesh[] = [];
            const b1MeshesArray: THREE.Mesh[] = [];
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    if(object.material.name.startsWith('roofTop')) roofTopMeshesArray.push(object); // 'b1'로 시작하는 Mesh들을 배열에 추가
                    if(object.material.name.startsWith('5F')) f5MeshesArray.push(object); // 'b1'로 시작하는 Mesh들을 배열에 추가
                    if(object.material.name.startsWith('4F')) f4MeshesArray.push(object); // 'b1'로 시작하는 Mesh들을 배열에 추가
                    if(object.material.name.startsWith('3F')) f3MeshesArray.push(object); // 'b1'로 시작하는 Mesh들을 배열에 추가
                    if(object.material.name.startsWith('2F')) f2MeshesArray.push(object); // 'b1'로 시작하는 Mesh들을 배열에 추가
                    if(object.material.name.startsWith('1F')) f1MeshesArray.push(object); // 'b1'로 시작하는 Mesh들을 배열에 추가
                    if(object.material.name.startsWith('b1')) b1MeshesArray.push(object); // 'b1'로 시작하는 Mesh들을 배열에 추가
                }

            });
            setRoofTopMeshes(roofTopMeshesArray); // Mesh 배열로 저장
            setF5Meshes(f5MeshesArray); // Mesh 배열로 저장
            setF4Meshes(f4MeshesArray); // Mesh 배열로 저장
            setF3Meshes(f3MeshesArray); // Mesh 배열로 저장
            setF2Meshes(f2MeshesArray); // Mesh 배열로 저장
            setF1Meshes(f1MeshesArray); // Mesh 배열로 저장
            setB1Meshes(b1MeshesArray); // Mesh 배열로 저장
        }
    }, [scene]);

    useEffect(() => {
        if(floorName && floorName === 'B1') {
            b1Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh) {
                    mesh.position.y = -10;
                }
            });
        }
    }, [b1Meshes, f1Meshes, f2Meshes, f3Meshes, f4Meshes, f5Meshes, roofTopMeshes, floorName]);

    // 바닥 그리드 추가
    const gridHelper = new THREE.GridHelper(200, 200);
    scene.add(gridHelper);

    return <primitive object={scene} />;
};

interface Props {
    floorName?: string;
}

const ModelViewer: FC = ({floorName} : Props) => {
    return (
        <Canvas className="model-canvas" camera={{ position: [7, 8, 10], fov: 20 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            <OrbitControls enableZoom={true} />
            <Model url="/model/noinCenterModeling.glb" floorName={floorName}/> {/* .glb 파일 경로 지정 */}
        </Canvas>
    );
};

export default ModelViewer;
