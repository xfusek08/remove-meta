import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EditorScreen from './EditorScreen';
import HomeScreen from './HomeScreen';

export default function App() {
    
    const [uploadedFiles, setUploadedFiles] = useState({});
    const navigate = useNavigate();
    
    const setFiles = (files) => {
        setUploadedFiles(files);
        navigate('/editor');
    };
    
    return (
        <Routes>
            <Route path='/*'      element={<HomeScreen setFiles={setFiles} />}/>
            <Route path='/editor' element={<EditorScreen files={uploadedFiles} />}/>
        </Routes>
    );
}