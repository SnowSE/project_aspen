import React, { useRef } from 'react';
import Quill from 'quill';
import { RefObject } from 'react';

const MyEditor = () => {
    const editorRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!editorRef.current) {
            return;
        }
        const editor = new Quill(editorRef.current, {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean']
                ],
            },
            placeholder: 'Write something...',
            theme: 'snow'
        });
    }, []);

    return <div ref={editorRef as RefObject<HTMLDivElement>} />;
};
