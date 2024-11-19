'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { FC, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface ModelProps {
    url: string;
    floorNumber?: number;
}

const Model: FC<ModelProps> = ({ url, floorNumber }) => {
    const { scene } = useGLTF(url); // useGLTF hook을 사용해 .glb 파일 로드
    const [roofTopMeshes, setRoofTopMeshes] = useState<THREE.Mesh[]>([]);
    const [f5Meshes, setF5Meshes] = useState<THREE.Mesh[]>([]);
    const [f4Meshes, setF4Meshes] = useState<THREE.Mesh[]>([]);
    const [f3Meshes, setF3Meshes] = useState<THREE.Mesh[]>([]);
    const [f2Meshes, setF2Meshes] = useState<THREE.Mesh[]>([]);
    const [f1Meshes, setF1Meshes] = useState<THREE.Mesh[]>([]);
    const [b1Meshes, setB1Meshes] = useState<THREE.Mesh[]>([]); // b1로 시작하는 Mesh들 저장

    useEffect(() => {
        if (scene) {
            const roofTopMeshesArray: THREE.Mesh[] = [];
            const f5MeshesArray: THREE.Mesh[] = [];
            const f4MeshesArray: THREE.Mesh[] = [];
            const f3MeshesArray: THREE.Mesh[] = [];
            const f2MeshesArray: THREE.Mesh[] = [];
            const f1MeshesArray: THREE.Mesh[] = [];
            const b1MeshesArray: THREE.Mesh[] = [];
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    if(object.material.name.startsWith('roofTop')) roofTopMeshesArray.push(object);
                    if(object.material.name.startsWith('5F') || object.material.name.startsWith('f5')) f5MeshesArray.push(object);
                    if(object.material.name.startsWith('4F') || object.material.name.startsWith('f4')) f4MeshesArray.push(object);
                    if(object.material.name.startsWith('3F') || object.material.name.startsWith('f3')) f3MeshesArray.push(object);
                    if(object.material.name.startsWith('2F') || object.material.name.startsWith('f2')) f2MeshesArray.push(object);
                    if(object.material.name.startsWith('1F') || object.material.name.startsWith('f1')) f1MeshesArray.push(object);
                    if(object.material.name.startsWith('b1')) b1MeshesArray.push(object);
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
        if(floorNumber === 5) {
            f5Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh && mesh.name === 'f5_s1__0') {
                    gsap.to(mesh.position, {
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
                if (mesh instanceof THREE.Mesh && mesh.name === 'f5_s1__0') {
                    gsap.to(mesh.position, {
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
                if (mesh instanceof THREE.Mesh && mesh.name !== 'f5_s1__0') {
                    gsap.to(mesh.position, {
                        y: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
        if(floorNumber === 4) {
            f4Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh && (mesh.name === 'f4_s1__0' || mesh.name === 'f4_s2__0')) {
                    gsap.to(mesh.position, {
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
                if (mesh instanceof THREE.Mesh && mesh.name !== 'f4_s1__0' && mesh.name !== 'f4_s2__0') {
                    gsap.to(mesh.position, {
                        y: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
        if(floorNumber === 3) {
            f3Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh && (mesh.name === 'f3_s1__0' || mesh.name === 'f3_s2__0')) {
                    gsap.to(mesh.position, {
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
                if (mesh instanceof THREE.Mesh && mesh.name !== 'f3_s1__0' && mesh.name !== 'f3_s2__0') {
                    gsap.to(mesh.position, {
                        y: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
        if(floorNumber === 2) {
            f2Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh && (mesh.name === 'f2_s1__0' || mesh.name === 'f2_s2__0')) {
                    gsap.to(mesh.position, {
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
                if (mesh instanceof THREE.Mesh && mesh.name !== 'f2_s1__0' && mesh.name !== 'f2_s2__0') {
                    gsap.to(mesh.position, {
                        y: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
        if(floorNumber === 1) {
            f1Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh && (mesh.name === 'f1_s1__0' || mesh.name === 'f1_s2__0')) {
                    gsap.to(mesh.position, {
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
                if (mesh instanceof THREE.Mesh && mesh.name !== 'f1_s1__0' && mesh.name !== 'f1_s2__0') {
                    gsap.to(mesh.position, {
                        y: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
        if(floorNumber === 0) {
            b1Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh) {
                    if (mesh.name === 'b1_s1__0') {
                        gsap.to(mesh.position, {
                            z: -100,
                            duration: 0.5, // 애니메이션 시간 (초)
                        });
                    }
                    if (mesh.name !== 'b1_s1__0') {
                        gsap.to(mesh.position, {
                            y: -100,
                            duration: 0.5, // 애니메이션 시간 (초)
                        });
                    }
                    if (mesh.name === 'CABINE_step_STEP_2_3_b1_0' || mesh.name === 'CABINE_step_STEP_3_b1_0') {
                        gsap.to(mesh.position, {
                            y: 100,
                            duration: 0.5, // 애니메이션 시간 (초)
                        });
                    }
                }
            });
        }
    }, [b1Meshes, f1Meshes, f2Meshes, f3Meshes, f4Meshes, f5Meshes, roofTopMeshes, floorNumber]);

    return <primitive object={scene} />;
};

const ModelViewer: FC<{ floorNumber?: number }> = ({ floorNumber }) => {
    // const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([7, 8, 10]);

    return (
        <>
            <Canvas className="model-canvas" camera={{position: [7, 8, 10], fov: 20}}>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[0, 5, 5]} intensity={1}/>
                <OrbitControls enableZoom={true}/>
                <Model url="/model/noinCenterModeling_rev1.glb" floorNumber={floorNumber}/>
                {/* 카메라 위치 제어 */}
                {/*<CameraController newPosition={cameraPosition}/>*/}
            </Canvas>
        </>
    );
};

export default ModelViewer;
