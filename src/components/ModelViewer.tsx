'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {FC, useEffect, useState} from 'react';
import * as THREE from 'three';

interface ModelProps {
    url: string;
    floorName?: string;
}

const Model: FC<ModelProps> = ({ url, floorName }) => {
    const { scene } = useGLTF(url); // useGLTF hook을 사용해 .glb 파일 로드
    const [roofTopMeshes, setRoofTopMeshes] = useState<THREE.Mesh[]>([]);
    const [f5Meshes, setF5Meshes] = useState<THREE.Mesh[]>([]);
    const [f4Meshes, setF4Meshes] = useState<THREE.Mesh[]>([]);
    const [f3Meshes, setF3Meshes] = useState<THREE.Mesh[]>([]);
    const [f2Meshes, setF2Meshes] = useState<THREE.Mesh[]>([]);
    const [f1Meshes, setF1Meshes] = useState<THREE.Mesh[]>([]);
    const [b1Meshes, setB1Meshes] = useState<THREE.Mesh[]>([]); // b1로 시작하는 Mesh들 저장

    /* S: animation 실행 */
    // let mixer = new THREE.AnimationMixer(scene);
    // let renderer = new THREE.WebGLRenderer();
    // document.body.appendChild(renderer.domElement);
    // let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // animations.forEach((clip) => {
    //     const action = mixer.clipAction(clip);
    //     action.play();
    // });
    // const animate = () => {
    //     requestAnimationFrame(animate);
    //     if (mixer) {
    //         mixer.update(0.016);
    //     }
    //     renderer.render(scene, camera);
    // };
    // animate();
    /* E: animation 실행 */

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
        if(floorName && floorName === '5F') {
            f5Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh) {
                    mesh.position.y = -100;
                }
            });
        }
        if(floorName && floorName === '4F') {
            f4Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh) {
                    mesh.position.y = -100;
                }
            });
        }
        if(floorName && floorName === '3F') {
            f3Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh) {
                    mesh.position.y = -100;
                }
            });
        }
        if(floorName && floorName === '2F') {
            f2Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh) {
                    mesh.position.y = -100;
                }
            });
        }
        if(floorName && floorName === '1F') {
            f1Meshes.forEach((mesh) => {
                if (mesh instanceof THREE.Mesh) {
                    let i = 5;
                    const animate = setInterval(function () {
                        i++;
                        mesh.position.y = -i;
                        if(i >= 100) {
                            clearInterval(animate);
                        }
                    },5);
                }
            });
        }
        if(floorName && floorName === 'B1') {
            b1Meshes.forEach((mesh) => {
                console.log('mesh : ', mesh);
                if (mesh instanceof THREE.Mesh) {
                    let i = 5;
                    const animate = setInterval(function () {
                        i++;
                        mesh.position.y = -i;
                        if(i >= 100) {
                            clearInterval(animate);
                        }
                    },5);
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

const ModelViewer: FC<{ floorName?: string }> = ({ floorName }) => {
    return (
        <Canvas className="model-canvas" camera={{ position: [7, 8, 10], fov: 20 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            <OrbitControls enableZoom={true} />
            <Model url="/model/noinCenterModeling.glb" floorName={floorName} /> {/* floorName을 Model에 전달 */}
        </Canvas>
    );
};

export default ModelViewer;
