'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { FC, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface ModelProps {
    url: string;
    floorNumber?: number;
    gateway1?: any;
    gateway2?: any;
    gateway3?: any;
    fireInfoData?: any;
    fireSignal?: boolean;
}

const Model: FC<ModelProps> = ({ url, floorNumber, gateway1, gateway2, gateway3, fireInfoData, fireSignal }) => {
    const { scene, animations } = useGLTF(url); // useGLTF hook을 사용해 .glb 파일 로드
    const [f5Meshes, setF5Meshes] = useState<THREE.Mesh[]>([]);
    const [f4Meshes, setF4Meshes] = useState<THREE.Mesh[]>([]);
    const [f3Meshes, setF3Meshes] = useState<THREE.Mesh[]>([]);
    const [f2Meshes, setF2Meshes] = useState<THREE.Mesh[]>([]);
    const [f1Meshes, setF1Meshes] = useState<THREE.Mesh[]>([]);
    const [b1Meshes, setB1Meshes] = useState<THREE.Mesh[]>([]); // b1로 시작하는 Mesh들 저장

    useEffect(() => {
        if (scene) {
            const f5MeshesArray: THREE.Mesh[] = [];
            const f4MeshesArray: THREE.Mesh[] = [];
            const f3MeshesArray: THREE.Mesh[] = [];
            const f2MeshesArray: THREE.Mesh[] = [];
            const f1MeshesArray: THREE.Mesh[] = [];
            const b1MeshesArray: THREE.Mesh[] = [];
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    if(object.material.name.startsWith('5F') || object.material.name.startsWith('f5')) f5MeshesArray.push(object);
                    if(object.material.name.startsWith('4F') || object.material.name.startsWith('f4')) f4MeshesArray.push(object);
                    if(object.material.name.startsWith('3F') || object.material.name.startsWith('f3')) f3MeshesArray.push(object);
                    if(object.material.name.startsWith('2F') || object.material.name.startsWith('f2')) f2MeshesArray.push(object);
                    if(object.material.name.startsWith('1F') || object.material.name.startsWith('f1')) f1MeshesArray.push(object);
                    if(object.material.name.startsWith('b1')) b1MeshesArray.push(object);
                }
            });
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
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            f4Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    z: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            f3Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    z: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            f2Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    z: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            f1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    z: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            b1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    z: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
        }
        if(floorNumber === 4) {
            f5Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            f4Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f4_s1__0' || mesh.name === 'f4_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f3Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f3_s1__0' || mesh.name === 'f3_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f2Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f2_s1__0' || mesh.name === 'f2_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f1_s1__0' || mesh.name === 'f1_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            b1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'base') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
        if(floorNumber === 3) {
            f5Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            f4Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f4_s1__0' || mesh.name === 'f4_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f3Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f3_s1__0' || mesh.name === 'f3_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f2Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f2_s1__0' || mesh.name === 'f2_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f1_s1__0' || mesh.name === 'f1_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            b1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'base') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
        if(floorNumber === 2) {
            f5Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            f4Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f4_s1__0' || mesh.name === 'f4_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f3Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f3_s1__0' || mesh.name === 'f3_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f2Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f2_s1__0' || mesh.name === 'f2_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f1_s1__0' || mesh.name === 'f1_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            b1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'base') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
        if(floorNumber === 1) {
            f5Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            f4Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f4_s1__0' || mesh.name === 'f4_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f3Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f3_s1__0' || mesh.name === 'f3_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f2Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f2_s1__0' || mesh.name === 'f2_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f1_s1__0' || mesh.name === 'f1_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            b1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'base') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
        if(floorNumber === 0) {
            f5Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
            });
            f4Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f4_s1__0' || mesh.name === 'f4_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f3Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f3_s1__0' || mesh.name === 'f3_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f2Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f2_s1__0' || mesh.name === 'f2_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            f1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'f1_s1__0' || mesh.name === 'f1_s2__0') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: 0,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
            b1Meshes.forEach((mesh) => {
                gsap.to(mesh.position, {
                    y: -100,
                    duration: 0.5, // 애니메이션 시간 (초)
                });
                if (mesh.name === 'base') {
                    gsap.to(mesh.position, {
                        y: 0,
                        z: -100,
                        duration: 0.5, // 애니메이션 시간 (초)
                    });
                }
            });
        }
    }, [b1Meshes, f1Meshes, f2Meshes, f3Meshes, f4Meshes, f5Meshes, floorNumber]);

    useEffect(() => {
        //화재 센서 애니메이션
        if(gateway1) {
            b1Meshes.forEach((mesh) => {
                if (mesh.name === 'b1_s1_2_b1-s1_0') {
                    gsap.to(mesh.scale, {
                        duration: 0.5,
                        x: 3,
                        y: 3,
                        z: 3,
                        repeat: -1, // Keep repeating indefinitely
                        yoyo: true, // Allow scaling to oscillate back
                        ease: 'power1.inOut',
                    });
                }
            });
        }

        if(gateway2) {
            if(gateway2?.sensor1 === "false") {
                f1Meshes.forEach((mesh) => {
                    if (mesh.name === 'f1_s1_2_f1-s1_0') {
                        gsap.to(mesh.scale, {
                            duration: 0.5,
                            x: 3,
                            y: 3,
                            z: 3,
                            repeat: -1, // Keep repeating indefinitely
                            yoyo: true, // Allow scaling to oscillate back
                            ease: 'power1.inOut',
                        });
                    }
                });
            }
            if(gateway2?.sensor2 === "false") {
                f1Meshes.forEach((mesh) => {
                    if (mesh.name === 'f1_s2_2_f1-s2_0') {
                        gsap.to(mesh.scale, {
                            duration: 0.5,
                            x: 3,
                            y: 3,
                            z: 3,
                            repeat: -1, // Keep repeating indefinitely
                            yoyo: true, // Allow scaling to oscillate back
                            ease: 'power1.inOut',
                        });
                    }
                });
            }
            if(gateway2?.sensor3 === "false") {
                f2Meshes.forEach((mesh) => {
                    if (mesh.name === 'f2_s2_2_f2-s1_0') {
                        gsap.to(mesh.scale, {
                            duration: 0.5,
                            x: 3,
                            y: 3,
                            z: 3,
                            repeat: -1, // Keep repeating indefinitely
                            yoyo: true, // Allow scaling to oscillate back
                            ease: 'power1.inOut',
                        });
                    }
                });
            }
            if(gateway2?.sensor4 === "false") {
                f2Meshes.forEach((mesh) => {
                    if (mesh.name === 'f2_s1_2_f2-s1_0') {
                        gsap.to(mesh.scale, {
                            duration: 0.5,
                            x: 3,
                            y: 3,
                            z: 3,
                            repeat: -1, // Keep repeating indefinitely
                            yoyo: true, // Allow scaling to oscillate back
                            ease: 'power1.inOut',
                        });
                    }
                });
            }
        }

        if(gateway3) {
            if(gateway3?.sensor1 === "false") {
                f5Meshes.forEach((mesh) => {
                    if (mesh.name === 'f5_s1_2_f5-s1_0') {
                        gsap.to(mesh.scale, {
                            duration: 0.5,
                            x: 3,
                            y: 3,
                            z: 3,
                            repeat: -1, // Keep repeating indefinitely
                            yoyo: true, // Allow scaling to oscillate back
                            ease: 'power1.inOut',
                        });
                    }
                });
            }
            if(gateway3?.sensor2 === "false") {
                f4Meshes.forEach((mesh) => {
                    if (mesh.name === 'f4_s1_2_f4-s1_0') {
                        gsap.to(mesh.scale, {
                            duration: 0.5,
                            x: 3,
                            y: 3,
                            z: 3,
                            repeat: -1, // Keep repeating indefinitely
                            yoyo: true, // Allow scaling to oscillate back
                            ease: 'power1.inOut',
                        });
                    }
                });
            }
            if(gateway3?.sensor3 === "false") {
                f4Meshes.forEach((mesh) => {
                    if (mesh.name === 'f4_s2_2_f4-s2_0') {
                        gsap.to(mesh.scale, {
                            duration: 0.5,
                            x: 3,
                            y: 3,
                            z: 3,
                            repeat: -1, // Keep repeating indefinitely
                            yoyo: true, // Allow scaling to oscillate back
                            ease: 'power1.inOut',
                        });
                    }
                });
            }
            if(gateway3?.sensor4 === "false") {
                f3Meshes.forEach((mesh) => {
                    if (mesh.name === 'f3_s2_2_f3-s2_0') {
                        gsap.to(mesh.scale, {
                            duration: 0.5,
                            x: 3,
                            y: 3,
                            z: 3,
                            repeat: -1, // Keep repeating indefinitely
                            yoyo: true, // Allow scaling to oscillate back
                            ease: 'power1.inOut',
                        });
                    }
                });
            }
            if(gateway3?.sensor5 === "false") {
                f3Meshes.forEach((mesh) => {
                    if (mesh.name === 'f3_s1_2_f3-s1_0') {
                        gsap.to(mesh.scale, {
                            duration: 0.5,
                            x: 3,
                            y: 3,
                            z: 3,
                            repeat: -1, // Keep repeating indefinitely
                            yoyo: true, // Allow scaling to oscillate back
                            ease: 'power1.inOut',
                        });
                    }
                });
            }
        }
    }, [fireInfoData]);

    useEffect(() => {
        if(!fireSignal) {
            const mixer = new THREE.AnimationMixer(scene);
            const renderer = new THREE.WebGLRenderer();
            document.body.appendChild(renderer.domElement);

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

            animations.map((clip) => {
                const action = mixer.clipAction(clip);

                // 루프를 한 번만 실행하도록 설정
                action.setLoop(THREE.LoopOnce, 0);

                // 애니메이션이 종료되면 마지막 프레임에 멈춤
                action.clampWhenFinished = true;

                action.play();

                return action; // 액션을 저장
            });

            const animate = () => {
                requestAnimationFrame(animate);
                if (mixer) {
                    mixer.update(0.016);
                }
                renderer.render(scene, camera);
            };

            animate();
        } else {
            const mixer = new THREE.AnimationMixer(scene);
            animations.map((clip) => {
                const action = mixer.clipAction(clip);
                action.stop();
                action.reset();
                return action; // 액션을 저장
            });
        }
    }, [fireSignal]);

    return <primitive object={scene} />;
};

const ModelViewer: FC<{ floorNumber?: number, gateway1?: any, gateway2?: any, gateway3?: any, fireInfoData?: any, fireSignal?: boolean }> = ({ floorNumber, gateway1, gateway2, gateway3, fireInfoData, fireSignal }) => {
    return (
        <>
            <Canvas className="model-canvas" camera={{position: [7, 8, 10], fov: 20}}>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[0, 5, 5]} intensity={1}/>
                <OrbitControls enableZoom={true}/>
                <Model url="/model/noinCenterModeling_rev4.glb" floorNumber={floorNumber} gateway1={gateway1} gateway2={gateway2} gateway3={gateway3} fireInfoData={fireInfoData} fireSignal={fireSignal}/>
            </Canvas>
        </>
    );
};

export default ModelViewer;
