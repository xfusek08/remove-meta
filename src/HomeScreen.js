import React from 'react';
import { useEffect } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import style from './HomeScreen.module.scss';
import dropIcon from './icons/drop.svg';
import { useFilePicker } from 'use-file-picker';
import PropTypes from 'prop-types';
import dummy_data from './data/dummy_image_data';
import ParsedImage from './data/ParsedImage';
import log from 'loglevel';

export default function HomeScreen(props) {
    return (
        <div className={style.container}>
            <Routes>
                <Route path="/"  element={<Intro {...props} />} />
                <Route path="/*" element={<Text />} />
            </Routes>
            <div className={style.navbar}>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
                <Link to="/privacy-policy">Privacy policy</Link>
                <Link to="/terms-conditions">Terms & Conditions</Link>
            </div>
        </div>
    );
}
HomeScreen.propTypes = {
    setFiles: PropTypes.func.isRequired,
};


function Intro(props) {
    
    const [openFileSelector, { filesContent }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
    });
    
    useEffect(() => {
        if (filesContent.length) {
            props.setFiles(filesContent);
        }
    }, [filesContent]);
    
    // mocked uploading of actual image data
    const openDummyData = () => props.setFiles(dummy_data.map((d) => new ParsedImage(d)));
    
    return (
        <div className={style.content}>
            <div className="h1">View and remove any metadata from collection of images</div>
            <div className={style.dropArea}>
                <img className={style.icon} src={dropIcon} alt="drop icon"/>
                <div><strong>Drag & drop</strong> files here</div>
                <div>or</div>
                <button
                    className="button"
                    // onClick={() => openFileSelector()}
                    onClick={() => openDummyData()}
                >
                    Choose files
                </button>
            </div>
            <div className="h3">
                Data are edited locally. We <strong>won&apos;t</strong> upload anything to our servers!
            </div>
        </div>
    );
}
Intro.propTypes = {
    setFiles: PropTypes.func.isRequired,
};

function Text() {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const allowedLocations = [
            'contact',
            'about',
            'privacy-policy',
            'terms-conditions',
        ];
        if (!allowedLocations.includes(location.pathname.split('/').pop())) {
            navigate('/');
        }
    }, [location]);

    return (
        <div className={style.textContent}>
            <div className={style.backBar}>
                <Link className={style.backButton} to="/">Back</Link>
            </div>
            <div className={style.text}>
                <Routes>
                    <Route path="/contact"          element={<Contact />} />
                    <Route path="/about"            element={<About />} />
                    <Route path="/privacy-policy"   element={<PrivacyPolicy />} />
                    <Route path="/terms-conditions" element={<TermsConditions />} />
                </Routes>
            </div>
        </div>
    );
}

function Contact() {
    return (
        <>
            <h1>Contact</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula massa sagittis, tristique lacus quis, ultricies nisi. Aliquam consectetur purus purus, nec mollis mauris dapibus id. Aenean feugiat ligula eros, in ultricies est feugiat vitae. Maecenas sed iaculis tortor. Mauris sit amet fermentum sem. Nulla a tincidunt libero, eu ultrices erat. Sed lacinia maximus elit vitae pretium. Proin sodales odio ut velit interdum, eget bibendum lectus hendrerit. Donec lacinia mattis ex. Etiam quis varius lacus. Nulla sit amet ultricies est. Ut dolor neque, tempor sed est ut, fermentum rhoncus urna. Aliquam sollicitudin libero a justo lobortis ultrices. Maecenas venenatis tincidunt porttitor. Pellentesque commodo purus vitae justo tempor, nec vulputate lorem porta. Phasellus vitae ultrices eros, ut dictum erat.
            </p>
            <p>
                support@example.com
            </p>
        </>
    );
}

function About() {
    return (
        <>
            <h1>About</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent odio ipsum, hendrerit in ornare id, porttitor at ligula. Aenean convallis ipsum non felis finibus placerat. Praesent pellentesque cursus elit id vestibulum. Sed nec nulla id felis convallis cursus. Nulla dictum, justo a vestibulum hendrerit, nisi quam mattis tellus, sed condimentum turpis enim egestas purus. Nam bibendum leo varius purus vulputate imperdiet. Nulla non felis est. Proin lorem nulla, tristique sit amet ultrices id, condimentum sed orci. Proin non blandit nunc. Nam scelerisque, ligula sit amet aliquam venenatis, tellus est convallis eros, at tristique risus odio vitae tortor. Nam in neque ac nibh tempor vulputate sit amet a justo. Aenean accumsan ultricies convallis. Sed eu ultrices metus.
            </p>
            <p>
                Proin vehicula turpis at facilisis pulvinar. Integer tincidunt dignissim tincidunt. In non lectus neque. Suspendisse at semper odio, ac venenatis lorem. Aenean id egestas risus. Aenean rutrum pellentesque orci. Nullam justo lorem, dictum nec est ut, ullamcorper eleifend velit. Praesent porta sed mi vitae pellentesque. Donec eget porta quam, sed bibendum leo.
            </p>
        </>
    );
}

function PrivacyPolicy() {
    return (
        <>
            <h1>Privacy Policy</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae felis pretium, tempus dui et, lacinia nisl. Nullam felis elit, rhoncus vel tellus vel, tincidunt efficitur leo. Etiam quis lorem aliquam, egestas elit et, imperdiet nibh. Suspendisse potenti. Nulla feugiat hendrerit dui, in euismod tellus. Nullam faucibus lacus nec nisl auctor, ac sagittis sapien hendrerit. Nunc lacus metus, dignissim sed massa non, efficitur pellentesque metus. Curabitur et ex dictum, ornare ipsum vel, porttitor ex. Mauris quis ultricies lectus, non varius sem.
            </p>
            <p>
                Vestibulum diam turpis, sollicitudin ac euismod quis, maximus vel lectus. Vestibulum ac bibendum ex, id dapibus nisi. Nullam feugiat tempus magna, et iaculis nibh dictum a. Curabitur id augue nulla. Fusce interdum fermentum nisl ac vestibulum. Quisque nec dignissim odio. Nullam eu mattis enim.
            </p>
            <p>
                Nunc eu lacus id tortor fringilla consequat non sit amet lorem. Morbi velit nisl, ultricies non odio non, hendrerit euismod felis. Nam volutpat odio sed gravida sollicitudin. Praesent ornare id lacus at porttitor. Vivamus consequat nisl ac diam egestas, vel fringilla sapien eleifend. Morbi mattis eget metus ac dignissim. Fusce lobortis justo leo, efficitur scelerisque ipsum tristique ut. Vivamus molestie tempor nibh vitae fringilla. Nunc nec ipsum ac leo tincidunt cursus eget a tellus. Sed efficitur ligula justo, quis tincidunt nunc rhoncus egestas. Morbi fringilla diam eu libero pulvinar interdum. Vivamus placerat vitae nisl tristique ullamcorper.
            </p>
        </>
    );
}

function TermsConditions() {
    return (
        <>
            <h1>Terms & Conditions</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae felis pretium, tempus dui et, lacinia nisl. Nullam felis elit, rhoncus vel tellus vel, tincidunt efficitur leo. Etiam quis lorem aliquam, egestas elit et, imperdiet nibh. Suspendisse potenti. Nulla feugiat hendrerit dui, in euismod tellus. Nullam faucibus lacus nec nisl auctor, ac sagittis sapien hendrerit. Nunc lacus metus, dignissim sed massa non, efficitur pellentesque metus. Curabitur et ex dictum, ornare ipsum vel, porttitor ex. Mauris quis ultricies lectus, non varius sem.
            </p>
            <p>
                Vestibulum diam turpis, sollicitudin ac euismod quis, maximus vel lectus. Vestibulum ac bibendum ex, id dapibus nisi. Nullam feugiat tempus magna, et iaculis nibh dictum a. Curabitur id augue nulla. Fusce interdum fermentum nisl ac vestibulum. Quisque nec dignissim odio. Nullam eu mattis enim.
            </p>
            <p>
                Nunc eu lacus id tortor fringilla consequat non sit amet lorem. Morbi velit nisl, ultricies non odio non, hendrerit euismod felis. Nam volutpat odio sed gravida sollicitudin. Praesent ornare id lacus at porttitor. Vivamus consequat nisl ac diam egestas, vel fringilla sapien eleifend. Morbi mattis eget metus ac dignissim. Fusce lobortis justo leo, efficitur scelerisque ipsum tristique ut. Vivamus molestie tempor nibh vitae fringilla. Nunc nec ipsum ac leo tincidunt cursus eget a tellus. Sed efficitur ligula justo, quis tincidunt nunc rhoncus egestas. Morbi fringilla diam eu libero pulvinar interdum. Vivamus placerat vitae nisl tristique ullamcorper.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae felis pretium, tempus dui et, lacinia nisl. Nullam felis elit, rhoncus vel tellus vel, tincidunt efficitur leo. Etiam quis lorem aliquam, egestas elit et, imperdiet nibh. Suspendisse potenti. Nulla feugiat hendrerit dui, in euismod tellus. Nullam faucibus lacus nec nisl auctor, ac sagittis sapien hendrerit. Nunc lacus metus, dignissim sed massa non, efficitur pellentesque metus. Curabitur et ex dictum, ornare ipsum vel, porttitor ex. Mauris quis ultricies lectus, non varius sem.
            </p>
            <p>
                Vestibulum diam turpis, sollicitudin ac euismod quis, maximus vel lectus. Vestibulum ac bibendum ex, id dapibus nisi. Nullam feugiat tempus magna, et iaculis nibh dictum a. Curabitur id augue nulla. Fusce interdum fermentum nisl ac vestibulum. Quisque nec dignissim odio. Nullam eu mattis enim.
            </p>
            <p>
                Nunc eu lacus id tortor fringilla consequat non sit amet lorem. Morbi velit nisl, ultricies non odio non, hendrerit euismod felis. Nam volutpat odio sed gravida sollicitudin. Praesent ornare id lacus at porttitor. Vivamus consequat nisl ac diam egestas, vel fringilla sapien eleifend. Morbi mattis eget metus ac dignissim. Fusce lobortis justo leo, efficitur scelerisque ipsum tristique ut. Vivamus molestie tempor nibh vitae fringilla. Nunc nec ipsum ac leo tincidunt cursus eget a tellus. Sed efficitur ligula justo, quis tincidunt nunc rhoncus egestas. Morbi fringilla diam eu libero pulvinar interdum. Vivamus placerat vitae nisl tristique ullamcorper.
            </p>
        </>
    );
}
