import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import styles from './Modal.module.css';

const AttendanceCamera = ({ students, courseName, onClose }) => {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [status, setStatus] = useState('Loading models...');
    const [faceMatcher, setFaceMatcher] = useState(null);
    const [presentStudents, setPresentStudents] = useState(new Set());
    const videoRef = useRef();
    const canvasRef = useRef();
    const intervalRef = useRef();

    // Map USNs to names for easy lookup
    const studentNameMap = students.reduce((acc, student) => {
        acc[student.usn] = student.name;
        return acc;
    }, {});
    
    useEffect(() => {
        const setupFaceAPI = async () => {
            const MODEL_URL = '/models';
            await Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            ]);

            const labeledDescriptors = students
                .filter(s => s.faceDescriptor && s.faceDescriptor.length > 0)
                .map(s => new faceapi.LabeledFaceDescriptors(
                    s.usn,
                    [new Float32Array(s.faceDescriptor)]
                ));
            
            if (labeledDescriptors.length > 0) {
                setFaceMatcher(new faceapi.FaceMatcher(labeledDescriptors, 0.55));
            }
            
            setModelsLoaded(true);
            setStatus('Starting camera...');
            startVideo();
        };
        setupFaceAPI();
        
        return () => {
            clearInterval(intervalRef.current);
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, [students]);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStatus('Ready to take attendance.');
                }
            })
            .catch(err => {
                console.error(err);
                setStatus('Could not access camera.');
            });
    };
    
    const handleVideoPlay = () => {
        intervalRef.current = setInterval(async () => {
            if (canvasRef.current && videoRef.current && faceMatcher) {
                const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptors();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                const context = canvasRef.current.getContext('2d');
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));

                results.forEach((result, i) => {
                    const box = resizedDetections[i].detection.box;
                    const studentUSN = result.label;
                    const studentName = studentNameMap[studentUSN] || 'Unknown';
                    const drawBox = new faceapi.draw.DrawBox(box, { label: studentName });
                    drawBox.draw(canvasRef.current);

                    if (studentUSN !== 'unknown') {
                        setPresentStudents(prev => new Set(prev).add(studentUSN));
                    }
                });
            }
        }, 300);
    };
    
    const presentStudentDetails = students.filter(s => presentStudents.has(s.usn));

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${styles.attendanceModal}`}>
                <h3>Live Attendance - {courseName}</h3>
                 <div className={styles.attendanceLayout}>
                    <div className={styles.videoContainer}>
                        <video ref={videoRef} autoPlay muted width="720" height="560" onPlay={handleVideoPlay} />
                        <canvas ref={canvasRef} className={styles.canvas} />
                    </div>
                    <div className={styles.presentList}>
                        <h4>Present Students ({presentStudentDetails.length})</h4>
                        <ul>
                            {presentStudentDetails.length > 0 ? (
                                presentStudentDetails.map(s => <li key={s._id}>{s.name} ({s.usn})</li>)
                            ) : (
                                <li>No students marked yet.</li>
                            )}
                        </ul>
                    </div>
                </div>
                <p className={styles.statusText}>{status}</p>
                <div className={styles.modalActions}>
                    <button onClick={onClose} className={styles.closeButton}>Finish Session</button>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCamera;