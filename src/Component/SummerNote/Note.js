import React, { useState, useEffect, useContext } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { AppContext } from '../../context/AppContext';


export const Note = () => {

    const { setNoteValue, noteValue, editorState, setEditorState } = useContext(AppContext);



    console.log(noteValue);
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setNoteValue(html);
    }, [editorState]);

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
        />
    )
}
