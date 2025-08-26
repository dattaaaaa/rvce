import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import api from '../../services/api';
import styles from './Modal.module.css';

const RegisterFaceModal = ({ student, onClose, onSuccess }) => {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [captureStatus, setCaptureStatus] = useState('Loading models...');
    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        const loadModelsAndStartVideo = async () => {
            const MODEL_URL = '/models';
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
            ]);
            setModelsLoaded(true);
            setCaptureStatus('Starting camera...');
            startVideo();
        };
        loadModelsAndStartVideo();
        
        // Cleanup function to stop video stream
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCaptureStatus('Position student\'s face in the frame.');
                }
            })
            .catch(err => {
                console.error(err);
                setCaptureStatus('Could not access camera.');
            });
    };

    const handleCapture = async () => {
        if (!videoRef.current) return;
        
        setCaptureStatus('Detecting face...');
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

        if (detections) {
            setCaptureStatus('Face detected! Saving data...');
            try {
                await api.post(`/professor/students/${student._id}/face`, {
                    descriptor: Array.from(detections.descriptor)
                });
                setCaptureStatus('Success! Face registered.');
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            } catch (error) {
                console.error('Failed to save face descriptor', error);
                setCaptureStatus('Error saving data. Please try again.');
            }
        } else {
            setCaptureStatus('No face detected. Please try again.');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>Register Face for {student.name}</h3>
                <div className={styles.videoContainer}>
                    <video ref={videoRef} autoPlay muted width="640" height="480" />
                    <canvas ref={canvasRef} className={styles.canvas} />
                </div>
                <p className={styles.statusText}>{captureStatus}</p>
                <div className={styles.modalActions}>
                    <button onClick={handleCapture} disabled={!modelsLoaded || captureStatus.includes('Saving...')}>
                        Capture & Save
                    </button>
                    <button onClick={onClose} className={styles.closeButton}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterFaceModal;