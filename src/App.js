import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditorScreen from './EditorScreen';
import HomeScreen from './HomeScreen';
import dummy_data from './data/dummy_image_data';

export default function App() {
    
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const navigate = useNavigate();
    
    const setFiles = (files) => {
        setUploadedFiles(files);
        navigate('/editor');
    };
    
    useEffect(() => {
        setFiles(dummy_data);
    }, []);
    
    return (
        <Routes>
            <Route path='/*'      element={<HomeScreen setFiles={setFiles} />}/>
            <Route path='/editor' element={<EditorScreen files={uploadedFiles} />}/>
        </Routes>
    );
}